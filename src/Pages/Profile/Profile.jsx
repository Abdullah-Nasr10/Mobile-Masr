import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";
import { 
  FaUser, 
  FaHeart, 
  FaShoppingBag, 
  FaUndo, 
  FaMapMarkerAlt, 
  FaBullhorn, 
  FaBell, 
  FaSignOutAlt 
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/usersSlice";
import PagePath from "../../components/GlobalComponents/PagePath/PagePath";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="profile-page-container">
      <div className="container" >
       <PagePath path={`Profile`} />
      <div className="profile-wrapper container">
        <aside className="profile-sidebar">
          <nav className="profile-nav">
            <NavLink 
              to="/profile/account" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaUser className="profile-nav-icon" />
              <span>Account Information</span>
            </NavLink>

            <NavLink 
              to="/profile/favorites" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaHeart className="profile-nav-icon" />
              <span>Favorites</span>
            </NavLink>

            <NavLink 
              to="/profile/orders" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaShoppingBag className="profile-nav-icon" />
              <span>My Purchases</span>
            </NavLink>

            <NavLink 
              to="/profile/refunds" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaUndo className="profile-nav-icon" />
              <span>Refund</span>
            </NavLink>

            <NavLink 
              to="/profile/addresses" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaMapMarkerAlt className="profile-nav-icon" />
              <span>Addresses</span>
            </NavLink>

            <NavLink 
              to="/profile/ads" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaBullhorn className="profile-nav-icon" />
              <span>My Ads</span>
            </NavLink>

            <NavLink 
              to="/profile/notifications" 
              className={({ isActive }) => isActive ? "profile-nav-link active" : "profile-nav-link"}
            >
              <FaBell className="profile-nav-icon" />
              <span>Notifications</span>
            </NavLink>

            <button 
              onClick={handleLogout}
              className="profile-nav-link logout-btn"
            >
              <FaSignOutAlt className="profile-nav-icon" />
              <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        <main className="profile-content">
          <Outlet />
        </main>
      </div>
      </div>
    </div>
  );
}

export default Profile;
