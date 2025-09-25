async function loadGuides() {
    try {
      const res = await fetch('http://localhost:3000/api/guides');
      const guides = await res.json();
  
      const list = document.getElementById('guide-list');
      list.innerHTML = guides.map(g => `
        <article class="card">
          <a href="http://localhost:3000/guides/${g.slug}">
            <img src="${g.image}" alt="${g.title}">
            <h3>${g.title}</h3>
            <p class="meta">${g.category} • ${g.submittedBy}</p>
          </a>
        </article>
      `).join('');
    } catch (err) {
      console.error("Error fetching guides:", err);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadGuides);
  