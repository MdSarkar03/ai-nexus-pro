import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  pricing: { type: String, enum: ["Free", "Freemium", "Paid"], required: true },
  url: { type: String, required: true },
  logo: { type: String, default: "" },
  tags: [String],
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.0 },
}, { timestamps: true });

export default mongoose.model("Tool", toolSchema);