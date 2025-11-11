import React from "react";
import "./Navbar.css";
import Logo from "../../GlobalComponents/Logo/Logo";
import { CiUser as UserIcon } from "react-icons/ci";
import { CiHeart as FavoriteHeart } from "react-icons/ci";
import { AiOutlineShoppingCart as Cart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";

function Navbar() {
  return (
    <nav className="abd-Navbar">
      <div className="container">
        {/* ====================HeaderTop====================== */}
        <div className="d-flex justify-content-between py-4 gap-4 abd-HeaderTop">
          {/* -----------Logo--------------- */}
          <NavLink to="/">
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
            <div className="center">
              <div className="abd-signIn w-100 text-center">
                <span className=" me-2">sign in</span>
                <UserIcon />
              </div>
            </div>
            {/* ------------------- */}
            <div className="center">
              <div className="abd-Favorite me-3">
                <FavoriteHeart />
                <div className="abd-FavCounter center">0</div>
              </div>
              <div className="abd-Cart">
                <Cart />
                <div className="abd-CartCounter center">100</div>
              </div>
            </div>
            {/* ------------------- */}
          </div>
        </div>
        {/* ===================HeaderButtom-catigorisNav==================== */}
        <CategoryNavbar />
      </div>
    </nav>
  );
}

export default Navbar;
