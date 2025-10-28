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
 
    console.log(data.data)
    if (users.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="loading">No users found.</td></tr>`;
      return;
    }

    renderTable(users);

    // Search functionality
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
    <tr>
      <td>${i + 1}</td>
      <td>${u.fullname || "N/A"}</td>
      <td>${u.email || "N/A"}</td>
      <td>${u.accountType || "—"}</td>
      <td>$${Number(u.balance || 0).toLocaleString()}</td>
      <td>${new Date(u.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join("");
}

refreshBtn.addEventListener("click", loadUsers);
document.addEventListener("DOMContentLoaded", loadUsers);
