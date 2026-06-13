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
}, { timestamps: true });

export default mongoose.model("Prompt", promptSchema);