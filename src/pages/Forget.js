import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forget.css"; // External CSS to match design

function Forget() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:6011/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successfully.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="forget-bg">
      <div className="forget-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit" className="forget-btn">
            Update Password
          </button>

          {message && (
            <div className="form-message text-center mt-3">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Forget;
