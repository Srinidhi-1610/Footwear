import React from "react";
import './styles/Herosection.css';  // ✅ Correct CSS import

export default function HeroSection() {
  return (
    <section className="hero-banner">
      <div className="hero-text">
        <h2>🎄 Festive Offer</h2>
        <h1>-50% On Your Second Pair</h1>
        <p>Upgrade your style with our latest footwear collection</p>
        <button>Shop Now</button>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1528701800489-20be7c53d1f3"
          alt="Shoes"
        />
      </div>
    </section>
  );
}
