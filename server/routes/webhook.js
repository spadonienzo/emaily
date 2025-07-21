import keys from "../config/keys.js";
import Stripe from "stripe";
import mongoose from "mongoose";

const stripe = new Stripe(keys.stripeSecretKey);
const User = mongoose.model("users");

const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      keys.stripeWebhookSecret
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    if (userId) {
      try {
        await User.findByIdAndUpdate(userId, { $inc: { credits: 5 } });
        console.log("✅ User credits updated for user:", userId);
      } catch (err) {
        console.error("❌ Failed to update user credits:", err.message);
      }
    }
  }

  res.send({ received: true });
};

export default webhookHandler;
