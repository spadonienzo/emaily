// Example in PaymentsSuccess.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import * as actions from "../actions";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payments = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(
      "https://emaily-3ue6.onrender.com/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Add any needed payload here
      }
    );

    const session = await response.json();
    console.log("esta es la session ", session);

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Stripe Checkout error:", result.error.message);
    }
  };

  return (
    <button className="btn" onClick={handleCheckout}>
      Add credits
    </button>
  );
};

export default connect(null, actions)(Payments);
