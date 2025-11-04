// ===============================
// Manage User Functionality (with Loader)
// ===============================

const token = localStorage.getItem("authToken");
const user = JSON.parse(localStorage.getItem("selectedUser"));
const loader = document.getElementById("loader");

if (!token || !user) {
  window.location.href = "all-users.html";
}

document.getElementById("fullname").textContent = user.fullname || "N/A";
document.getElementById("email").textContent = user.email || "N/A";
document.getElementById("profileImage").src = user.profileImage || "https://via.placeholder.com/100";

function showLoader(message = "Processing...") {
  loader.innerHTML = `<div class="spinner"></div><p>${message}</p>`;
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

// === Set Balance ===
document.getElementById("setBalance").addEventListener("click", async () => {
  const amount = prompt("Enter new balance amount:");

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  showLoader("Updating balance...");

  try {
    const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/admin/setBalance", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.userId,
        amount: Number(amount)
      })
    });

    const data = await res.json();
    console.log("✅ Balance Updated:", data);

    if (res.ok) {
      alert("Balance updated successfully!");
    } else {
      alert(data.message || "Failed to update balance.");
    }
  } catch (error) {
    console.error("Error updating balance:", error);
    alert("Error updating balance. Please try again.");
  } finally {
    hideLoader();
  }
});

// === Delete User ===
document.getElementById("deleteUser").addEventListener("click", async () => {
  if (!confirm(`Are you sure you want to delete ${user.fullname}?`)) return;

  showLoader("Deleting user...");

  try {
    const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/admin/deleteUser", {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.userId })
    });

    const data = await res.json();
    console.log("🗑️ User deleted:", data);

    if (res.ok) {
      alert("User deleted successfully!");
      localStorage.removeItem("selectedUser");
      window.location.href = "all-users.html";
    } else {
      alert(data.message || "Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Error deleting user. Please try again.");
  } finally {
    hideLoader();
  }
});
