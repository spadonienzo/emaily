import mongoose from "mongoose";

const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: { type: String, required: true },
  responded: { type: Boolean, default: false },
});

export default mongoose.model("Recipient", recipientSchema);
