import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import keys from "./config/keys.js";
import "./models/User.js";
import "./models/Survey.js";
import "./services/passport.js";

import authRoutes from "./routes/authRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import stripeHandler from "./routes/stripeRoute.js";

mongoose.connect(keys.mongoURI);

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RAW body parser for Stripe webhooks — must come first
app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeHandler
);

// Regular body parser for the rest
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Route handlers
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
