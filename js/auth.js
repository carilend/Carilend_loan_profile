document.addEventListener("DOMContentLoaded", function () {
    const formBox = document.querySelector(".auth-box");
    const createBtn = document.querySelector(".btn");
  
    // Loader HTML
    const loaderHTML = `
      <div class="loader-container">
        <div class="loader"></div>
        <p>Creating your account...</p>
      </div>
    `;
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const inputs = document.querySelectorAll(".input-group input");
      const [fullname, email, password, confirmPassword] = Array.from(inputs).map(i => i.value.trim());
  
      // Validation
      if (!fullname || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      // Show loader
      formBox.innerHTML = loaderHTML;
  
      // API Request with Promise syntax
      fetch("https://bankco-3jtv.onrender.com/api/v1/user/newUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }) // adjust keys if backend requires
      })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
          if (!ok)
           if(data.message === "Employee already exists"){
            throw new Error ("Applicant already exists. You already have an account with us.")
           } else {
            throw new Error ("Something went wrong")
           }
          // ✅ Save token and user data in localStorage
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.data[0])); // store first user object

          alert(data.message); // "Registration Successful"

          // Redirect to KYC or dashboard
          window.location.href = "kyc.html";
          console.log(data)
        })
        .catch(error => {
          // Restore form on error
          alert(error.message || "Account creation failed.");
          formBox.innerHTML = `
            <img src="assets/OIP.jpg" alt="Carilend Logo" class="logo">
            <h2>Create Account</h2>
            <p class="subtitle">Create your Loan Profile Account to get started</p>
  
            <div class="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" value="${fullname}">
            </div>
  
            <div class="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value="${email}">
            </div>
  
            <div class="input-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" value="${password}">
            </div>
  
            <div class="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" value="${confirmPassword}">
            </div>
  
            <button class="btn">Create Account</button>
            <div class="links">
              <a href="login.html">Already have an account? Login</a>
            </div>
          `;
          document.querySelector(".btn").addEventListener("click", handleSubmit);
        });
    }
  
    createBtn.addEventListener("click", handleSubmit);
  });
  