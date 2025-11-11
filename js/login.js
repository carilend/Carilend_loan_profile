const formBox = document.querySelector(".login-box");
      // Loader HTML
      const loaderHTML = `
      <div class="loader-container">
        <div class="loader"></div>
        <p>Sigining into your profile account...</p>
      </div>
    `;

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop form refresh

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  // Show loader
  formBox.innerHTML = loaderHTML;

  // API request to login endpoint
  fetch("https://bankco-3jtv.onrender.com/api/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) throw new Error(data.message || "Login failed");

      // ✅ Save token + user info
      localStorage.setItem("authToken", data.token);
      // localStorage.setItem("userData", JSON.stringify(data.data[0]));
      
      const role = data.data[0].role
      if(role === "user"){
        window.location.href = "dashboard.html"; // redirect to dashboard
      }else{
        window.location.href = "admin-dashboard.html";
      }
      alert("Login successful! Redirecting...");
      console.log(role)
    })
    .catch(error => {
      alert(error.message || "An error occurred while logging in.");
      formBox.innerHTML = `
       <img src="assets/OIP.jpg" alt="Carilend Logo" class="logo">
      <h2>Welcome Back</h2>
      <p class="subtitle">Login to your Loan Profile Account</p>

      <form id="loginForm">
        <div class="input-group">
          <label>Email</label>
          <input type="email" id="email" placeholder="you@example.com" required>
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" id="password" placeholder="Enter your password" required>
        </div>
        <button type="submit" class="btn">Login</button>
      </form>

      <div class="links">
        <a href="forgotten-password.html">Forgot password?</a>
        <a href="create-account.html">Create account</a>
      </div>
      `
    });
});
