document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
  
    // ✅ Load existing profile data
    async function loadProfile() {
      try {
        const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/viewProfile", {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const result = await res.json();
        const user = result.data[0]; // first profile object
        console.log("Loaded user:", user);
  
        // Prefill Edit Profile
        document.getElementById("editEmail").value = user.email || "";
        document.getElementById("editPhone").value = user.phone || "";
  
        // Prefill Personal Info
        document.getElementById("fullname").value = user.fullname || "";
        document.getElementById("dob").value = user.dob || "";
        document.getElementById("nationality").value = user.nationality || "";
        document.getElementById("address").value = user.address || "";
        document.getElementById("idNumber").value = user.idNumber || "";
  
        // Profile picture
        document.getElementById("avatarPreview").src = user.profileImage || "images/user.png";
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
        alert("Could not load your profile.");
      }
    }
  
    loadProfile();
  
    // ✅ Handle Edit Profile submit
    document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const payload = {
        email: document.getElementById("editEmail").value.trim(),
        phone: document.getElementById("editPhone").value.trim(),
        password: document.getElementById("editPassword").value.trim()
      };
  
      try {
        const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/updateProfile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
  
        alert("✅ Profile updated successfully!");
      } catch (err) {
        console.error(err);
        alert("❌ " + err.message);
      }
    });
  
    // ✅ Handle Personal Info submit
    document.getElementById("personalInfoForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const payload = {
        fullname: document.getElementById("fullname").value.trim(),
        dob: document.getElementById("dob").value,
        nationality: document.getElementById("nationality").value.trim(),
        address: document.getElementById("address").value.trim(),
        idNumber: document.getElementById("idNumber").value.trim()
      };
  
      try {
        const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/updatePersonalInfo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
  
        alert("✅ Personal info updated successfully!");
      } catch (err) {
        console.error(err);
        alert("❌ " + err.message);
      }
    });
  
    // ✅ Profile picture preview
    const avatarInput = document.getElementById("avatarInput");
    const avatarPreview = document.getElementById("avatarPreview");
  
    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          avatarPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // ✅ Handle Profile Picture upload
    document.getElementById("profilePicForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const file = avatarInput.files[0];
      if (!file) {
        alert("Please choose a file first!");
        return;
      }
  
      const formData = new FormData();
      formData.append("selfie", file); // backend expects "selfie"
  
      try {
        const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/uploadProfileImage", {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");
  
        alert("✅ Profile picture updated!");
        avatarPreview.src = data.imageUrl || avatarPreview.src;
      } catch (err) {
        console.error(err);
        alert("❌ " + err.message);
      }
    });
  
    // ✅ Back button
    const backBtn = document.querySelector(".back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.history.back();
      });
    }
  });
  