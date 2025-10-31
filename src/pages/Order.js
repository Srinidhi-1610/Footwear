import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Order.css';

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get("orderId");
    if (!orderId) return;

    fetch(`http://localhost:6011/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error(err));
  }, [location]);

  if (!order) return <div className="loading">Loading order...</div>;

  return (
    <div className="order-summary-container">
      <h1>📦 ORDER SUMMARY</h1>
      <p><strong>User ID:</strong> {order.userId}</p>
      <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            <span>{item.name} × {item.quantity}</span>
            <span>₹ {(item.price * item.quantity).toLocaleString("en-IN")}</span>
          </li>
        ))}
      </ul>
      <h2>Total: ₹ {order.total.toLocaleString("en-IN")}</h2>
    </div>
  );
};

export default OrderSummary;
