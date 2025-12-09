import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AccountInfo.css";

const AccountInfo = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <div className="account-info-container">
      <h2 className="account-info-title">Account Information</h2>

      <div className="account-info-card">
        <div className="info-display">
          <div className="info-row">
            <span className="info-label">Name</span>
            <span className="info-value">{user?.name || "N/A"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{user?.email || "N/A"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Mobile Number</span>
            <span className="info-value">{user?.phone || "N/A"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Password</span>
            <span className="info-value">* * * * * * * * * *</span>
          </div>
        </div>

        <div className="account-actions">
          <button
            className="btn btn-geh"
            onClick={() => navigate("/profile/edit-account")}
          >
            Edit Main Data
          </button>
          <button
            className="btn btn-outline-geh"
            onClick={() => navigate("/profile/change-password")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
