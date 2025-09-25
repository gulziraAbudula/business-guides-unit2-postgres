import express from "express";
import guides from "../data/guides.js";
import { siteHeader, siteFooter, generateGuidePage } from "../utils/templates.js";

const router = express.Router();

// Home page (fallback if Vite not used)
router.get("/", (req, res) => {
  const list = guides.map(g => `
    <article class="card">
      <a href="/guides/${g.slug}">
        <img src="${g.image}" alt="${g.title}">
        <h3>${g.title}</h3>
        <p class="meta">${g.category} • ${g.submittedBy}</p>
      </a>
    </article>
  `).join("");

  res.send(siteHeader("Business Guides") + `
    <h1>Guide to Starting Your Business</h1>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1rem;">
      ${list}
    </div>
  `);
});

// Detail page
router.get("/guides/:slug", (req, res) => {
  const guide = guides.find(g => g.slug === req.params.slug);
  if (!guide) return res.status(404).send(siteHeader("404") + "<h1> 404 Not Found</h1>");
  res.send(generateGuidePage(guide));
});

export default router;
