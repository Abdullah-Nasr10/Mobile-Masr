import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/usersSlice";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import "./UserMenu.css";
const UserMenu = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  if (!user) return null;

  return (
    <div className="dropdown user-dropdown">
      <button
        className="user-dropdown-btn dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {user.name.toUpperCase()}
      </button>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-custom">
        {/* header */}
        <li className="dropdown-header">
          Signed in as <strong>{user.name}</strong>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        {/* My Purchases */}
        <li>
          <Link className="dropdown-item-custom" to="/purchases">
            <FaShoppingBag className="dropdown-icon" /> My Purchases
          </Link>
        </li>

        {/* Account Settings */}
        <li>
          <Link className="dropdown-item-custom" to="/account">
            <FaUserCog className="dropdown-icon" /> Account Settings
          </Link>
        </li>

        {/* Signout */}
        <li>
          <button
            className="dropdown-item-custom signout-btn"
            onClick={() => dispatch(logout())}
          >
            <FaSignOutAlt className="dropdown-icon" /> Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
