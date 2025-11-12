import "./CategoryNavbar.css";
import { NavLink } from "react-router-dom";
function CategoryNavbar() {
  return (
    <div className="abd-CategoryNavbar">
      <ul className="d-none d-md-flex align-items-center justify-content-center gap-5 py-4">
        <li>
          <NavLink
            to="/category/mobile"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Mobile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/tablet"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Tablet
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/laptop"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Laptop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/smart-watches"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Smart Watches
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category/wireless-earbuds"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Wireless Earbuds
          </NavLink>
        </li>
        <li>
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
