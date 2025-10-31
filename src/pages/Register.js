import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Modern CSS with centered glass UI

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

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
      const response = await fetch("http://localhost:6011/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Registered Successfully!");
        setFormData({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        setMessage("❌ Registration Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server Error. Try again later.");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Your Email"
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

          <div className="checkbox-area">
            <input type="checkbox" required />
            <label>I agree to all statements in <a href="#">Terms of service</a></label>
          </div>

          <button type="submit" className="signup-btn">
            SIGN UP
          </button>

          {message && (
            <div className="text-center mt-3 fw-bold" style={{ color: "#444" }}>
              {message}
            </div>
          )}

          <div className="login-link">
            Already have an account?{" "}
            <a href="#" onClick={() => navigate("/login")}>
              Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
