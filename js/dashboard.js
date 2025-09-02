window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".full-screen-loader").classList.add("fade-out");
    }, 3000);
  });

  function setGreeting() {
    const hours = new Date().getHours();
    let greeting = "Good Evening!";
    if (hours < 17) greeting = "Good Morning!";
    else if (hours < 18) greeting = "Good Afternoon!";
    document.getElementById("greeting-text").textContent = greeting;
  }
  setGreeting();

