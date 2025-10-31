import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // New modern CSS

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:6011/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        setMessage("✅ Login successful!");

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            LOGIN
          </button>

          <div className="forgot-link">
            <a href="#" onClick={() => navigate("/forget")}>
              Forgot Password?
            </a>
          </div>

          {message && (
            <div className="text-center mt-3 fw-bold" style={{ color: "#444" }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
