document.addEventListener("DOMContentLoaded", () => {
    const correctCode = "TAX-2025"; // ✅ Replace with your real verification code
    const form = document.getElementById("taxForm");
    const input = document.getElementById("taxInput");
    const errorMsg = document.getElementById("errorMsg");
    const timerContainer = document.getElementById("timerContainer");
    const timerDisplay = document.getElementById("timer");
    const infoText = document.querySelector(".info-text");
    const logo = document.querySelector(".imf-logo");
    const heading = document.querySelector("h2");
    const formElements = [form, infoText, logo, heading];
  
    const duration = 60 * 1000; // 1 minute
    const endTime = localStorage.getItem("taxCountdownEnd");
  
    // ✅ Resume countdown if page is refreshed
    if (endTime && Date.now() < endTime) {
      showTimer(endTime);
    } else {
      localStorage.removeItem("taxCountdownEnd");
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userCode = input.value.trim();
  
      if (userCode === correctCode) {
        errorMsg.classList.add("hidden");
        formElements.forEach(el => el.classList.add("hidden"));
        showLoader();
  
        setTimeout(() => {
          hideLoader();
          const targetEnd = Date.now() + duration;
          localStorage.setItem("taxCountdownEnd", targetEnd);
          showTimer(targetEnd);
        }, 2000);
      } else {
        errorMsg.classList.remove("hidden");
      }
    });
  
    function showTimer(endTime) {
      timerContainer.classList.remove("hidden");
  
      const interval = setInterval(() => {
        const remaining = Math.max(0, endTime - Date.now());
        const seconds = Math.ceil(remaining / 1000);
        timerDisplay.textContent = seconds;
  
        if (remaining <= 0) {
          clearInterval(interval);
          localStorage.removeItem("taxCountdownEnd");
          window.location.href = "cbb.html"; // ✅ next step
        }
      }, 1000);
    }
  
    function showLoader() {
      const loader = document.createElement("div");
      loader.className = "loader";
      loader.innerHTML = `<div class="spinner"></div><p>Verifying Tax Code...</p>`;
      document.querySelector(".card").appendChild(loader);
    }
  
    function hideLoader() {
      const loader = document.querySelector(".loader");
      if (loader) loader.remove();
    }
  });
  