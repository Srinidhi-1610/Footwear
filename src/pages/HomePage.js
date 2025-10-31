import React from "react";
import Navbar from "../component/Navbar";
import HeroSection from "../component/Herosection"; // import name matches JSX
import CategorySection from "../component/CategorySection";
import ProductCard from "../component/ProductCard";
import Footer from "../component/Footer";
import './HomePage.css';

export default function HomePage() {
  const products = [
    { id: 1, name: "Nike Air Zoom", price: 120, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Adidas UltraBoost", price: 150, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Puma RS-X", price: 100, image: "https://via.placeholder.com/200" },
    { id: 4, name: "Reebok Classic", price: 90, image: "https://via.placeholder.com/200" },
  ];

  return (
    <>
      <Navbar />
      <HeroSection />  {/* JSX matches import */}
      <CategorySection />
      <section className="products-section">
        <h2>🔥 Trending Footwear</h2>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
