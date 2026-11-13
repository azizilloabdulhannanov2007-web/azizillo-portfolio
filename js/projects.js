(function () {
  const pages = [
    { file: "index", href: "index.html", key: "nav.home" },
    { file: "about", href: "about.html", key: "nav.about" },
    { file: "projects", href: "projects.html", key: "nav.projects" },
    { file: "resume", href: "resume.html", key: "nav.resume" },
    { file: "contact", href: "contact.html", key: "nav.contact" },
  ];

  // Hozirgi sahifa nomi: "/about.html" -> "about", "/" -> "index"
  const current =
    location.pathname.split("/").pop().replace(".html", "") || "index";

  const navLinks = pages
    .map((p) => {
      const active = p.file === current;
      return `<li><a href="${p.href}" class="nav__link${active ? " active" : ""}"${
        active ? ' aria-current="page"' : ""
      } data-i18n="${p.key}"></a></li>`;
    })
    .join("");

  const footerLinks = pages
    .map((p) => `<li><a href="${p.href}" data-i18n="${p.key}"></a></li>`)
    .join("");

  const headerHTML = `
    <header class="header">
      <div class="container header__inner">
        <a href="index.html" class="logo">Azizillo<span>.</span></a>

        <nav class="nav" id="nav" aria-label="Main navigation">
          <ul class="nav__list">${navLinks}</ul>
        </nav>

        <div class="header__tools">
          <select id="lang-select" class="lang-select" data-i18n-aria="ui.lang" aria-label="Language">
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="uz">UZ</option>
            <option value="ky">KY</option>
          </select>

          <button type="button" id="theme-toggle" class="icon-btn" data-i18n-aria="ui.theme" aria-label="Switch theme"></button>

          <button type="button" id="burger" class="icon-btn burger" data-i18n-aria="ui.menu" aria-label="Menu" aria-expanded="false" aria-controls="nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>`;

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="index.html" class="logo">Azizillo<span>.</span></a>
            <p class="footer__text" data-i18n="footer.text"></p>
          </div>

          <div>
            <h4 class="footer__title" data-i18n="footer.pages"></h4>
            <ul class="footer__list">${footerLinks}</ul>
          </div>

          <div>
            <h4 class="footer__title" data-i18n="footer.social"></h4>
            <ul class="footer__list">
              <li><a href="https://github.com/azizilloabdulhannanov2007-web" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="https://t.me/Saydullaevich_1" target="_blank" rel="noopener">Telegram</a></li>
              <li><a href="https://www.linkedin.com/in/azizillo-abdulkhannanov-5a9528405/" target="_blank" rel="noopener">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <p class="footer__bottom">
          &copy; ${new Date().getFullYear()} Abdulhannonov Azizillo.
          <span data-i18n="footer.rights"></span>
        </p>
      </div>
    </footer>`;

  // Placeholder'ni to'g'ridan-to'g'ri almashtiramiz (sticky Header buzilmasligi uchun)
  const headerHost = document.getElementById("site-header");
  const footerHost = document.getElementById("site-footer");
  if (headerHost) headerHost.outerHTML = headerHTML;
  if (footerHost) footerHost.outerHTML = footerHTML;
})();