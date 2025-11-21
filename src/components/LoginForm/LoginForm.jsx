import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../../store/slices/usersSlice";
import { IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((s) => s.users);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-center">
      <div className="login-card">
      <div className="text-center mb-5">
        <p>Sign In with email or mobile number</p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label className="form-label ">Email</label>
          <span className="login-input-icon"><IoMailOutline size={18} /></span>
          <input
            type="text"
            className="form-control geh-form-control ps-4 mb-4"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <span className="login-input-icon"><RiLockPasswordLine size={18} /></span>
          <input
            type="password"
            className="form-control geh-form-control ps-4 mb-4"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </div>

        <div className="d-flex justify-content-start mb-3">
          <Link to="/forgot-password" className="text-decoration-none geh-link ">Forgot Password?</Link>
        </div>

        <button className="btn btn-geh w-100 mb-5" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-muted">Sign In with</span>
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
        <p className="text-muted">Don't have an account? <Link to="/register" className="geh-link text-decoration-none ">Sign Up</Link></p>
      </div>
    </div>
    </div>
  );
}
