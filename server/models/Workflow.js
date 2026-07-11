import mongoose from "mongoose";
const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  toolName: { type: String, required: true },
  toolUrl: { type: String, required: true },
  promptTemplate: { type: String, default: "" },
});

const workflowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  goal: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  description: { type: String, required: true },
  steps: [stepSchema],
  tags: [String],
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

export default mongoose.model("Workflow", workflowSchema);