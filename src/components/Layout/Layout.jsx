import Navbar from "../NavbarComponents/Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductsData } from "../../store/slices/ProductSlice";
import { fetchWishlist } from "../../store/slices/WishlistSlice";
import { logout, fetchUserProfile } from "../../store/slices/usersSlice";
import CompareContext from "../../context/CompareContext";
import { ToastContainer } from "react-toastify";
import IsLoginContext from "../../context/IsLoginContext";
import checkAuth from "../../utilities/checkAuth";
// ============================================================
function Layout() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.users?.user);
  const token = useSelector((state) => state.users?.token);
  const [compareItems, setCompareItems] = useState(
    () => JSON.parse(localStorage.getItem("compareItems")) || []
  );
  // ==============isLoggedInContext===============
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch user profile on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const controller = new AbortController();
    const verify = async () => {
      const tkn = localStorage.getItem("token");
      if (!tkn) {
        setIsLoggedIn(false);
        return;
      }
      const ok = await checkAuth(tkn, controller.signal);
      if (!ok) {
        dispatch(logout());
      }
      setIsLoggedIn(ok);
    };
    verify();
    return () => controller.abort();
  }, [pathname, dispatch]);

  // Fetch wishlist when user logs in (check both user and token)
  useEffect(() => {
    if (user && token) {
      dispatch(fetchWishlist());
    }
  }, [user, token, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(fetchProductsData());
    }, 1000);
  }, [dispatch, pathname]);

  useEffect(() => {
    console.log("compareItems updated: ", compareItems);
  }, [compareItems]);

  return (
    <>
      <IsLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Navbar />
        <CompareContext.Provider value={{ compareItems, setCompareItems }}>
          <div style={{ minHeight: "100vh" }}>
            <Outlet />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000} // 2 ثواني
            hideProgressBar={false} // مهم: خلي خط اللودر يظهر
            newestOnTop={true}
            closeOnClick
            pauseOnHover
          />
        </CompareContext.Provider>
        <Footer />
      </IsLoginContext.Provider>
    </>
  );
}

export default Layout;
