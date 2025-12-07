import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../../services/api";
import "./AccountInfo.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await api.put("/change-password", { oldPassword, newPassword });
      toast.success("Password changed successfully!");
      navigate("/profile/account");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-info-container">
      <h2 className="account-info-title">Change Password</h2>

      <div className="account-edit-form-card">
        <form onSubmit={handlePasswordChange}>
          <div className="form-group position-relative">
            <label>Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="oldPassword"
              required
            />
          </div>

          <div className="form-group position-relative">
            <label>New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="newPassword"
              required
              minLength={6}
            />
          </div>

          <div className="form-group position-relative">
            <label>Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="confirmPassword"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-geh"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
            <button
              type="button"
              className="btn btn-outline-geh"
              onClick={() => navigate("/profile/account")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
