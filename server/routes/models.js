import express from "express";
import LLMModel from "../models/LLMModel.js";

const router = express.Router();

// Get all models
router.get("/", async (req, res) => {
  try {
    const { provider, free } = req.query;
    let filter = {};

    if (provider) filter.provider = provider;
    if (free) filter.free = free === "true";

    const models = await LLMModel.find(filter);
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single model
router.get("/:id", async (req, res) => {
  try {
    const model = await LLMModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;