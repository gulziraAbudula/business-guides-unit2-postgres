import express from "express";
import { pool } from "../config/database.js";

const router = express.Router();

// Get all guides (JSON API)
router.get("/guides", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM guides ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error fetching guides:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific guide by slug (JSON API)
router.get("/guides/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query("SELECT * FROM guides WHERE slug = $1", [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Guide not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching guide:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
