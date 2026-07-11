import mongoose from "mongoose";
const stackToolSchema = new mongoose.Schema({
  toolName: { type: String, required: true },
  toolUrl: { type: String, required: true },
  purpose: { type: String, required: true },
  category: { type: String, required: true },
});

const stackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  tools: [stackToolSchema],
  tags: [String],
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  reasoning: { type: String, required: false },
  alternatives: [{ category: String, toolName: String, reason: String }],
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

export default mongoose.model("Stack", stackSchema);