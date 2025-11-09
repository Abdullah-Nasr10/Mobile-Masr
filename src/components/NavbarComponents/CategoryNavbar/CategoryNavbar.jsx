import "./CategoryNavbar.css";
import { NavLink } from "react-router-dom";
function CategoryNavbar() {
  return (
    <div className="abd-CategoryNavbar">
      <ul className="row justify-content-center py-4">
        <li className="col-1">
          <NavLink
            to="/category/mobile"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Mobile
          </NavLink>
        </li>
        <li className="col-1">
          <NavLink
            to="/category/tablet"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Tablet
          </NavLink>
        </li>
        <li className="col-1">
          <NavLink
            to="/category/laptop"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Laptop
          </NavLink>
        </li>
        <li className="col-2">
          <NavLink
            to="/category/smart-watches"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Smart Watches
          </NavLink>
        </li>
        <li className="col-2">
          <NavLink
            to="/category/wireless-earbuds"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Wireless Earbuds
          </NavLink>
        </li>
        <li className="col-2">
          <NavLink
            to="/category/game-consoles"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Game Consoles
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CategoryNavbar;
