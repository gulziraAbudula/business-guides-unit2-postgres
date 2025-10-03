import express from "express";
import guides from "../data/guides.js";
import { siteHeader, siteFooter, generateGuidePage } from "../utils/templates.js";
import GuidesController from '../controllers/guides.js'

const router = express.Router();

//router.get('/', GuidesController.getGuides)

router.get("/", async (req, res) => {
  try {
    const results = await GuidesController.getGuidesFromDB(); // Fetch data from the database
    const guides = results.rows; // Extract rows from the database query result

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
  } catch (error) {
    console.error("Error fetching guides:", error);
    res.status(500).send(siteHeader("Error") + "<h1>Internal Server Error</h1>");
  }
});

// Detail page
router.get("/guides/:slug", async (req, res) => {
  const { slug } = req.params; // Extract slug from the request parameters

  try {
    // Query the database for the guide with the matching slug
    const result = await GuidesController.getGuideBySlug(slug);

    // If no guide is found, return a 404 response
    if (result.rows.length === 0) {
      return res.status(404).send(siteHeader("404") + "<h1>404 Not Found</h1>");
    }

    // Extract the guide from the query result
    const guide = result.rows[0];

    // Generate and send the guide detail page
    res.send(generateGuidePage(guide));
  } catch (error) {
    console.error("Error fetching guide:", error);
    res.status(500).send(siteHeader("Error") + "<h1>Internal Server Error</h1>");
  }
});

export default router;
