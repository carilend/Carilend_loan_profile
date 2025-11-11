document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("imfForm");
  const input = document.getElementById("imfInput");
  const errorMsg = document.getElementById("errorMsg");
  const infoText = document.querySelector(".info-text");
  const imfLogo = document.querySelector(".imf-logo");
  const heading = document.querySelector("h2");

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("selectedUser"));
  const TIMER_DURATION = 60; // seconds
  const LOADER_DURATION = 2000; // fake verification delay (optional)

  const savedEnd = localStorage.getItem("imf_timer_end");
  const verified = localStorage.getItem("imf_verified") === "true";

  // 🧠 Restore timer display if already verified previously
  if (verified && savedEnd && Date.now() < savedEnd) {
    renderTimerLayout();
    startTimer((savedEnd - Date.now()) / 1000);
    return;
  }

  // 🔑 Handle IMF code form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = input.value.trim();

    if (!code) {
      errorMsg.textContent = "Please enter your IMF code.";
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");
    form.classList.add("hidden");
    infoText.classList.add("hidden");
    imfLogo.classList.add("hidden");
    heading.textContent = "Verifying IMF Code...";

    try {
      // ⏳ Optional: short loader delay for UX
      await new Promise((resolve) => setTimeout(resolve, LOADER_DURATION));

      // 🔗 Send code to backend for verification
      const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/inputSerials", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.userId,
          serialNumber1: code
        })
      });
      console.log(code)

      const data = await res.json();
      console.log("✅ IMF Verification Response:", data);

      if (res.ok && data.message?.toLowerCase().includes("verified")) {
        // 💾 Save timer info locally
        const endTime = Date.now() + TIMER_DURATION * 1000;
        localStorage.setItem("imf_timer_end", endTime);
        localStorage.setItem("imf_verified", "true");

        renderTimerLayout();
        startTimer(TIMER_DURATION);
      } else {
        heading.textContent = "IMF Authorization Required";
        form.classList.remove("hidden");
        infoText.classList.remove("hidden");
        imfLogo.classList.remove("hidden");
        errorMsg.textContent = data.message || "Invalid IMF code.";
        errorMsg.classList.remove("hidden");
      }
    } catch (err) {
      console.error("❌ Error verifying IMF code:", err);
      heading.textContent = "IMF Authorization Required";
      form.classList.remove("hidden");
      infoText.classList.remove("hidden");
      imfLogo.classList.remove("hidden");
      errorMsg.textContent = "Network error. Please try again.";
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
