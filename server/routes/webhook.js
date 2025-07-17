const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = async (req, res) => {
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
