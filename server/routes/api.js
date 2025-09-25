import express from "express";
import guides from "../data/guides.js";

const router = express.Router();

router.get("/guides", (req, res) => {
  res.json(guides);
});

router.get("/guides/:slug", (req, res) => {
  const guide = guides.find(g => g.slug === req.params.slug);
  if (!guide) return res.status(404).json({ error: "Guide not found" });
  res.json(guide);
});

export default router;
