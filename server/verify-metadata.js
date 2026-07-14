import dotenv from "dotenv";
import mongoose from "mongoose";
import Tool from "./models/Tool.js";
import Prompt from "./models/Prompt.js";
import Stack from "./models/Stack.js";
import Workflow from "./models/Workflow.js";

// Configure dotenv
dotenv.config({ path: "C:/Users/Tanmoy/ai-nexus-pro/.env" });

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI not found in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);

    const models = [
      { name: "Tool", model: Tool },
      { name: "Prompt", model: Prompt },
      { name: "Stack", model: Stack },
      { name: "Workflow", model: Workflow }
    ];

    const missingQuery = {
      $or: [
        { metadata: { $exists: false } },
        { "metadata.domains": { $exists: false } },
        { "metadata.domains": { $size: 0 } },
        { "metadata.projectTypes": { $exists: false } },
        { "metadata.projectTypes": { $size: 0 } },
        { "metadata.budget": { $exists: false } },
        { "metadata.budget": { $size: 0 } }
      ]
    };

    for (const m of models) {
      const total = await m.model.countDocuments({});
      const missingMetadata = await m.model.countDocuments(missingQuery);
      console.log(`${m.name}: total=${total}, missingMetadata=${missingMetadata}`);
    }

  } catch (error) {
    console.error("An error occurred during verification:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
