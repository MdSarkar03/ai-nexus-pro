import dotenv from "dotenv";
import mongoose from "mongoose";
import Stack from "./models/Stack.js";

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
    console.log("Connected to MongoDB successfully.");

    // 1. Fetch and print all stacks in the collection first to confirm title-to-role mapping
    const allStacks = await Stack.find({});
    console.log("--- CURRENT STACKS IN DATABASE ---");
    allStacks.forEach((stack, index) => {
      console.log(`${index + 1}. Title: "${stack.title}" | Role: "${stack.role}"`);
    });
    console.log("----------------------------------\n");

    // 2. Identify the 10 target stacks and map them to their new roles
    const targetMappings = [
      { matcher: (s) => s.title === "Startup MVP Stack", roles: ["Developer"] },
      { matcher: (s) => s.role === "Building AI-powered SaaS applications", roles: ["Developer"] },
      { matcher: (s) => s.role === "Cloud-native DevOps infrastructure", roles: ["Developer"] },
      { matcher: (s) => s.role === "Backend architecture for Android and iOS applications", roles: ["Developer"] },
      { matcher: (s) => s.role === "End-to-end ML model development and deployment", roles: ["Developer"] },
      { matcher: (s) => s.role === "Enterprise ETL and analytics platform", roles: ["Developer"] },
      { matcher: (s) => s.role === "HIPAA-ready AI healthcare platform", roles: ["Developer"] },
      { matcher: (s) => s.role === "Large-scale enterprise software", roles: ["Developer"] },
      { matcher: (s) => s.role === "Scalable online store and marketplace", roles: ["Developer", "Marketer"] },
      { matcher: (s) => s.role === "Threat detection and security monitoring", roles: ["Developer"] }
    ];

    const updates = [];

    for (const mapping of targetMappings) {
      const match = allStacks.find(mapping.matcher);
      if (match) {
        updates.push({
          title: match.title,
          roles: mapping.roles,
          originalRole: match.role
        });
      } else {
        console.warn(`Warning: Could not find stack matching specified condition.`);
      }
    }

    console.log("--- CONFIRMED TITLE-TO-ROLES MAPPING ---");
    updates.forEach((up, index) => {
      console.log(`${index + 1}. Title: "${up.title}" | Original Role: "${up.originalRole}" -> Target Roles: ${JSON.stringify(up.roles)}`);
    });
    console.log("----------------------------------------\n");

    // 3. Apply updates using updateOne with $set on the "roles" field only
    console.log("--- APPLYING UPDATES ---");
    for (const up of updates) {
      const result = await Stack.updateOne(
        { title: up.title },
        { $set: { roles: up.roles } }
      );
      console.log(`Update result for "${up.title}":`, result);
    }
    console.log("All updates completed.\n");

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
