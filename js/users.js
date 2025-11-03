// ===============================
// All Users Page Script
// ===============================

const token = localStorage.getItem("authToken");
if (!token) window.location.href = "login.html";

const tableBody = document.getElementById("userTableBody");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshUsers");

async function loadUsers() {
  tableBody.innerHTML = `<tr><td colspan="6" class="loading">Loading users...</td></tr>`;

  try {
    const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/admin/allUsers", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    const data = await res.json();
    const users = data.data || [];

    if (users.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="loading">No users found.</td></tr>`;
      return;
    }

    renderTable(users);

    // Search filter
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = users.filter(u =>
        u.fullname?.toLowerCase().includes(value) ||
        u.email?.toLowerCase().includes(value)
      );
      renderTable(filtered);
    });

  } catch (err) {
    console.error("❌ Error loading users:", err);
    tableBody.innerHTML = `<tr><td colspan="6" class="loading">Failed to load users.</td></tr>`;
  }
}

function renderTable(users) {
  tableBody.innerHTML = users.map((u, i) => `
    <tr class="user-row" data-user='${JSON.stringify(u).replace(/'/g, "&apos;")}'>
      <td>${i + 1}</td>
      <td class="clickable">${u.fullname || "N/A"}</td>
      <td>${u.email || "N/A"}</td>
      <td>${u.accountType || "—"}</td>
      <td>$${Number(u.balance || 0).toLocaleString()}</td>
      <td>${new Date(u.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join("");

  // Attach click handlers
  document.querySelectorAll(".user-row").forEach(row => {
    row.addEventListener("click", () => {
      const user = JSON.parse(row.dataset.user);
      // Save full user details in localStorage
      localStorage.setItem("selectedUser", JSON.stringify(user));
      // Redirect to details page
      window.location.href = "user-details.html";
    });
  });
}

refreshBtn.addEventListener("click", loadUsers);
document.addEventListener("DOMContentLoaded", loadUsers);

// ===============================
// Sidebar Toggle (Shared)
// ===============================

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
});
