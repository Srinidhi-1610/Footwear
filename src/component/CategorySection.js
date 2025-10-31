import React from "react";
import './styles/CategorySection.css';  // ✅ Correct CSS import

export default function CategorySection() {
  const categories = [
    { name: "Men", image: "https://via.placeholder.com/200" },
    { name: "Women", image: "https://via.placeholder.com/200" },
    { name: "Kids", image: "https://via.placeholder.com/200" },
    { name: "Casual", image: "https://via.placeholder.com/200" },
    { name: "Sports", image: "https://via.placeholder.com/200" },
  ];

  return (
    <section className="categories">
      {categories.map((cat, index) => (
        <div key={index} className="category-card">
          <img src={cat.image} alt={cat.name} />
          <h3>{cat.name}</h3>
        </div>
      ))}
    </section>
  );
}
