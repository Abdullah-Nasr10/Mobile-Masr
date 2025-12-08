import React, { useContext } from "react";
import "./Navbar.css";
import Logo from "../../GlobalComponents/Logo/Logo";
import { CiUser as UserIcon } from "react-icons/ci";
import { CiHeart as FavoriteHeart } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import CategoryNavbar from "../CategoryNavbar/CategoryNavbar";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import IsLoginContext from "../../../context/IsLoginContext";
import UserMenu from "../UserMenu/UserMenu";
import SearchInput from "../SearchInput/SearchInput";
import { useSelector } from "react-redux";
import CartCounterNav from "../CartCounterNav/CartCounterNav";

function Navbar() {
  const wishlist = useSelector((state) => state.wishlist);
  const wishlistCount = wishlist?.items?.length || 0;

  const { isLoggedIn } = useContext(IsLoginContext);
  console.log("is Logged In:", isLoggedIn);

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
          <SearchInput />
          {/* --------------HeaderACtions-------------- */}
          <div className="abd-HeaderActions d-inline-flex align-items-center gap-4">
            <ToggleLanguage />
            {/* ----------sign in--------- */}
            {!isLoggedIn ? (
              <Link to="/login" className="center d-none d-md-flex">
                <div className="abd-signIn text-center">
                  <span className=" me-2">Sign In</span>
                  <UserIcon />
                </div>
              </Link>
            ) : (
              <UserMenu />
            )}

            {/* ------------------- */}
            <div className="center">
              <Link to="/profile/favorites" className="abd-Favorite me-3">
                <FavoriteHeart />
                <div className="abd-FavCounter center">{wishlistCount}</div>
              </Link>
              <CartCounterNav />
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
