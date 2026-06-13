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
}, { timestamps: true });

export default mongoose.model("Workflow", workflowSchema);