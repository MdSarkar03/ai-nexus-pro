// 1. Complete server/routes/workflows.js
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

    const workflows = await Workflow.find(filter).sort({ createdAt: -1 });
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

// CREATE workflow
router.post("/", async (req, res) => {
  try {
    const workflow = new Workflow(req.body);
    const savedWorkflow = await workflow.save();
    res.status(201).json(savedWorkflow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE workflow
router.put("/:id", async (req, res) => {
  try {
    const workflow = await Workflow.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!workflow) return res.status(404).json({ message: "Workflow not found" });
    res.json(workflow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE workflow
router.delete("/:id", async (req, res) => {
  try {
    const workflow = await Workflow.findByIdAndDelete(req.params.id);
    if (!workflow) return res.status(404).json({ message: "Workflow not found" });
    res.json({ message: "Workflow deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;