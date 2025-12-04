import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/usersSlice";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import "./UserMenu.css";
import IsLoginContext from "../../../context/IsLoginContext";
const UserMenu = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { setIsLoggedIn } = useContext(IsLoginContext);
  if (!user) return null;

  const firstNameRaw = (user.name || "").split(" ")[0] || "";
  const displayName = firstNameRaw
    ? firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1).toLowerCase()
    : "";
  const profilePicture = user.profilePicture || "";
  const avatarLetter = (displayName || user?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="dropdown user-dropdown">
      <button
        className="user-dropdown-btn dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        <span className="user-avatar" aria-hidden="true">
          {profilePicture ? (
            <img src={profilePicture} alt={displayName || "User avatar"} />
          ) : (
            <span className="user-avatar-fallback">{avatarLetter}</span>
          )}
        </span>
        <span className="user-name">{`Hi! ${displayName || "User"}`}</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-custom">
        {/* header */}
        <li className="dropdown-header">
          Signed in as <span>{displayName}</span>
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
          <Link
            className="dropdown-item-custom signout-btn"
            onClick={() => {
              dispatch(logout());
              setIsLoggedIn(false);
            }}
          >
            <FaSignOutAlt className="dropdown-icon" /> Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
