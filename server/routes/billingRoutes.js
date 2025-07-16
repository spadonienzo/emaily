const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/create-checkout-session", requireLogin, async (req, res) => {
    try {
      const product = await stripe.products.create({ name: "Credits Pack" });

      const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: 500,
        product: product.id,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: "https://emaily-3ue6.onrender.com/surveys",
        cancel_url: "https://emaily-3ue6.onrender.com",
        metadata: {
          userId: req.user.id, // store user ID in session metadata
        },
      });
      res.json({ id: session.id });
    } catch (err) {
      console.error("Stripe Checkout error:", err.message);
      res
        .status(500)
        .json({ error: "Failed to create Stripe Checkout session" });
    }
  });

  // Stripe webhook endpoint
  app.post(
    "/api/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          keys.stripeWebhookSecret
        ); // This must match Stripe's webhook secret
      } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle checkout completion
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const userId = session.metadata.userId;

        if (userId) {
          try {
            await User.findByIdAndUpdate(userId, { $inc: { credits: 5 } });
          } catch (err) {
            console.error("Failed to update user credits:", err.message);
          }
        }
      }

      res.send({ received: true });
    }
  );
};
