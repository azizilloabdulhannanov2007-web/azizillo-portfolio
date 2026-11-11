(function () {
  const SUPPORTED = ["en", "ru", "uz", "ky"];
  const DEFAULT_LANG = "en";

  function getLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (SUPPORTED.includes(saved)) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  // Kalit bo'yicha tarjimani topadi. Topilmasa English, u ham bo'lmasa kalitning o'zi
  function t(key, lang) {
    const all = window.translations || {};
    const l = lang || getLang();
    if (all[l] && all[l][key] !== undefined) return all[l][key];
    if (all.en && all.en[key] !== undefined) return all.en[key];
    return key;
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n, lang);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml, lang);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder, lang));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria, lang));
    });

    if (document.body.dataset.title) {
      document.title = t(document.body.dataset.title, lang);
    }

    const select = document.getElementById("lang-select");
    if (select) select.value = lang;

    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
    apply(lang);
  }

  // Boshqa fayllar (contact.js) ishlatishi uchun
  window.i18n = { t, getLang, setLang, apply };

  const select = document.getElementById("lang-select");
  if (select) {
    select.addEventListener("change", (e) => setLang(e.target.value));
  }

  apply(getLang());
})();