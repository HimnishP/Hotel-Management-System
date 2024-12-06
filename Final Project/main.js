
$(document).ready(function() {

    // Open the login modal when any "View Details" button is clicked
    $('.view-details').on('click', function() {
        $('#login-modal').show();  // Show login modal
    });

    // Handle the login form submission
    $('#login-form').on('submit', function(event) {
        event.preventDefault(); // Prevent page from reloading

        const username = $('#username').val();
        const password = $('#password').val();

        // Validate that fields are not empty
        if (username && password) {
            // Simulate a successful login by immediately hiding the login modal and showing the payment modal
            $('#login-modal').hide();  // Hide the login modal
            $('#payment-modal').show();  // Show the payment modal
        } else {
            alert('Please enter both username and password.');
        }
    });

    // Handle the payment form submission
    $('#payment-form').on('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        const cardNumber = $('#card-number').val();
        const expiryDate = $('#expiry-date').val();

        // Validate card number and expiry date
        if (cardNumber.length === 16 && expiryDate.length === 4) {
            // Simulate a successful payment response (no actual payment processing)

            // Store payment data in a JSON object
            const paymentInfo = {
                cardNumber: cardNumber,
                expiryDate: expiryDate
            };

            // Hide payment modal and show success message modal
            $('#payment -modal').hide();
            $('#success-message').show();

            // Display entered credit card info in the success message
            $('#card-number-display').text(paymentInfo.cardNumber);
            $('#expiry-date-display').text(paymentInfo.expiryDate);
        } else {
            alert('Please enter a valid 16-digit card number and a 4-digit expiry date.');
        }
    });

    // Close modals if the user clicks outside of them
    $(window).on('click', function(event) {
        if ($(event.target).hasClass('modal')) {
            $(event.target).hide();
        }
    });
});


// Function to dynamically add a review to the DOM
function addReviewToDOM(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <h3>${review.name}</h3>
        <div class="rating">${'⭐'.repeat(Number(review.rating))}</div>
        <p>"${review.review}"</p>
    `;

    const reviewsSection = document.querySelector('.reviews');
    const submitReviewSection = document.querySelector('.submit-review');
    reviewsSection.insertBefore(reviewItem, submitReviewSection); // Insert before the form
}

// Function to load reviews from localStorage and display them
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    console.log('Loaded reviews:', reviews); // Debugging
    reviews.forEach(review => addReviewToDOM(review));
}

// Function to handle form submission and save reviews to localStorage
function handleFormSubmission(event) {
    event.preventDefault();

    // Get input values
    const review = {
        name: document.getElementById('name').value,
        rating: document.getElementById('rating').value,
        review: document.getElementById('review').value
    };

    // Save review to localStorage
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    existingReviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));

    // Add review to the DOM
    addReviewToDOM(review);

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('review').value = '';

    // Notify user
    alert('Your review has been saved locally!');
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    const reviewForm = document.querySelector('.submit-review form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleFormSubmission);
    } else {
        console.error('Review form not found!');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed!');

    // Test if addReviewToDOM works
    addReviewToDOM({
        name: 'Test User',
        rating: '5',
        review: 'This is a test review.'
    });

    // Verify the form listener
    const reviewForm = document.querySelector('.submit-review form');
    if (reviewForm) {
        console.log('Review form found and listener added.');
        reviewForm.addEventListener('submit', handleFormSubmission);
    } else {
        console.error('Review form not found!');
    }

    // Load existing reviews
    loadReviews();
});

