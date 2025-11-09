import Navbar from "../NavbarComponents/Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductsData } from "../../store/slices/ProductSlice";

// ============================================================
function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProductsData());
    }, 1000);
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", marginTop: "150px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
