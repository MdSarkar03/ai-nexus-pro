// test-connection.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("MONGO_URI from .env:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT FOUND");

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log("✅ Successfully connected to MongoDB!");
  process.exit(0);
})
.catch((err) => {
  console.error("❌ Connection Failed:", err.message);
  console.log("\n💡 Possible fixes:");
  console.log("1. Start MongoDB server (mongod)");
  console.log("2. Check your .env file MONGO_URI");
  console.log("3. Use: mongodb://127.0.0.1:27017/ai-nexus-pro");
  process.exit(1);
});