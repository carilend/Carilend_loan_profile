document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop form from refreshing page
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
  
    // Temporary demo login success
    alert(`Welcome, ${email}! Redirecting to dashboard...`);
    window.location.href = "dashboard.html"; // change to your dashboard page
  });
  