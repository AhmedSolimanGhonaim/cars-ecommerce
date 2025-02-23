import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../api/userapi";
import { toast } from "react-toastify";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "customer",
    };

    try {
      const response = await addNewUser(newUser);
      const createdUser = response.data;

      // Dispatch to Redux store
      dispatch(addUser(createdUser));

      // Update sessionStorage
      const users = JSON.parse(sessionStorage.getItem("users")) || [];
      users.push(createdUser);
      sessionStorage.setItem("users", JSON.stringify(users));

      toast.success("Sign up successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <input
                    type="text"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
