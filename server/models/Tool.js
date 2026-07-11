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
  metadata: {
    projectTypes: { type: [String], default: [] },
    domains: { type: [String], default: [] },
    complexity: { type: [String], enum: ["Simple", "Moderate", "Complex"], default: [] },
    budget: { type: [String], enum: ["Free", "Low", "Medium", "High"], default: [] },
    teamSize: { type: [String], enum: ["Solo", "Small", "Medium", "Large"], default: [] },
    deployment: { type: [String], enum: ["Cloud", "On-Prem", "Serverless", "Hybrid", "Any"], default: [] },
    securityLevel: { type: [String], enum: ["Standard", "High"], default: [] },
  },
}, { timestamps: true });

export default mongoose.model("Tool", toolSchema);