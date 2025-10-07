// document.addEventListener("DOMContentLoaded", () => {
//     // Load saved preferences from localStorage
//     const savedTheme = localStorage.getItem("theme") || "system";
//     const savedLanguage = localStorage.getItem("language") || "en";
//     const savedNotifications = localStorage.getItem("notifications") === "true";
  
//     // ===== Apply theme =====
//     function applyTheme(theme) {
//       document.body.classList.remove("light-theme", "dark-theme");
//       if (theme === "dark") {
//         document.body.classList.add("dark-theme");
//       } else if (theme === "light") {
//         document.body.classList.add("light-theme");
//       } else {
//         // system theme → gradient
//       }
//     }
  
//     // ===== Apply language =====
//     function applyLanguage(lang) {
//       const texts = {
//         en: { title: "Preferences", notif: "Enable Notifications", theme: "Theme & Display", language: "Language", save: "Save Preferences" },
//         fr: { title: "Préférences", notif: "Activer les notifications", theme: "Thème & Affichage", language: "Langue", save: "Enregistrer" },
//         es: { title: "Preferencias", notif: "Habilitar notificaciones", theme: "Tema y Pantalla", language: "Idioma", save: "Guardar Preferencias" }
//       };
  
//       const dict = texts[lang] || texts.en;
  
//       // Only update if element exists (prevents errors on other pages)
//       const title = document.querySelector(".page-title");
//       if (title) title.textContent = dict.title;
  
//       const themeLabel = document.querySelector("label[for='theme']");
//       if (themeLabel) themeLabel.textContent = dict.theme;
  
//       const langLabel = document.querySelector("label[for='language']");
//       if (langLabel) langLabel.textContent = dict.language;
  
//       const notifLabel = document.querySelector(".toggle-label");
//       if (notifLabel) notifLabel.lastChild.textContent = dict.notif;
  
//       const saveBtn = document.querySelector(".save-btn");
//       if (saveBtn) saveBtn.textContent = dict.save;
//     }
  
//     // ===== Apply stored settings immediately =====
//     applyTheme(savedTheme);
//     applyLanguage(savedLanguage);
  
//     // ===== Preferences form (only runs on preferences page) =====
//     const form = document.getElementById("preferencesForm");
//     if (form) {
//       // Prefill form values
//       document.getElementById("theme").value = savedTheme;
//       document.getElementById("language").value = savedLanguage;
//       document.getElementById("notificationsToggle").checked = savedNotifications;
  
//       // Live change handlers
//       document.getElementById("theme").addEventListener("change", (e) => {
//         const theme = e.target.value;
//         localStorage.setItem("theme", theme);
//         applyTheme(theme);
//       });
  
//       document.getElementById("language").addEventListener("change", (e) => {
//         const lang = e.target.value;
//         localStorage.setItem("language", lang);
//         applyLanguage(lang);
//       });
  
//       document.getElementById("notificationsToggle").addEventListener("change", (e) => {
//         localStorage.setItem("notifications", e.target.checked);
//       });
  
//       // Form submit
//       form.addEventListener("submit", (e) => {
//         e.preventDefault();
//         alert("✅ Preferences saved locally!");
//       });
//     }
//   });

  // preferences.js
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "system";
    const savedLanguage = localStorage.getItem("language") || "en";
    const savedNotifications = localStorage.getItem("notifications") === "true";
  
    const themeSelect = document.getElementById("theme");
    const languageSelect = document.getElementById("language");
    const notificationsToggle = document.getElementById("notificationsToggle");
  
    if (!themeSelect || !languageSelect || !notificationsToggle) return;
  
    // Prefill form
    themeSelect.value = savedTheme;
    languageSelect.value = savedLanguage;
    notificationsToggle.checked = savedNotifications;
  
    // Live change handlers
    themeSelect.addEventListener("change", (e) => {
      const theme = e.target.value;
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    });
  
    languageSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("language", lang);
      applyLanguage(lang);
    });
  
    notificationsToggle.addEventListener("change", (e) => {
      localStorage.setItem("notifications", e.target.checked);
    });
  
    // Save button
    const form = document.getElementById("preferencesForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("✅ Preferences saved locally!");
      });
    }
  });
  