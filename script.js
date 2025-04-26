// Carousel Functionality
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

document.getElementById('next').addEventListener('click', function() {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

document.getElementById('prev').addEventListener('click', function() {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

startAutoSlide();

// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle("show");
});

// Shopping Section Functionality
let products = [];
let cart = [];

// Fetch products from the JSON file
fetch('ghibli_merchandise.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    });

function displayProducts(productsToDisplay) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="assets/${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const productToAdd = products.find(product => product.id === productId);
    
    if (productToAdd) {
        cart.push(productToAdd);
        updateCart();
        
        // Show checkout button if it's the first item being added
        if (cart.length === 1) {
            document.getElementById('checkoutBtn').classList.remove('hidden');
        }
    }
}

function updateCart() {
    document.getElementById('total-price').textContent = cart.reduce((total, item) => total + item.price, 0);
}

document.getElementById('checkoutBtn').addEventListener('click', function() {
    const checkoutSection = document.getElementById('checkout-section');
    const shoppingSection = document.getElementById('shopping-section');
    
    shoppingSection.classList.add('hidden');
    checkoutSection.classList.remove('hidden');
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    updateCart();
});

document.getElementById('proceedPaymentBtn').addEventListener('click', function() {
    const paymentSection = document.getElementById('payment-section');
    const checkoutSection = document.getElementById('checkout-section');
    
    checkoutSection.classList.add('hidden');
    paymentSection.classList.remove('hidden');
});

document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate Full Name
    const fullname = document.getElementById('fullname');
    const fullnameError = document.getElementById('fullnameError');
    if (!fullname.value.trim()) {
        fullnameError.textContent = "Full name is required.";
        isValid = false;
    } else {
        fullnameError.textContent = "";
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        emailError.textContent = "Enter a valid email.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validate Address
    const address = document.getElementById('address');
    const addressError = document.getElementById('addressError');
    if (!address.value.trim()) {
        addressError.textContent = "Address is required.";
        isValid = false;
    } else {
        addressError.textContent = "";
    }

    // Validate Phone
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    if (!phone.value.trim()) {
        phoneError.textContent = "Phone number is required.";
        isValid = false;
    } else {
        phoneError.textContent = "";
    }

    // Validate Credit Card
    const creditCard = document.getElementById('credit-card');
    const creditCardError = document.getElementById('creditCardError');
    if (!creditCard.value.trim()) {
        creditCardError.textContent = "Credit card number is required.";
        isValid = false;
    } else {
        creditCardError.textContent = "";
    }

    // Validate Expiry Date
    const expiryDate = document.getElementById('expiry-date');
    const expiryDateError = document.getElementById('expiryDateError');
    if (!expiryDate.value.trim()) {
        expiryDateError.textContent = "Expiry date is required.";
        isValid = false;
    } else {
        expiryDateError.textContent = "";
    }

    // Validate CVV
    const cvv = document.getElementById('cvv');
    const cvvError = document.getElementById('cvvError');
    if (!cvv.value.trim()) {
        cvvError.textContent = "CVV is required.";
        isValid = false;
    } else {
        cvvError.textContent = "";
    }

    // Validate Payment Method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethodError = document.getElementById('paymentMethodError');
    if (!paymentMethod) {
        paymentMethodError.textContent = "Please select a payment method.";
        isValid = false;
    } else {
        paymentMethodError.textContent = "";
    }

    if (isValid) {
        const confirmationSection = document.getElementById('confirmation-section');
        const paymentSection = document.getElementById('payment-section');
        
        paymentSection.classList.add('hidden');
        confirmationSection.classList.remove('hidden');
        
        document.getElementById('confirmed-total').textContent = cart.reduce((total, item) => total + item.price, 0);
        
        // 清空购物车
        cart = [];
        document.getElementById('checkoutBtn').classList.add('hidden');
        
        // 重置表单和错误信息
        document.getElementById('purchase-form').reset();
        document.querySelectorAll('.error').forEach(err => {
            err.textContent = "";
        });
    }
});

document.getElementById('back-to-shopping').addEventListener('click', function() {
    const shoppingSection = document.getElementById('shopping-section');
    const confirmationSection = document.getElementById('confirmation-section');
    
    confirmationSection.classList.add('hidden');
    shoppingSection.classList.remove('hidden');
});

// Form Validation for Registration Form
document.getElementById('registrationform').addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Date of Visit
    const visitDate = document.getElementById('date-of-visit');
    const visitDateError = document.getElementById('visitDateError');
    if (!visitDate.value) {
        visitDateError.textContent = "Select your visit date.";
        isValid = false;
    } else {
        visitDateError.textContent = "";
    }

    // Validate Number of Visitors
    const visitors = document.getElementById('no-of-visitors');
    const visitorsError = document.getElementById('visitorsError');
    if (!visitors.value) {
        visitorsError.textContent = "Select the number of visitors.";
        isValid = false;
    } else {
        visitorsError.textContent = "";
    }

    // Validate Name
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (!name.value.trim()) {
        nameError.textContent = "Name is required.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Validate Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        emailError.textContent = "Enter a valid email.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validate Date of Birth
    const dob = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    if (!dob.value) {
        dobError.textContent = "Select your birth date.";
        isValid = false;
    } else {
        dobError.textContent = "";
    }

    // Validate Gender
    const gender = document.querySelector('input[name="gender"]:checked');
    const genderError = document.getElementById("genderError");
    if (!gender) {
        genderError.textContent = "Please select your gender.";
        isValid = false;
    } else {
        genderError.textContent = "";
    }

    // Validate Ticket
    const ticket = document.getElementById("ticket");
    const ticketError = document.getElementById("ticketError");
    if (!ticket.value) {
        ticketError.textContent = "Choose a ticket type.";
        isValid = false;
    } else {
        ticketError.textContent = "";
    }

    if (isValid) {
        alert('Form submitted successfully!');
        // Reset form
        document.getElementById('registrationform').reset();
        // Reset error messages
        document.querySelectorAll('.error').forEach(err => {
            err.textContent = "";
        });
    }
});