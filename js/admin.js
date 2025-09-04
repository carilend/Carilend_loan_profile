const token = localStorage.getItem("authToken");

async function loadAdminOverview() {
  try {
    const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/admin/allUsers", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const result = await res.json();
    console.log("Admin Response:", result);

    const users = result.data || [];

    // Total Users
    document.getElementById("totalUsers").textContent = users.length;

    // Savings Accounts
    const savingsCount = users.filter(u => u.accountType === "savings").length;
    document.getElementById("savingsCount").textContent = savingsCount;

    // Chequeings Accounts
    const chequeingsCount = users.filter(u => u.accountType === "chequeing").length;
    document.getElementById("chequeingsCount").textContent = chequeingsCount;

    // Loan Requests (users with amountRequested > 0)
    const loanRequests = users.filter(u => Number(u.amountRequested) > 0).length;
    document.getElementById("loanRequests").textContent = loanRequests;

    // New Users This Week
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const newUsers = users.filter(u => new Date(u.createdAt) >= oneWeekAgo).length;
    document.getElementById("newUsers").textContent = newUsers;

  } catch (err) {
    console.error("❌ Failed to load admin overview:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadAdminOverview);
