import express from "express";
import Prompt from "../models/Prompt.js";

const router = express.Router();

// Get all prompts
router.get("/", async (req, res) => {
  try {
    const { toolName, category, difficulty } = req.query;
    let filter = {};

    if (toolName) filter.toolName = { $regex: toolName, $options: "i" };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const prompts = await Prompt.find(filter);
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single prompt
router.get("/:id", async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ message: "Prompt not found" });
    res.json(prompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Prompt.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;