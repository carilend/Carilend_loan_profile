// ===============================
// User Details Page Script
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("userDetails");
  const user = JSON.parse(localStorage.getItem("selectedUser"));

  if (!user) {
    window.location.href = "all-users.html";
    return;
  }

  renderUserDetails(user, container);
});

function renderUserDetails(u, container) {
  container.innerHTML = `
    <div class="details-box">
      <h2>${u.fullname || "N/A"}</h2>
      <img src="${u.profileImage || 'https://via.placeholder.com/100'}" alt="Profile Image" class="profile-img">

      <div class="details-grid">
        <div><strong>User ID:</strong> ${u.userId || "—"}</div>
        <div><strong>Email:</strong> ${u.email || "N/A"}</div>
        <div><strong>Phone:</strong> ${u.phone || "N/A"}</div>
        <div><strong>Date of Birth:</strong> ${u.dob || "N/A"}</div>
        <div><strong>Address:</strong> ${u.address || "N/A"}</div>
        <div><strong>Nationality:</strong> ${u.nationality || "N/A"}</div>
        <div><strong>Account Type:</strong> ${u.accountType || "N/A"}</div>
        <div><strong>Account Number:</strong> ${u.accountNumber || "N/A"}</div>
        <div><strong>Bank Name:</strong> ${u.bankName || "N/A"}</div>
        <div><strong>Balance:</strong> $${Number(u.balance || 0).toLocaleString()}</div>
        <div><strong>Amount Requested:</strong> $${Number(u.amountRequested || 0).toLocaleString()}</div>
        <div><strong>Purpose of Loan:</strong> ${u.purposeOfLoan || "N/A"}</div>
        <div><strong>Repayment Term:</strong> ${u.repaymentTerm || "N/A"}</div>
        <div><strong>Employer:</strong> ${u.employer || "N/A"}</div>
        <div><strong>Position:</strong> ${u.position || "N/A"}</div>
        <div><strong>Length of Employment:</strong> ${u.lengthOfEmployment || "N/A"}</div>
        <div><strong>Monthly Income:</strong> $${Number(u.monthlyIncome || 0).toLocaleString()}</div>
        <div><strong>Date Created:</strong> ${new Date(u.createdAt).toLocaleString()}</div>
        <div><strong>Role:</strong> ${u.role || "user"}</div>
      </div>

      <div class="user-actions">
        <button id="backBtn" class="back-btn">← Back</button>

        <!-- ✅ New Manage User Button -->
        <button class="manage-btn" onclick="window.location.href='manage-user.html'">
        ⚙️ Manage User
        </button>

      </div>
    </div>
  `;

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "users.html";
  });
}
