// Example: Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// script.js
// Check if the user is logged in
const loggedInUser = localStorage.getItem('loggedInUser');
const userInfoElement = document.getElementById('user-info');
const signInButton = document.getElementById('signin-btn');
const signUpLink = document.getElementById('signup-link');
const userNameElement = document.getElementById('username');
const profileIcon = document.getElementById('profile-icon');
const signOutButton = document.getElementById('sign-out-btn');

// If the user is logged in, show the username, profile icon, and sign-out button
if (loggedInUser) {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.name) {
        userNameElement.textContent = storedUserData.name; // Show the user's name
    }

    // Show user info, hide sign-in button, and show sign-out button
    userInfoElement.style.display = 'block';
    signInButton.style.display = 'none';
    signUpLink.style.display = 'none'; // Hide sign-up link if logged in
}

// Sign out functionality
signOutButton.addEventListener('click', function() {
    // Remove user data from localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userData');

    // Hide user info and show sign-in button again
    userInfoElement.style.display = 'none';
    signInButton.style.display = 'block';
    signUpLink.style.display = 'inline-block'; // Show sign-up link again

    // Optionally, you can redirect to the home page or reload the page
    window.location.reload(); // Or window.location.href = 'index.html';
});


let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    // Wrap around the slides
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    // Move the slider
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Automatically change slides every 3 seconds
setInterval(() => {
    showSlide(currentIndex + 1);
}, 3000);

// Add event listener for the search button
document.getElementById('searchBtn').addEventListener('click', filterPlaces);

// Also add the ability to filter when pressing Enter inside the search bar
document.getElementById('searchBar').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        filterPlaces();
    }
});

function filterPlaces() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('place-card');
    
   
     // Remove previous highlights
     Array.from(cards).forEach(card => card.classList.remove('highlight'));
    
     // Loop through all place cards and highlight based on input
     for (let i = 0; i < cards.length; i++) {
         let place = cards[i].getAttribute('data-place').toLowerCase();
 
         if (place.includes(input)) {
             cards[i].classList.add('highlight');
             // Scroll the matched card into view
            cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
             // Set a timeout to remove the highlight after 2 seconds
             setTimeout(() => {
                 cards[i].classList.remove('highlight');
             }, 1000); // Duration in milliseconds
         }
     }

    
}

    // Get the user's email from localStorage
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail) {
        // Extract the part before the '@' from the email
        const userName = userEmail.split('@')[0];

        // Display the username in the navbar and the welcome message
        document.getElementById('user-name').textContent = userName;
        document.getElementById('welcome-user').textContent = userName;
    }

