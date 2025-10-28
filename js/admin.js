// ===========================
// Admin Dashboard (Promise Version)
// ===========================

// Get token from localStorage
const token = localStorage.getItem("authToken");

// Redirect to login if token is missing
if (!token) {
  window.location.href = "login.html";
}

// Display placeholders while loading
function showLoading() {
  ["totalUsers", "savingsCount", "chequeingsCount", "loanRequests", "newUsers"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "…";
  });
}

// Load dashboard data using Promises
function loadAdminOverview() {
  showLoading();

  fetch("https://bankco-3jtv.onrender.com/api/v1/admin/allUsers", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log("✅ Admin Response:", result);

      const users = result.data || [];

      document.getElementById("totalUsers").textContent = users.length;
      document.getElementById("savingsCount").textContent = users.filter(u => u.accountType === "savings").length;
      document.getElementById("chequeingsCount").textContent = users.filter(u => u.accountType === "chequeing").length;
      document.getElementById("loanRequests").textContent = users.filter(u => Number(u.amountRequested) > 0).length;

      // New Users this week
      const now = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      const newUsers = users.filter(u => new Date(u.createdAt) >= oneWeekAgo).length;
      document.getElementById("newUsers").textContent = newUsers;

      // Optional timestamp
      const lastUpdated = document.getElementById("lastUpdated");
      if (lastUpdated) {
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
      }
    })
    .catch(error => {
      console.error("❌ Failed to load admin overview:", error);
      ["totalUsers", "savingsCount", "chequeingsCount", "loanRequests", "newUsers"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "–";
      });
    });
}

// Sidebar toggle (ensure declared once)
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuToggle = document.getElementById("menuToggle");
  const closeSidebar = document.getElementById("closeSidebar");

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("show");
      overlay.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("active");
    });
  }

  // Load dashboard after DOM ready
  loadAdminOverview();
});


// Sidebar toggle (mobile)
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");

if (menuToggle && sidebar && overlay) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("show");
    overlay.classList.add("active");
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("active");
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadAdminOverview);
