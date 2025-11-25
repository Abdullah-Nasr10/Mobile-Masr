import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import checkAuth from "../../utilities/checkAuth";
import Loader from "../../components/GlobalComponents/Loader/Loader";

function ProtectRoute() {
  const token = localStorage.getItem("token");
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const verify = async () => {
      if (!token) {
        toast.error("You must be logged in to access this page.");
        navigate("/login", { state: { from: location }, replace: true });
        return;
      }
      const ok = await checkAuth(token, controller.signal);
      if (ok) {
        setAuthorized(true);
      } else {
        toast.error("you unauthorized. Please login.");
        localStorage.removeItem("token");
        setAuthorized(false);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    verify();
    return () => controller.abort();
  }, [token, navigate, location]);

  if (authorized === null) return <Loader />;
  return <Outlet />;
}

export default ProtectRoute;
