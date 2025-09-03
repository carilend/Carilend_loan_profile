const token = localStorage.getItem("authToken");

async function loadProfile() {
  try {
    const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/viewProfile", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const result = await res.json();
    console.log("Profile:", result);

    const user = result.data[0]; // assuming API returns an array

    // Fill in user details
    document.getElementById("userName").textContent = user.fullname || "N/A";
    document.getElementById("userEmail").textContent = user.email || "N/A";
    document.getElementById("userPhone").textContent = user.phone || "N/A";

    // Profile Image
    const profileImage = document.getElementById("profileImage");
    if (user.profileImage) {
      profileImage.src = user.profileImage.startsWith("http")
        ? user.profileImage
        : `https://bankco-3jtv.onrender.com${user.profileImage}`;
    } else {
      profileImage.src = "images/user.png"; // fallback
    }
  } catch (err) {
    console.error("❌ Failed to load profile:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadProfile);
