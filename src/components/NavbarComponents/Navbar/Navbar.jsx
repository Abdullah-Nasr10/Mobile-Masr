import React from "react";
import "./Navbar.css";
import Logo from "../../GlobalComponents/Logo/Logo";
import { CiUser as UserIcon } from "react-icons/ci";
import { CiHeart as FavoriteHeart } from "react-icons/ci";
import { AiOutlineShoppingCart as Cart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import BottomNavbar from "../BottomNavbar/BottomNavbar";

function Navbar() {
  return (
    <nav className="abd-Navbar">
      <div className="container">
        {/* ====================HeaderTop====================== */}
        <div className="d-flex justify-content-between py-4 gap-4 abd-HeaderTop">
          {/* -----------Logo--------------- */}
          <NavLink to="/" className="center">
            <Logo />
          </NavLink>
          {/* --------------inputSearch--------------- */}
          <div className="d-inline-flex align-items-center abd-SearchBox">
            <input
              type="search"
              name="search"
              placeholder="What are You looking to day? "
              className="abd-NavInputSerach w-100 p-3"
            />
          </div>
          {/* --------------HeaderACtions-------------- */}
          <div className="abd-HeaderActions d-inline-flex align-items-center gap-4">
            <ToggleLanguage />
            {/* ------------------- */}
            <div className="center d-none d-md-flex">
              <div className="abd-signIn text-center">
                <span className=" me-2">Sign In</span>
                <UserIcon />
              </div>
            </div>
            {/* ------------------- */}
            <div className="center">
              <div className="abd-Favorite me-3">
                <FavoriteHeart />
                <div className="abd-FavCounter center">0</div>
              </div>
              <div className="abd-Cart d-none d-md-inline-block">
                <Cart />
                <div className="abd-CartCounter center">100</div>
              </div>
            </div>
            {/* ------------------- */}
          </div>
        </div>
        {/* ===================HeaderButtom-catigorisNav==================== */}
        <CategoryNavbar />
        {/* ============BottomNavbarInMobile=========== */}
        <BottomNavbar />
      </div>
    </nav>
  );
}

export default Navbar;
