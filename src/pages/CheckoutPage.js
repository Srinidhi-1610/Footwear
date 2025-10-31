import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_Your_Publishable_Key"); // Publishable key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🟢 Step 1: Call backend to create PaymentIntent
    const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
      amount: 2000, // $20 (2000 cents)
    });

    const clientSecret = data.clientSecret;

    // 🟢 Step 2: Confirm payment on frontend
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Complete Payment</h2>
      <CardElement style={{ base: { fontSize: "18px" } }} />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: "20px" }}>
        {loading ? "Processing..." : "Pay $20"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
