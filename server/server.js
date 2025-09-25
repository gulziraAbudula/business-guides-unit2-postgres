import express from "express";
import apiRoutes from "./routes/api.js";
import pageRoutes from "./routes/pages.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// dirname helper for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "../client/dist"))); // serve vite build if exists
app.use("/api", apiRoutes);
app.use("/", pageRoutes);

// Catch-all fallback
app.use((req, res) => {
  res.status(404).send("<h1>404 - Not Found</h1>");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
