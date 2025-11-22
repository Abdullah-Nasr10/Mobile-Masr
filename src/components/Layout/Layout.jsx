import Navbar from "../NavbarComponents/Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductsData } from "../../store/slices/ProductSlice";
import CompareContext from "../../context/CompareContext";
import { ToastContainer } from "react-toastify";
// ============================================================
function Layout() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [compareItems, setCompareItems] = useState([]);

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
    </>
  );
}

export default Layout;
