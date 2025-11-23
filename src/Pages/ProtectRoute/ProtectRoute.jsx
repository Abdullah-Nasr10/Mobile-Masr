import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectRoute() {
  const isLoggedIn = localStorage.getItem("token");
  const notifiedRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && !notifiedRef.current) {
      toast.error("You must be logged in to access this page.");
      notifiedRef.current = true;
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectRoute;
