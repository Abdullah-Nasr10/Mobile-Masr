import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectRoute() {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    toast.error("You must be logged in to access this page.");
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectRoute;
