// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import toolsRouter from "./routes/tools.js";
import workflowsRouter from "./routes/workflows.js";
import modelsRouter from "./routes/models.js";
import stacksRouter from "./routes/stacks.js";
import promptsRouter from "./routes/prompts.js";
import searchRouter from "./routes/search.js";

// New engine route (CommonJS compatible require for consistency with potential mixed usage)
import engineRoutes from "./routes/engine.js";
import architectRoutes from "./routes/architect.js";
import authRouter from "./routes/auth.js";

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tools", toolsRouter);
app.use("/api/workflows", workflowsRouter);
app.use("/api/models", modelsRouter);
app.use("/api/stacks", stacksRouter);
app.use("/api/prompts", promptsRouter);
app.use("/api/search", searchRouter);

// New Decision Intelligence Engine route
app.use('/api/engine', engineRoutes);
app.use('/api/architect', architectRoutes);
app.use("/api/auth", authRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AI Nexus Pro API running" });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));