import express from "express";
import Workflow from "../models/Workflow.js";

const router = express.Router();

// Get all workflows
router.get("/", async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const workflows = await Workflow.find(filter);
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single workflow
router.get("/:id", async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) return res.status(404).json({ message: "Workflow not found" });
    res.json(workflow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Workflow.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;