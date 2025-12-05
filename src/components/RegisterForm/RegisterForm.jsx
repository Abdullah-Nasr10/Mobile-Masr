import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleLogin } from "../../store/slices/usersSlice";
import "../LoginForm/LoginForm.css";
import "../../Pages/Auth/Register/Register.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, user, success } = useSelector((s) => s.users);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true);
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        
        const { sub: googleId, email, name, picture } = res.data;
        dispatch(googleLogin({ googleId, email, name, profilePicture: picture }));
      } catch (err) {
        toast.error("Google registration failed");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => toast.error("Google registration failed")
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (user) {
      window.location.href = "/";
      reset();
    }
  }, [user, reset]);

  useEffect(() => {
    if (error) {
      const msg = typeof error === "string" ? error : "Registration failed";
      toast.error(msg);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const msg =
        typeof success === "string" ? success : "Registration successful";
      toast.success(msg);
    }
  }, [success]);

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

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row g-4">
            <div className="col-6">
              <div className="mb-3 position-relative">
                {/* ======firstName===== */}
                <label className="form-label">First Name</label>
                <input
                  className={`form-control geh-form-control ps-4 ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="First name"
                  {...register("firstName", {
                    required: "First name required",
                    minLength: { value: 3, message: "Min 3 chars" },
                    maxLength: { value: 10, message: "Max 10 characters" },
                    pattern: { value: /^\S+$/, message: "No spaces allowed" },
                  })}
                />
                {errors.firstName && (
                  <small className="text-danger">
                    {errors.firstName.message}
                  </small>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3 position-relative">
                {/* ======lastName===== */}
                <label className="form-label">Last Name</label>
                <input
                  className={`form-control geh-form-control ps-4 ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Last name"
                  {...register("lastName", {
                      required: "Last name required",
                      minLength: { value: 3, message: "Min 3 chars" },
                      maxLength: { value: 10, message: "Max 10 characters" },
                      pattern: { value: /^\S+$/, message: "No spaces allowed" },
                  })}
                />
                {errors.lastName && (
                  <small className="text-danger">
                    {errors.lastName.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            {/* ======email===== */}
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control geh-form-control ps-4 ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          <div className="row g-4">
                      <div className="mb-4 position-relative col-6">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control geh-form-control ps-4 pe-5 ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Create a password"
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 chars or numbers" },
              })}
            />

            {/* Eye button */}
            <span
              className="gehR-password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          <div className="mb-4 col-6">
            {/* ======confirmPassword===== */}
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control geh-form-control ps-4 ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm required",
                validate: (v) =>
                  v === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          </div>



          <div className="mb-3">
            {/* ======phone===== */}
            <label className="form-label">Phone (optional)</label>
            <input
              type="tel"
              className={`form-control geh-form-control ps-4 ${
                errors.phone ? "is-invalid" : ""
              }`}
              placeholder="01XXXXXXXXX"
              {...register("phone", {
                pattern: {
                  value: /^01[0-2,5]{1}[0-9]{8}$/,
                  message: "Phone must be valid",
                },
              })}
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>
          {/* ===== Terms & Newsletter ===== */}
          <div className="mb-3">
            {/* Terms (Required) */}
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.terms ? "is-invalid" : ""
                }`}
                id="terms"
                {...register("terms", {
                  required: "Acceptance of terms and conditions is required",
                })}
              />
              <label className="form-check-label" htmlFor="terms">
                <small>
                  I agree to the <strong>Terms & Conditions</strong> and the{" "}
                  <strong>Privacy Notice</strong> of MobileMasr.
                </small>
              </label>
            </div>

            {errors.terms && (
              <small className="text-danger">{errors.terms.message}</small>
            )}

            {/* Newsletter (Optional) */}
            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="newsletter"
                {...register("newsletter")}
              />
              <label className="form-check-label" htmlFor="newsletter">
                <small>
                  I want to receive MobileMasr newsletter and best offers.
                </small>
              </label>
            </div>
          </div>

          {/* =======button====== */}
          <div>
            <button
              type="submit"
              className="btn btn-geh w-100 mb-5"
              disabled={isSubmitting || loading || !isValid}
              aria-disabled={isSubmitting || loading || !isValid}
            >
              {loading
                ? "Registering..."
                : isSubmitting
                ? "Submitting..."
                : "Register"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <span className="text-muted">Or</span>
        </div>

        <button 
          type="button"
          className="btn btn-google-custom w-100" 
          onClick={handleGoogleRegister}
          disabled={googleLoading}
        >
          <FcGoogle className="google-icon" />
          {googleLoading ? "Signing up..." : "Sign up with Google"}
        </button>

        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an account?
            <Link to="/login" className=" geh-link text-decoration-none p-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
