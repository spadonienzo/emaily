import mongoose from "mongoose";
import recipientSchema from "./Recipient.js";

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  subject: { type: String, required: true },
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

// You can export the model directly:
mongoose.model("surveys", surveySchema);
