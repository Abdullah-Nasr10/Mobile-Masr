import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { setCredentials } from "../../../../store/slices/usersSlice";
import "./EditAccount.css";

const EditAccount = () => {
  const { user, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Don't send email since it can't be changed
      const updateData = {
        name: data.name,
        phone: data.phone || "",
      };
      const res = await api.put("/profile", updateData);

      // Update Redux state with new user data
      dispatch(
        setCredentials({
          user: res.data.user,
          token: token,
        })
      );

      toast.success("Profile updated successfully!");
      navigate("/profile/account");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-info-container">
      <h2 className="account-info-title">Edit Profile Information</h2>

      <div className="account-edit-form-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={user?.email || ""}
              disabled
            />
            <small className="text-muted">Email cannot be changed</small>
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              {...register("phone", {
                pattern: {
                  value: /^01[0-2,5]{1}[0-9]{8}$/,
                  message: "Invalid Egyptian phone number",
                },
              })}
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-geh" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
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

export default EditAccount;
