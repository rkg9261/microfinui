import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

import "./Auth.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";

import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRequired(formData, [
      {
        name: "email",
        label: "Email",
      },
      {
        name: "password",
        label: "Password",
      },
    ]);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        endpoints.LOGIN,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Login Response:", response.data);

if (response.data.success) {

    const token = response.data.token;
    const user = response.data.user;

    // Save Token
    localStorage.setItem("token", token);

    // Save User
    localStorage.setItem("user", JSON.stringify(user));

    // Show in Console
    console.log("=================================");
    console.log("Login Successful");
    console.log("JWT Token:", token);
    console.log("User:", user);
    console.log("=================================");

    navigate("/loan-plan");

} else {

    alert(response.data.message);

}
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Login Failed"
        );
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">
          Login
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="auth-input-box">

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className={
                errors.email ? "error-input" : ""
              }
            />

            <FaUser className="auth-icon" />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="auth-input-box">

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={
                errors.password
                  ? "error-input"
                  : ""
              }
            />

            <FaLock className="auth-icon" />

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}

          </div>

          {/* Remember */}

          <div className="auth-options">

            <label className="remember-box">

              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              Remember me

            </label>

            <Link
              to="/forgot-password"
              className="auth-link"
            >
              Forgot password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>

          {/* Register */}

          <div className="register-text">

            Don't have an account?

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;