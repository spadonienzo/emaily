import mongoose from "mongoose";
import keys from "../config/keys.js";
import Stripe from "stripe";
import requireLogin from "../middlewares/requireLogin.js";

const stripe = new Stripe(keys.stripeSecretKey);
const User = mongoose.model("users");

export default function billingRoutes(app) {
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
          userId: req.user.id,
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
}
