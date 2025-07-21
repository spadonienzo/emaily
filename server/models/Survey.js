import mongoose from "mongoose";
import RecipientSchema from "./Recipient.js";

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  subject: { type: String, required: true },
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

// You can export the model directly:
export default mongoose.model("Survey", surveySchema);
