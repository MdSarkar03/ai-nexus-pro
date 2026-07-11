import mongoose from "mongoose";
const promptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  toolName: { type: String, required: true },
  category: { type: String, required: true },
  useCase: { type: String, required: true },
  promptText: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  tags: [String],
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
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

export default mongoose.model("Prompt", promptSchema);