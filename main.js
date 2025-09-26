// Inject Navbar
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Hamburger toggle
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    // Dark mode toggle
    const themeBtn = document.querySelector(".theme-toggle");
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    // Active page highlight
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });

// Inject Footer
fetch("footer.html")
  .then(res => res.text())
  .then(data => { document.getElementById("footer").innerHTML = data; });
