document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(document.querySelectorAll(".step"));
  const dots  = Array.from(document.querySelectorAll(".dot"));
  const stepNum = document.getElementById("stepNum");
  const form = document.getElementById("kycForm");
  const loader = document.getElementById("loader");

  let current = 0;

  function setStep(i, dir = 1) {
    if (i === current) return;

    // animate current out
    const out = steps[current];
    out.classList.remove("active");
    out.classList.add(dir > 0 ? "exit-left" : "exit-right");

    // animate next in
    const into = steps[i];
    into.classList.remove("exit-left","exit-right");
    into.classList.add("active");

    // update dots and number
    dots.forEach((d, idx) => d.classList.toggle("active", idx <= i));
    stepNum.textContent = i + 1;

    // after anim, clean exit classes
    setTimeout(() => { out.classList.remove("exit-left","exit-right"); }, 450);

    current = i;
  }

  function validateStep(i) {
    const required = steps[i].querySelectorAll("input[required]");
    let ok = true;
    required.forEach(inp => {
      const valid = inp.type === "checkbox" ? inp.checked : !!inp.value.trim();
      if (!valid) {
        ok = false;
        inp.classList.add("invalid");
        inp.addEventListener("input", () => inp.classList.remove("invalid"), { once: true });
      }
    });
    return ok;
  }

  // Delegate button clicks
  form.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("next")) {
      if (!validateStep(current)) return;
      if (current < steps.length - 1) setStep(current + 1, +1);
    }
    if (target.classList.contains("prev")) {
      if (current > 0) setStep(current - 1, -1);
    }
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep(current)) return;

    // Collect all data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Show loader
    loader.classList.remove("hidden");
    // Get token from localStorage
    const token = localStorage.getItem("authToken"); // make sure your key name matches how you stored it

    console.log(data)
    // POST to your API (replace URL)
    fetch("https://bankco-3jtv.onrender.com/api/v1/user/addKyc", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // include the token
       },
      body: JSON.stringify(data)
    })
      .then(res => res.json().then(j => ({ ok: res.ok, data: j })).catch(() => ({ ok: res.ok, data: {} })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.message || "Submission failed");
        //Success: redirect or show success state
        window.location.href = "selfie.html";
        console.log(data)
      })
      .catch(err => {
        loader.classList.add("hidden");
        alert(err.message || "Could not submit application. Please try again.");
      });
  });
});
