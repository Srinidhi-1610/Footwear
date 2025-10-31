import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, updateQuantity } from "../Redux/Cartslice";
import { loadStripe } from "@stripe/stripe-js";
import "./Cartpage.css";


const stripePromise = loadStripe("pk_test_51S8l6m365JZlMhSqTBHOsWukUWgzeXQ5IKMGKNMNLavTYu61OqimONjo3xLNp3O5uYgU8s0QsrDTzxFZ3hIdzWyF00w5E5CAvy");

const Cartpage = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();

  const getTotalPrice = () =>
    cartitems.reduce((total, item) => {
      const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
      return total + price * item.quantity;
    }, 0);

  const incrementCart = (id, quantity) =>
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  const decrementCart = (id, quantity) =>
    quantity > 1 && dispatch(updateQuantity({ id, quantity: quantity - 1 }));
  const deleteCart = (item) => dispatch(deleteFromCart(item));

  const handleCheckout = async () => {
    if (cartitems.length === 0) return alert("Your cart is empty");

    const items = cartitems.map((item) => ({
      name: item.title,
      price: parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0,
      quantity: item.quantity,
    }));

    // ✅ Get userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return alert("Please login to place order");

    try {
      const res = await fetch("http://localhost:6011/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, userId: user._id }),
      });

      const { id } = await res.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) alert("❌ Payment Failed: " + error.message);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Payment Failed. Try again.");
    }
  };

  return (
    <div className="cart-container">
      <h1 style={{ textAlign: "center" }}>🛒 Cart Products</h1>
      <div className="products-wrapper">
        {cartitems.map((item, i) => {
          const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
          return (
            <div className="product-card" key={i}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>₹ {price.toLocaleString("en-IN")}</p>
              <div className="quantity-controls">
                <button onClick={() => decrementCart(item.id, item.quantity)}>-</button>
                {item.quantity}
                <button onClick={() => incrementCart(item.id, item.quantity)}>+</button>
              </div>
              <button onClick={() => deleteCart(item)}>Delete</button>
            </div>
          );
        })}
      </div>
      {cartitems.length > 0 && (
        <div className="payment-section">
          <h2>Total: ₹ {getTotalPrice().toLocaleString("en-IN")}</h2>
          <button onClick={handleCheckout}>Pay Now</button>
        </div>
      )}
    </div>
  );
};

export default Cartpage;
