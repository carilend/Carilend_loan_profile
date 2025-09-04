document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");
  
    try {
      const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/viewProfile", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch profile");
  
      const user = result.data[0]; // backend returns array
      console.log("✅ Profile loaded:", user);
  
      // ===== Profile Section =====
      document.getElementById("fullname").textContent = user.fullname;
      document.getElementById("email").textContent = user.email;
      document.getElementById("phone").textContent = user.phone;
      document.getElementById("profileImage").src = user.profileImage || "images/user.png";
  
      // ===== Account Information =====
      document.getElementById("userId").textContent = user.userId || "N/A";
      document.getElementById("accountNumber").textContent = user.accountNumber || "N/A";
      document.getElementById("accountType").textContent = user.accountType || "N/A";
      document.getElementById("bankName").textContent = user.bankName || "N/A";
      document.getElementById("createdAt").textContent = new Date(user.createdAt).toLocaleDateString();
  
      // ===== Personal Information =====
      document.getElementById("fullname-info").textContent = user.fullname;
      document.getElementById("dob").textContent = user.dob || "N/A";
      document.getElementById("nationality").textContent = user.nationality || "N/A";
      document.getElementById("address").textContent = user.address || "N/A";
      document.getElementById("idNumber").textContent = user.idNumber || "N/A";
  
      // ===== Employment =====
      document.getElementById("employer").textContent = user.employer || "N/A";
      document.getElementById("position").textContent = user.position || "N/A";
      document.getElementById("lengthOfEmployment").textContent = user.lengthOfEmployment || "N/A";
      document.getElementById("monthlyIncome").textContent = user.monthlyIncome 
        ? `$${Number(user.monthlyIncome).toLocaleString()}`
        : "N/A";
  
      // ===== Loan Details =====
      document.getElementById("purposeOfLoan").textContent = user.purposeOfLoan || "N/A";
      document.getElementById("amountRequested").textContent = user.amountRequested 
        ? `$${Number(user.amountRequested).toLocaleString()}`
        : "N/A";
      document.getElementById("repaymentTerm").textContent = user.repaymentTerm || "N/A";
  
    } catch (err) {
      console.error("❌ Failed to load profile:", err);
      alert("Failed to load profile details.");
    }
  });
  