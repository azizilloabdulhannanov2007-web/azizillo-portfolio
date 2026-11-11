(function () {
  const root = document.documentElement;

  /* ========== Dark / Light ========== */
  const themeBtn = document.getElementById("theme-toggle");

  function renderThemeIcon() {
    if (!themeBtn) return;
    // Dark rejimda "quyosh" (light'ga o'tish), Light rejimda "oy"
    themeBtn.textContent = root.dataset.theme === "dark" ? "☀" : "☾";
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    renderThemeIcon();
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }
  renderThemeIcon();

  /* ========== Mobil menyu (burger) ========== */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  function closeMenu() {
    if (!burger || !nav) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });

    // Havolani bosganda menyu yopiladi
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

    // Esc bosilganda yopiladi
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Menyudan tashqariga bosilganda yopiladi
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });

    // Ekran kattalashsa yopiladi
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }
})();