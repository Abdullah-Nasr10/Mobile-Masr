import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/usersSlice";
import { IoPersonOutline, IoMailOutline, IoCallOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import "../LoginForm/LoginForm.css";
import "../../Pages/Auth/Register/Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, user, success } = useSelector((s) => s.users);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (user) {
      window.location.href = "/"; 
      reset();
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const payload = {
    name: `${data.firstName} ${data.lastName}`, 
    email: data.email,
    password: data.password,
    phone: data.phone,
    address: data.address,
  };
    dispatch(registerUser(payload));
  };

  return (
    <div className="login-center">
      <div className="register-card">
        <div className="text-center mb-5">
        <h2 className="mb-3">Sign Up</h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-2">
            <div className="col-6">
              <div className="mb-3 position-relative">
                <label className="form-label">First Name</label>
                <span className="login-input-icon"><IoPersonOutline size={18} /></span>
                <input
                  className="form-control geh-form-control ps-4"
                  {...register("firstName", {
                    required: "First name required",
                    minLength: { value: 3, message: "Min 3 chars" },
                  })}
                />
                {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3 position-relative">
                <label className="form-label">Last Name</label>
                <span className="login-input-icon"><IoPersonOutline size={18} /></span>
                <input
                  className="form-control geh-form-control ps-4"
                  {...register("lastName", {
                    required: "Last name required",
                    minLength: { value: 3, message: "Min 3 chars" },
                  })}
                />
                {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Email</label>
            <span className="login-input-icon"><IoMailOutline size={18} /></span>
            <input
              type="email"
              className="form-control geh-form-control ps-4"
              {...register("email", {
                required: "Email required",
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid email" },
              })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <span className="login-input-icon"><RiLockPasswordLine size={18} /></span>
            <input
              type="password"
              className="form-control geh-form-control ps-4"
              {...register("password", {
                required: "Password required",
              })}
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <span className="login-input-icon"><RiLockPasswordLine size={18} /></span>
            <input
              type="password"
              className="form-control geh-form-control ps-4"
              {...register("confirmPassword", {
                required: "Confirm required",
                validate: (v) => v === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
          </div>

          <div className="mb-5">
            <label className="form-label">Phone (optional)</label>
            <span className="login-input-icon"><IoCallOutline size={18} /></span>
            <input
              type="tel"
              className="form-control geh-form-control ps-4 "
              placeholder="01XXXXXXXXX"
              {...register("phone", {
                pattern: { value: /^01[0-2,5]{1}[0-9]{8}$/, message: "Invalid phone" },
              })}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
          </div>

          <button type="submit" className="btn btn-geh w-100 mb-5" disabled={isSubmitting || loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
              <div className="text-center mt-4">
        <span className="text-muted">Or</span>
      </div>

      <div className="login-socials">
        <Link to="#">
          <img src="https://res.cloudinary.com/dfigu6nnn/image/upload/v1763739706/icons8-google-48_oqslny.png" alt="Google" />
        </Link>
        <Link to="#">
          <img src="https://res.cloudinary.com/dfigu6nnn/image/upload/v1763739873/icons8-facebook-logo-48_lgpr9x.png" alt="Facebook" />
        </Link>
      </div>
      <div className="text-center mt-4">
        <p className="text-muted">Already have an account?<Link to="/login" className=" geh-link text-decoration-none p-2">Sign In</Link></p>
      </div>
      </div>
    </div>
  );
}

