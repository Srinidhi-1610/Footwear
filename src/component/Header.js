import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-container">
      {/* LOGO */}
      <div className="logo">
        FootWear<span style={{ color: "#fff" }}>Hub</span>
      </div>

      {/* NAVIGATION LINKS */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        <li><Link to="/Register">Register</Link></li>
      </ul>

      {/* CART BUTTON */}
      <Link to="/cart">
        <button className="cart-btn">🛒 Cart</button>
      </Link>
    </header>
  );
};

export default Header;
