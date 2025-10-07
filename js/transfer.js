// Reusable currency formatter
function formatCurrency(value, currency = "$") {
    const num = Number(value);
    if (isNaN(num)) return `${currency}0`;
    return `${currency}${num.toLocaleString()}`;
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found, please log in.");
  
      // Fetch profile to get balance
      const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/viewProfile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      const user = result.data[0];
  
      // Show balance
      document.getElementById("balance").textContent =
        formatCurrency(user.amountRequested, "$"); // or "₦"
    } catch (err) {
      document.getElementById("balance").textContent = "Error loading balance";
      console.error(err);
    }
  });
  
  // Handle transfer form submission
  document.getElementById("transferForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const recipient = document.getElementById("recipient").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
  
    alert(`Transfer Initiated:\nTo: ${recipient}\nAccount: ${accountNumber}\nAmount: ${formatCurrency(amount, "$")}\nNote: ${description}`);
    window.location.href = "codes.html"
    // 🔗 TODO: Call your backend transfer API here
  });
  