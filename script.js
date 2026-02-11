// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 2,
        name: "Smart Watch Series 7",
        price: 249.50,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Design Coffee Cup",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VwfGVufDB8fDB8fHww"
    },
    {
        id: 5,
        name: "Polaroid Camera",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        id: 6,
        name: "Minimalist Backpack",
        price: 59.95,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhY2twYWNrfGVufDB8fDB8fHww"
    }
];

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Login Function
function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
        // success
        alert("Login Successful! Welcome to Modern Shop.");
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'shop.html';
    } else {
        alert("Please enter both username and password.");
    }
}

// Render Products Function (for shop.html)
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    updateCartUI(); // Update UI on load
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        alert(`Added ${product.name} to cart.`);
    }
}

// Update Cart UI (Badge count)
function updateCartUI() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = cart.length;

        // Simple animation effect
        badge.style.transform = "scale(1.2)";
        setTimeout(() => {
            badge.style.transform = "scale(1)";
        }, 200);
    }
}

// Render Cart Items (for login.html - used as checkout)
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    if (!cartContainer || !totalElement) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalElement.innerText = '0.00';
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div>
                    <h4 style="margin: 0;">${item.name}</h4>
                    <p style="margin: 0; color: #666;">$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalElement.innerText = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartUI();
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Thank you for shopping with us.");
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
    renderCart();
    window.location.href = 'shop.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderCart(); // Try to render cart if on checkout page
});
