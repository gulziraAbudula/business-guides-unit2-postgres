export function siteHeader(title = "Business Guides") {
    return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.*/css/pico.min.css">
  </head>
  <body>
    <main class="container">`;
  }
  
  export function siteFooter() {
    return `
      <footer style="margin-top:2rem; padding-top:1rem; border-top:1px solid #eee;">
        <p>Built with Pico.css • Demo app</p>
      </footer>
    </main>
  </body>
  </html>`;
  }
  
  export function generateGuidePage(guide) {
    return siteHeader(guide.title) + `
      <article class="card" style="padding:1rem;">
        <h1>${guide.title}</h1>
        <p class="meta">${guide.category} • ${guide.submittedBy} • ${guide.createdAt}</p>
        <img src="${guide.image}" alt="${guide.title}">
        <p>${guide.text}</p>
        <p><a href="/">← Back</a></p>
      </article>
    ` + siteFooter();
  }
  