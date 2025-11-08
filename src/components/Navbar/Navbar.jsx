import React from "react";
import "./Navbar.css";
import Logo from "../GlobalComponents/Logo/Logo";
import { CiUser as UserIcon } from "react-icons/ci";
import { CiHeart as FavoriteHeart } from "react-icons/ci";
import { AiOutlineShoppingCart as Cart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="abd-Navbar">
      <div className="container">
        {/* ====================HeaderTop====================== */}
        <div className="row justify-content-between py-4 abd-HeaderTop">
          {/* -----------Logo--------------- */}
          <div className="col-2">
            <NavLink>
              <Logo />
            </NavLink>
          </div>
          {/* --------------inputSearch--------------- */}
          <div className="col-5 d-flex align-items-center">
            <input
              type="search"
              name="search"
              placeholder="What are You looking to day? "
              className="abd-NavInputSerach w-100 p-3"
            />
          </div>
          {/* --------------HeaderACtions-------------- */}
          <div className="col-4 row abd-HeaderActions">
            <div className="center col-4">Ar</div>
            <div className="center col-4">
              <div className="abd-signIn w-100 text-center">
                <span className=" me-2">sign in</span>
                <UserIcon />
              </div>
            </div>
            <div className="center col-4">
              <div className="abd-Favorite me-3">
                <FavoriteHeart />
                <div className="abd-FavCounter center">0</div>
              </div>
              <div className="abd-Cart">
                <Cart />
                <div className="abd-CartCounter center">100</div>
              </div>
            </div>
          </div>
        </div>
        {/* ===================HeaderButtom-catigorisNav==================== */}
        <div className="abd-catigorisNav">
          <ul className="row justify-content-center py-4">
            <li className="col-1">
              <NavLink>Mobile</NavLink>
            </li>
            <li className="col-1">
              <NavLink>Tablet</NavLink>
            </li>
            <li className="col-1">
              <NavLink>Laptop</NavLink>
            </li>
            <li className="col-2">
              <NavLink>Smart Watches</NavLink>
            </li>
            <li className="col-2">
              <NavLink>Wireless Earbuds</NavLink>
            </li>
            <li className="col-2">
              <NavLink>Game Consoles</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
