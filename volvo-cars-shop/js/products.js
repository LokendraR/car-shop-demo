// ----------------------------
// Navbar Injection + Toggle
// ----------------------------
fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const menu = document.getElementById("menu");
const hamburger = document.querySelector(".hamburger");
const closeBtn = document.getElementById("closeBtn1");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

if (closeBtn && menu) {
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("show");
  });
}

    // Dark mode toggle
    const themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
      });
    }

    // Highlight active page
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });

  














// ===== Modal Script ===== 


function showAlert(options = {}) {
  const overlay = document.getElementById('centerAlert');
  const titleEl = document.getElementById('alertTitle');
  const msgEl = document.getElementById('alertMessage');

  if (options.title) titleEl.textContent = options.title;
  if (options.message) msgEl.textContent = options.message;

  overlay.classList.add('show');
  overlay.removeAttribute('aria-hidden');
}

function hideAlert() {
  const overlay = document.getElementById('centerAlert');
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
  // buttons
  document.getElementById('okBtn').addEventListener('click', hideAlert);
  document.getElementById('closeBtn').addEventListener('click', hideAlert);

  // click outside
  document.getElementById('centerAlert').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideAlert();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideAlert();
  });

  // 👇 AUTO ALERT: Ye sirf HOME page par chalao
  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    showAlert({
      title: "Welcome!",
      message: "This website has been created solely for learning and practice purposes. It is not intended to promote or endorse any brand, company, or product. All the content and design presented here are meant only to enhance web development skills and experimentation."
    });
  }
});










// search var add 

//   function searchCars() {
//   const query = document.getElementById("search-input").value.toLowerCase().trim();
//   const resultsDiv = document.getElementById("search-results");

//   if (!query) {
//     resultsDiv.innerHTML = "";
//     resultsDiv.classList.remove("active");
//     return;
//   }

//   fetch("data/cars.json")
//     .then(res => res.json())
//     .then(cars => {
//       const filtered = cars.filter(car =>
//         car.name.toLowerCase().includes(query) ||
//         car.description.toLowerCase().includes(query) ||
//         car.category.toLowerCase().includes(query)
//       );

//       if (filtered.length === 0) {
//         resultsDiv.innerHTML = "<p style='padding:10px;'>No cars found 😢</p>";
//         resultsDiv.classList.add("active");
//         return;
//       }

//       resultsDiv.innerHTML = ""; 
//       resultsDiv.classList.add("active");

//       filtered.forEach(car => {
//         resultsDiv.innerHTML += `
//           <div class="card" onclick="showCarDetails(${car.id})">
//             <img src="${car.image}" alt="${car.name}">
//             <div>
//               <h4>${car.name}</h4>
//               <p style="font-size:12px; color:#666;">$${car.price}</p>
//             </div>
//           </div>
//         `;
//       });
//     })
//     .catch(err => {
//       resultsDiv.innerHTML = "<p style='padding:10px;'>Error loading cars.json ⚠️</p>";
//       resultsDiv.classList.add("active");
//       console.error(err);
//     });
// }












// ----------------------------
// Footer Injection
// ----------------------------
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });











// ----------------------------
// Load Products Dynamically
// ----------------------------
if (document.getElementById("products")) {
  fetch("data/cars.json")
    .then(res => res.json())
    .then(cars => {
      const productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";

      const isHomePage = window.location.pathname.includes("index.html") || window.location.pathname === "/";
      const productsToShow = isHomePage ? cars.slice(0, 3) : cars;


      // card click
      productsToShow.forEach(car => {
        productsDiv.innerHTML += `
    <a href="category.html?category=${car.category}" class="card-link">
      <div class="card">
        <img src="${car.image}" alt="${car.name}">
        <h2>${car.name}</h2>
        <p>${car.description}</p>
        <h3>$${car.price}</h3>
      </div>
    </a>
  `;
      });


      if (isHomePage) {
        productsDiv.innerHTML += `
    <div class="see-all-btn">
      <a href="products.html">
        <button>See All Products</button>
      </a>
    </div>
  `;
      }

    });
}

// ----------------------------
// Add to Cart
// ----------------------------


function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(Number(id));
  localStorage.setItem("cart", JSON.stringify(cart));

  // custom modal alert (instead of window.alert)
  showAlert({
    title: "Added to Cart 🛒",
    message: "✅ Car successfully added to cart!"
  });

  // refresh UI if on cart page
  if (document.getElementById("cart-items")) {
    renderCart(); // refresh cart immediately
  }
}

// ----------------------------
// Remove from Cart
// ----------------------------
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);  // remove item by index
    localStorage.setItem("cart", JSON.stringify(cart));

    // custom alert
    showAlert({
      title: "Removed ❌",
      message: "🗑️ Car removed from cart!"
    });

    // refresh UI immediately
    renderCart();
  }
}

let cars = []; // global cars array

function renderCart() {
  const cartDiv = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((id, index) => {
      const car = cars.find(c => c.id === Number(id));
      if (car) {
        total += car.price;
        cartDiv.innerHTML += `
          <div class="card">
            <img src="${car.image}" alt="${car.name}">
            <h2>${car.name}</h2>
            <p>$${car.price}</p>
            <button onclick="removeFromCart(${index})">❌ Remove</button>
          </div>
        `;
      }
    });
  }

  document.getElementById("cart-total").innerText = `Total: $${total}`;
}

// ----------------------------
// Show Cart Items on page load
// ----------------------------
if (document.getElementById("cart-items")) {
  fetch("data/cars.json")
    .then(res => res.json())
    .then(data => {
      cars = data; // save globally
      renderCart();
    });
}











// ----------------------------
// Category Page Filter
// ----------------------------
if (document.getElementById("category-products")) {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  fetch("data/cars.json")
    .then(res => res.json())
    .then(cars => {
      const container = document.getElementById("category-products");
      const filtered = cars.filter(car => car.category === category);

      // Create structure dynamically
      container.innerHTML = `
            <div id="car-details"></div>
            <h1>${category.toUpperCase()} Cars</h1>
            <div id="related-products" class="related-grid"></div>
          `;

      const relatedContainer = document.getElementById("related-products");

      // Show related cars as cards
      filtered.forEach(car => {
        relatedContainer.innerHTML += `
              <div class="card" onclick="showCarDetails(${car.id})">
                <img src="${car.image}" alt="${car.name}">
                <h2>${car.name}</h2>
                <h3>$${car.price}</h3>
              </div>
            `;
      });


      // Save cars globally
      window.allCars = cars;

      // Show first car details by default
      if (filtered.length > 0) {
        showCarDetails(filtered[0].id);
      }
    });
}

// Function to show selected car details
function showCarDetails(carId) {
  const car = window.allCars.find(c => c.id == carId);
  const detailsContainer = document.getElementById("car-details");

  detailsContainer.innerHTML = `
        <div class="car-detail-box">
          <img src="${car.image}" alt="${car.name}">
          <h2>${car.name}</h2>
          <p>${car.description}</p>
          <h3>Price: $${car.price}</h3>
          <button onclick="addToCart(${car.id})">Add to Cart</button>
        </div>
      `;

  // Scroll to details
  detailsContainer.scrollIntoView({ behavior: "smooth" });
}