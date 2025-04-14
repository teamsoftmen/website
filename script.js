// Toggle mobile menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const sidenav = document.getElementById('sidenav');
const sidenavOverlay = document.getElementById('sidenavOverlay');
const sidenavClose = document.getElementById('sidenavClose');
const body = document.body;

// Account sidenav elements
const accountBtn = document.getElementById('accountBtn');
const accountSidenav = document.getElementById('accountSidenav');
const accountSidenavClose = document.getElementById('accountSidenavClose');

// Function to open sidenav
const openSidenav = () => {
    sidenav.classList.add('active');
    sidenavOverlay.classList.add('active');
    body.classList.add('sidenav-open');
    
    // Change hamburger to times icon
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
};

// Function to close sidenav
const closeSidenav = () => {
    sidenav.classList.remove('active');
    sidenavOverlay.classList.remove('active');
    body.classList.remove('sidenav-open');
    
    // Reset to bars icon
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
};

// Function to open account sidenav
const openAccountSidenav = () => {
    accountSidenav.classList.add('active');
    sidenavOverlay.classList.add('active');
    body.classList.add('sidenav-open');
};

// Function to close account sidenav
const closeAccountSidenav = () => {
    accountSidenav.classList.remove('active');
    
    // Only remove overlay and body class if main sidenav is also closed
    if (!sidenav.classList.contains('active')) {
        sidenavOverlay.classList.remove('active');
        body.classList.remove('sidenav-open');
    }
};

// Function to close all sidenavs
const closeAllSidenavs = () => {
    closeSidenav();
    closeAccountSidenav();
};

// Function to close menu (keeping for backward compatibility)
const closeMenu = () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        // Reset to bars icon
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Also close sidenav if open
    closeAllSidenavs();
};

// Toggle sidenav when menu button is clicked
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close account sidenav if open
    closeAccountSidenav();
    
    if (sidenav.classList.contains('active')) {
        closeSidenav();
    } else {
        openSidenav();
    }
});

// Toggle account sidenav when account button is clicked
accountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Close main sidenav if open
    closeSidenav();
    
    if (accountSidenav.classList.contains('active')) {
        closeAccountSidenav();
    } else {
        openAccountSidenav();
    }
});

// Close sidenav when close button is clicked
sidenavClose.addEventListener('click', closeSidenav);

// Close account sidenav when close button is clicked
accountSidenavClose.addEventListener('click', closeAccountSidenav);

// Close sidenav when overlay is clicked
sidenavOverlay.addEventListener('click', closeAllSidenavs);

// Close sidenav when clicking outside
document.addEventListener('click', (event) => {
    // Check if sidenav is active and click is outside sidenav and menu toggle
    if (sidenav.classList.contains('active') && 
        !sidenav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        closeSidenav();
    }
    
    // Check if account sidenav is active and click is outside account sidenav and account button
    if (accountSidenav.classList.contains('active') && 
        !accountSidenav.contains(event.target) && 
        !accountBtn.contains(event.target)) {
        closeAccountSidenav();
    }
    
    // Keep the old menu functionality
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        closeMenu();
    }
});

// Close sidenavs when pressing Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeAllSidenavs();
    }
});

// Wishlist functionality
let wishlistCount = 0;
const wishlistItems = new Set();

// Function to update wishlist count in header
const updateWishlistCount = () => {
    const wishlistIcon = document.querySelector('a[title="Wishlist"]');
    if (wishlistIcon) {
        // Create or update wishlist count span
        let countSpan = wishlistIcon.querySelector('.wishlist-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.classList.add('wishlist-count');
            wishlistIcon.appendChild(countSpan);
        }
        countSpan.textContent = wishlistCount;
        // Hide count if zero
        countSpan.style.display = wishlistCount > 0 ? 'inline-block' : 'none';
    }
};

// Initialize wishlist buttons
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const heartIcon = button.querySelector('i');
        
        if (wishlistItems.has(productTitle)) {
            // Remove from wishlist
            wishlistItems.delete(productTitle);
            wishlistCount--;
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            button.classList.remove('active');
        } else {
            // Add to wishlist
            wishlistItems.add(productTitle);
            wishlistCount++;
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            button.classList.add('active');
        }
        
        updateWishlistCount();
    });
});

// Cart functionality
let cartCount = 0;
const cartItems = new Set();

// Function to update cart count in header
const updateCartCount = () => {
    const cartIcon = document.querySelector('a[title="Cart"]');
    if (cartIcon) {
        // Create or update cart count span
        let countSpan = cartIcon.querySelector('.cart-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.classList.add('cart-count');
            cartIcon.appendChild(countSpan);
        }
        countSpan.textContent = cartCount;
        // Hide count if zero
        countSpan.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
};

// Initialize add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        if (cartItems.has(productTitle)) {
            // Remove from cart
            cartItems.delete(productTitle);
            cartCount--;
            button.textContent = 'Add to Cart';
            button.classList.remove('active');
        } else {
            // Add to cart
            cartItems.add(productTitle);
            cartCount++;
            button.textContent = 'Remove from Cart';
            button.classList.add('active');
        }
        
        updateCartCount();
    });
});

// Initialize the counts on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateCartCount();
});