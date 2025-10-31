import React from "react";
import { Link } from "react-router-dom";
import './styles/Navbar.css'; // ✅ Correct CSS import

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">👟 FOOTWEAR</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/cart">🛒 Cart</Link></li>
      </ul>
    </nav>
  );
}
