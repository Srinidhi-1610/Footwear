import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import custom CSS

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/edit-profile"); // Adjust as needed
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      localStorage.removeItem("user");
      navigate("/register");
    }
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <h2>👤 Profile</h2>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <div className="button-group">
              <button className="btn edit" onClick={handleEdit}>Edit</button>
              <button className="btn delete" onClick={handleDelete}>Delete</button>
              <button className="btn logout" onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
