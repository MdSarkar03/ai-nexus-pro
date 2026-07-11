import mongoose from "mongoose";
const llmModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  description: { type: String, required: true },
  contextWindow: { type: String, required: true },
  costPer1MInput: { type: String, required: true },
  costPer1MOutput: { type: String, required: true },
  scores: {
    mmlu: { type: Number, default: 0 },
    humaneval: { type: Number, default: 0 },
    math: { type: Number, default: 0 },
    reasoning: { type: Number, default: 0 },
  },
  bestFor: [String],
  strengths: [String],
  weaknesses: [String],
  free: { type: Boolean, default: false },
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

export default mongoose.model("LLMModel", llmModelSchema);