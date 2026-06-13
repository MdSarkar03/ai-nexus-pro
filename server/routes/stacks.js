import express from "express";
import Stack from "../models/Stack.js";

const router = express.Router();

// Get all stacks
router.get("/", async (req, res) => {
  try {
    const { role, difficulty } = req.query;
    let filter = {};

    if (role) filter.role = role;
    if (difficulty) filter.difficulty = difficulty;

    const stacks = await Stack.find(filter);
    res.json(stacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single stack
router.get("/:id", async (req, res) => {
  try {
    const stack = await Stack.findById(req.params.id);
    if (!stack) return res.status(404).json({ message: "Stack not found" });
    res.json(stack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;