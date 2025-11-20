import { NavLink, useParams } from "react-router-dom";
import "./BottomNavbar.css";
import { IoHome } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { HiOutlineShoppingCart as ShoppingCart } from "react-icons/hi";
import { FaRegCircleUser as UserIcon } from "react-icons/fa6";

function BottomNavbar() {
  const { compare } = useParams();
  return (
    <div className="abd-BottomNavbar">
      <div className="container d-flex justify-content-around align-items-center py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center fs-1 gap-2 nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <div className="bottomNavIcon">
            <IoHome />
          </div>
          <h4 className="fw-light fs-4">Home</h4>
        </NavLink>
        {/* ---------------------- */}
        <NavLink
          to={`/categories/${compare ? compare : ""}`}
          className={({ isActive }) =>
            `d-flex flex-column align-items-center fs-1 gap-2 nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <div className="bottomNavIcon">
            <BiCategory />
          </div>
          <h4 className="fw-light fs-4">Categories</h4>
        </NavLink>
        {/* ---------------------- */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center fs-1 gap-2 nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <div className="bottomNavIcon position-relative">
            <ShoppingCart />
            <div className="abd-BottomCartCounter center position-absolute top-0 start-100 translate-middle">
              0
            </div>
          </div>
          <h4 className="fw-light fs-4">Shopping Cart</h4>
        </NavLink>
        {/* ---------------------- */}
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center fs-1 gap-2 nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <div className="bottomNavIcon">
            <UserIcon />
          </div>
          <h4 className="fw-light fs-4">My Account</h4>
        </NavLink>
      </div>
    </div>
  );
}

export default BottomNavbar;
