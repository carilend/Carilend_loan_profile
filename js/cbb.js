document.addEventListener("DOMContentLoaded", () => {
    const correctCode = "CBB-LOAN-784215"; // Example valid CBB Authorization Code
    const form = document.getElementById("cbbForm");
    const input = document.getElementById("cbbInput");
    const errorMsg = document.getElementById("errorMsg");
    const timerContainer = document.getElementById("timerContainer");
    const infoText = document.querySelector(".info-text");
    const timerDisplay = document.getElementById("timer");
  
    const LOADER_DURATION = 3000; // 3 seconds loader
    const COUNTDOWN_TIME = 60; // 1 minute countdown
    const TIMER_KEY = "cbb_timer_end";
  
    let endTime = localStorage.getItem(TIMER_KEY);
  
    function startCountdown() {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        timerDisplay.textContent = remaining;
        if (remaining <= 0) {
          clearInterval(interval);
          localStorage.removeItem(TIMER_KEY);
          window.location.href = "success.html"; // Redirect when complete
        }
      }, 1000);
    }
  
    // Resume countdown if it was already started
    if (endTime && Date.now() < endTime) {
      form.classList.add("hidden");
      infoText.classList.add("hidden");
      errorMsg.classList.add("hidden");
      timerContainer.classList.remove("hidden");
      startCountdown();
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = input.value.trim();
  
      if (code === correctCode) {
        errorMsg.classList.add("hidden");
        form.classList.add("hidden");
        infoText.classList.add("hidden");
  
        // Simulated verification loader
        timerContainer.innerHTML = "<p>⏳ Verifying CBB Authorization...</p>";
        timerContainer.classList.remove("hidden");
  
        setTimeout(() => {
          timerContainer.innerHTML = `
            <p>
              ✅ <strong>Code verified successfully!</strong><br>
              Your loan withdrawal transfer has been submitted to the 
              <strong>Central Bank of Barbados</strong> for final foreign exchange clearance.
              Please wait for the completion of this process.
            </p>
            <div id="timer">60</div>
          `;
          endTime = Date.now() + COUNTDOWN_TIME * 1000;
          localStorage.setItem(TIMER_KEY, endTime);
          startCountdown();
        }, LOADER_DURATION);
      } else {
        errorMsg.classList.remove("hidden");
      }
    });
  });
  