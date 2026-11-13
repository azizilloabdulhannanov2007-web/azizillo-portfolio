(function () {
  // Loyihalar ro'yxati. Matnlar translations ichida: proj.<id>.title va proj.<id>.text
  const projects = [
       {
      id: 1,
      image: "assets/images/restaurant.jpg",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/azizilloabdulhannanov2007-web/restoran_main-",
      demo: "https://restoranmain.vercel.app/",
    },
    {
      id: 2,
      image: "assets/images/football.jpg",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/azizilloabdulhannanov2007-web/fotballHub",
      demo: "https://fotball-hub.vercel.app/",
    },
  ];

  function card(p, withLinks) {
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");

    const thumb = p.image
      ? `<img class="card__img" src="${p.image}" alt="" loading="lazy" />`
      : `<div class="card__thumb"></div>`;

    const links = withLinks
      ? `<div class="project-card__links">
           <a href="${p.github}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">GitHub</a>
           <a href="${p.demo}" class="btn btn-primary btn-sm" target="_blank" rel="noopener" data-i18n="proj.demo"></a>
         </div>`
      : "";

    return `
      <article class="card project-card reveal">
        ${thumb}
        <h3 data-i18n="proj.${p.id}.title"></h3>
        <p class="card__text" data-i18n="proj.${p.id}.text"></p>
        <div class="tags">${tags}</div>
        ${links}
      </article>`;
  }

  const grid = document.getElementById("projects-grid");
  if (grid) grid.innerHTML = projects.map((p) => card(p, true)).join("");

  const featured = document.getElementById("featured-grid");
  if (featured) {
    featured.innerHTML = projects.slice(0, 3).map((p) => card(p, false)).join("");
  }
})();