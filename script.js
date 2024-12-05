// Fetch products from the backend
async function fetchProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();

  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart('${product._id}')">Add to Cart</button>
      `;
    productList.appendChild(productDiv);
  });
}

// Cart functionality
let cart = [];

function addToCart(productId) {
  cart.push(productId);
  document.getElementById("cart-count").innerText = cart.length;
}

// Load products on page load
window.onload = fetchProducts;
