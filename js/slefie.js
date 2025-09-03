const token = localStorage.getItem("a");

// File input preview
const fileInput = document.getElementById("selfie");
const previewImage = document.getElementById("previewImage");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.src = "";
    previewImage.style.display = "none";
  }
});


document.getElementById("selfieForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.getElementById("selfie").files[0];
  if (!file) {
    alert("Please select a selfie");
    return;
  }

  const formData = new FormData();
  formData.append("selfie", file);

  document.getElementById("loader").classList.remove("hidden");

  try {
    const res = await fetch("https://bankco-3jtv.onrender.com/api/v1/user/uploadSelfie", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    });

    const result = await res.json();
    console.log("✅ Selfie uploaded:", result);
    alert("Selfie uploaded successfully!");
  } catch (err) {
    console.error("❌ Upload error:", err);
    alert("Upload failed, please try again.");
  } finally {
    document.getElementById("loader").classList.add("hidden");
  }
});