window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".full-screen-loader").classList.add("fade-out");
    }, 3000);
  });

  function setGreeting() {
    const hours = new Date().getHours();
    let greeting = "Good Evening!";
    if (hours < 17) greeting = "Good Morning!";
    else if (hours < 21) greeting = "Good Afternoon!";
    document.getElementById("greeting-text").textContent = greeting;
  }
  setGreeting();

  const userName = document.getElementById("user-name")
  const profileImage = document.getElementById("profileImage");
  const loanAmount = document.getElementById("loan-amount")
  const loanValues = document.querySelectorAll(".loan-value")

  document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken"); // make sure your key name matches how you stored it
    console.log(token)
    try {
      const response = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/viewProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Replace with real token
        }
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const result = await response.json();
      const user = result.data[0]; // first profile object
      console.log(user)
      userName.innerHTML = user.fullname
      
      if (user.profileImage) {
        profileImage.src = user.profileImage; // ✅ load from backend
      } else {
        profileImage.src = "images/default-avatar.png"; // fallback
      }

      // Reusable currency formatter
      function formatCurrency(value, currency = "$") {
        // Make sure it's a number before formatting
        const num = Number(value);
        if (isNaN(num)) return `${currency}0`;
        return `${currency}${num.toLocaleString()}`;
      }
  
      // Example usage after fetching user profile
      loanAmount.textContent = formatCurrency(user.amountRequested, "$");
      loanValues.forEach(el => {
          el.textContent = formatCurrency(user.amountRequested, "$");
      });

    } catch (error) {
    //   document.getElementById("profile").innerText = "Error: " + error.message;
      console.error(error);
    }
  });