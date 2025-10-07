document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("imfForm");
    const input = document.getElementById("imfInput");
    const errorMsg = document.getElementById("errorMsg");
    const infoText = document.querySelector(".info-text");
    const imfLogo = document.querySelector(".imf-logo");
    const heading = document.querySelector("h2");
  
    const CORRECT_CODE = "IMF-9042-UKX";  // ✅ Example code
    const TIMER_DURATION = 60;             // 1 minute
    const LOADER_DURATION = 2000;          // 2s fake verification delay
  
    const savedEnd = localStorage.getItem("imf_timer_end");
    const verified = localStorage.getItem("imf_verified") === "true";
  
    // 🧠 Restore timer display if already verified previously
    if (verified && savedEnd && Date.now() < savedEnd) {
      renderTimerLayout();
      startTimer((savedEnd - Date.now()) / 1000);
      return;
    }
  
    // 🔑 Handle IMF code form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = input.value.trim().toUpperCase();
  
      if (code === CORRECT_CODE) {
        errorMsg.classList.add("hidden");
        form.classList.add("hidden");
        infoText.classList.add("hidden");
        imfLogo.classList.add("hidden");
        heading.textContent = "Verifying IMF Code...";
  
        // Show loader text briefly
        setTimeout(() => {
          // After verification → store timer info
          const endTime = Date.now() + TIMER_DURATION * 1000;
          localStorage.setItem("imf_timer_end", endTime);
          localStorage.setItem("imf_verified", "true");
  
          // Replace content with success + countdown
          renderTimerLayout();
          startTimer(TIMER_DURATION);
        }, LOADER_DURATION);
      } else {
        errorMsg.classList.remove("hidden");
      }
    });
  
    // 🧭 Function: render timer success screen
    function renderTimerLayout() {
      document.querySelector(".card").innerHTML = `
        <h2>IMF Authorization Confirmed</h2>
        <p>
          ✅ <strong>Code verified successfully!</strong><br><br>
          Your transaction is now being processed through the international settlement network.<br>
          Please wait while we complete the IMF clearance.<br><br>
          <em>Do not close or refresh the page during this process.</em>
        </p>
        <div id="timerContainer">
          <div id="timer">60</div>
        </div>
      `;
    }
  
    // ⏲️ Function: handle countdown + redirect
    function startTimer(seconds) {
      let remaining = Math.ceil(seconds);
      const timerEl = document.getElementById("timer");
  
      const interval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          clearInterval(interval);
          localStorage.removeItem("imf_timer_end");
          localStorage.removeItem("imf_verified");
          window.location.href = "tax.html";
        } else {
          timerEl.textContent = remaining;
        }
      }, 1000);
    }
  });
  