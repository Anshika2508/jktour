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
const signUpLink = document.getElementById('signup-link');
const userNameElement = document.getElementById('username');
const signOutButton = document.getElementById('sign-out-btn');

// If the user is logged in
if (loggedInUser) {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.name) {
        userNameElement.textContent = storedUserData.name; // Show the user's name
    }

    // Display user info and hide the sign-up link
    userInfoElement.style.display = 'block';
    if (signUpLink) signUpLink.style.display = 'none';
}

// Sign out functionality
if (signOutButton) {
    signOutButton.addEventListener('click', function () {
        // Remove user data from localStorage
        localStorage.removeItem('loggedInUser');
       

        // Hide user info and show sign-up link
        userInfoElement.style.display = 'none';
        if (signUpLink) signUpLink.style.display = 'inline-block';

        // Optionally, redirect or reload the page
        window.location.reload();
    });
}


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

