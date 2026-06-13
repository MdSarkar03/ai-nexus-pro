import express from "express";
import Tool from "../models/Tool.js";

const router = express.Router();

// Get all tools
router.get("/", async (req, res) => {
  try {
    const { category, pricing, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (pricing) filter.pricing = pricing;
    if (search) filter.name = { $regex: search, $options: "i" };

    const tools = await Tool.find(filter);
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single tool
router.get("/:id", async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Tool.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;