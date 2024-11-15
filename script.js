const apiUrl = 'https://fakestoreapi.com/products';

// Load Products for Category Page
async function loadProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
}

// Display Products on Category Page
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 150px; height: 150px;">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
            <a href="product_details_page.html?id=${product.id}">View Details</a>
        `;
        productList.appendChild(productItem);
    });
}

// Load Product Details on Product Details Page
async function loadProductDetails(productId) {
    const response = await fetch(`${apiUrl}/${productId}`);
    const product = await response.json();
    document.getElementById('product-details').innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" style="width: 300px; height: 300px;">
        <p class="highlighted-description">${product.description}</p>
        <p>Price: $${product.price}</p>
        <input type="number" id="quantity" value="1" min="1">
        <button onclick="addToBag(${productId})">Add to Bag</button>
    `;
}

// Add Product to Shopping Bag
function addToBag(productId) {
    let bag = JSON.parse(localStorage.getItem('shoppingBag')) || [];
    const quantity = document.getElementById('quantity').value;
    bag.push({ productId, quantity });
    localStorage.setItem('shoppingBag', JSON.stringify(bag));
    window.location.href = 'shopping_bag_page.html';
}

// Load Cart for Shopping Bag Page
function loadShoppingBag() {
    const bag = JSON.parse(localStorage.getItem('shoppingBag')) || [];
    // Add logic to render shopping bag contents and pricing summary
}

// Navigation based on current page
document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop();
    if (page === 'category_page.html') loadProducts();
    if (page === 'product_details_page.html') {
        const productId = new URLSearchParams(window.location.search).get('id');
        loadProductDetails(productId);
    }
    if (page === 'shopping_bag_page.html') loadShoppingBag();
});
// Function to navigate to each checkout step
function navigateToCheckoutStep1() {
    window.location.href = 'checkout_step1_shipping_method.html';
}

function navigateToCheckoutStep2() {
    window.location.href = 'checkout_step2_shipping_method.html';
}

function navigateToCheckoutStep3() {
    window.location.href = 'checkout_step3_payment.html';
}

function navigateToCheckoutStep4() {
    window.location.href = 'checkout_step4_review.html';
}

function placeOrder() {
    // Simulate order placement
    localStorage.setItem('orderNumber', Math.floor(Math.random() * 1000000));
    window.location.href = 'order_confirmation.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Load order number and details on order confirmation page
    if (window.location.pathname.includes('order_confirmation')) {
        document.getElementById('order-number').innerText = localStorage.getItem('orderNumber');
        // Show order details here
    }
});

