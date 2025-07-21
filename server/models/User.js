import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, required: true },
  credits: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
