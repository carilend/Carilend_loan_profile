/* preferences-core.js */

// ===== Theme Handling =====
function applyTheme(theme) {
    document.body.classList.remove("system-theme", "light-theme", "dark-theme");
  
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      // System default → your gradient
      document.body.classList.add("system-theme");
    }
  }
  
  // ===== Language Handling =====
  function applyLanguage(lang) {
    const translations = {
      en: { preferences: "Preferences" },
      fr: { preferences: "Préférences" },
      es: { preferences: "Preferencias" },
    };
  
    const dict = translations[lang] || translations.en;
  
    const pageTitle = document.querySelector(".page-title");
    if (pageTitle) pageTitle.textContent = dict.preferences;
  
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (dict[key]) el.textContent = dict[key];
    });
  }
  
  // ===== Auto-load saved preferences on every page =====
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "system";
    const savedLanguage = localStorage.getItem("language") || "en";
  
    applyTheme(savedTheme);
    applyLanguage(savedLanguage);
  });
  