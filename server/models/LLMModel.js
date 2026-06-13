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
}, { timestamps: true });

export default mongoose.model("LLMModel", llmModelSchema);