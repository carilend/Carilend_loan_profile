// ===============================
// Manage User Functionality (with Loader)
// ===============================

const token = localStorage.getItem("authToken");
const user = JSON.parse(localStorage.getItem("selectedUser"));
const loader = document.getElementById("loader");

if (!token || !user) {
  window.location.href = "all-users.html";
}

// === Display basic user info ===
document.getElementById("fullname").textContent = user.fullname || "N/A";
document.getElementById("email").textContent = user.email || "N/A";
document.getElementById("profileImage").src =
  user.profileImage || "https://via.placeholder.com/100";

// === Loader functions ===
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
        lockedBalance: amount
      })
    });

    const data = await res.json();
    console.log("✅ Balance Updated:", data);
    console.log(amount)
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
    const res = await fetch(
      `https://bankco-3jtv.onrender.com/api/v1/admin/deleteUser/${user.userId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await res.json();
    console.log("🗑️ User deleted:", data);

    if (res.ok) {
      alert("✅ User deleted successfully!");
      localStorage.removeItem("selectedUser");
      localStorage.removeItem("userSerials");
      window.location.href = "users.html";
    } else {
      alert(data.message || "❌ Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("⚠️ Error deleting user. Please try again.");
  } finally {
    hideLoader();
  }
});

// === Create Serials ===
const createSerialsBtn = document.getElementById("createSerials");
if (createSerialsBtn) {
  createSerialsBtn.addEventListener("click", async () => {
    showLoader("Creating serials...");

    try {
      const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/admin/createSerial", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId })
      });

      const data = await res.json();
      console.log("🔢 Serial creation response:", data);

      if (res.ok && data.data) {
      //   const { serialNumber1, serialNumber2, serialNumber3 } = data.data;

      //   // Save to localStorage
      //   localStorage.setItem(
      //     "userSerials",
      //     JSON.stringify({
      //       userId: user.userId,
      //       serialNumber1,
      //       serialNumber2,
      //       serialNumber3
      //     })
      //   );

      //   // Display in HTML
      //   showSerials(serialNumber1, serialNumber2, serialNumber3);

        // alert("✅ Serials created successfully!");
      } else {
        alert(data.message || "❌ Failed to create serials.");
      }
    } catch (error) {
      console.error("Error creating serials:", error);
      alert("⚠️ An error occurred while creating serials.");
    } finally {
      hideLoader();
    }
  });
}

// === Display Serials Function ===
function showSerials(s1, s2, s3) {
  const serialsBox = document.getElementById("serialsBox");
  if (!serialsBox) return;

  serialsBox.style.display = "block";
  document.getElementById("serial1").textContent = s1 || "—";
  document.getElementById("serial2").textContent = s2 || "—";
  document.getElementById("serial3").textContent = s3 || "—";
}
// === Display Serials Function ===
function showSerials(serialsArray) {
  const serialsBox = document.getElementById("serialsBox");
  if (!serialsBox) return;

  serialsBox.style.display = "block";

  // Display serials dynamically
  document.getElementById("serial1").textContent = serialsArray[0] || "—";
  document.getElementById("serial2").textContent = serialsArray[1] || "—";
  document.getElementById("serial3").textContent = serialsArray[2] || "—";
}

// === Fetch and Display Serials From Backend ===
async function loadUserSerials() {
  showLoader("Loading user serials...");

  try {
    const res = await fetch(
      `https://bankco-3jtv.onrender.com/api/v1/admin/viewSerial/${user.userId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await res.json();
    console.log("📡 Serial Fetch Response:", data);

    if (res.ok && Array.isArray(data.data) && data.data.length > 0) {
      showSerials(data.data);
    } else {
      const serialsBox = document.getElementById("serialsBox");
      if (serialsBox) {
        serialsBox.style.display = "block";
        serialsBox.innerHTML = `<p>No serials found for this user.</p>`;
      }
    }
  } catch (error) {
    console.error("❌ Error fetching serials:", error);
    alert("⚠️ Failed to load user serials.");
  } finally {
    hideLoader();
  }
}

// === Load serials when page loads ===
document.addEventListener("DOMContentLoaded", loadUserSerials);
