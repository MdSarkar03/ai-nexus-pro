import dotenv from "dotenv";
import mongoose from "mongoose";
import Tool from "./models/Tool.js";
import Prompt from "./models/Prompt.js";
import Stack from "./models/Stack.js";
import Workflow from "./models/Workflow.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

async function printGroupCounts(model, fieldName, title) {
  const results = await model.aggregate([
    {
      $group: {
        _id: `$${fieldName}`,
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  console.log(`=== ${title} ===`);
  results.forEach(res => {
    const value = res._id === null || res._id === undefined ? "N/A" : res._id;
    console.log(`- ${value}: ${res.count}`);
  });
  console.log();
}

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI not found in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully.\n");

    // 1. Count of documents in "tools" collection grouped by "category"
    await printGroupCounts(Tool, "category", "Tools by Category");

    // 2. Count of documents in "tools" collection grouped by "pricing"
    await printGroupCounts(Tool, "pricing", "Tools by Pricing");

    // 3. Count of documents in "prompts" collection grouped by "category"
    await printGroupCounts(Prompt, "category", "Prompts by Category");

    // 4. Count of documents in "prompts" collection grouped by "difficulty"
    await printGroupCounts(Prompt, "difficulty", "Prompts by Difficulty");

    // 5. Count of documents in "stacks" collection grouped by "difficulty"
    await printGroupCounts(Stack, "difficulty", "Stacks by Difficulty");

    // 6. Count of documents in "workflows" collection grouped by "category"
    await printGroupCounts(Workflow, "category", "Workflows by Category");

    // 7. Count of documents in "workflows" collection grouped by "difficulty"
    await printGroupCounts(Workflow, "difficulty", "Workflows by Difficulty");

  } catch (error) {
    console.error("An error occurred during aggregation:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
