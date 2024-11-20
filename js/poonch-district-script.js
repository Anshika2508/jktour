let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to toggle the wishlist and store hotel data
function toggleWishlist(element) {
    const hotelName = element.getAttribute('data-hotel');
    const hotelImage = element.getAttribute('data-image src');
    const hotelPrice = element.getAttribute('data-price');
    const hotelLink = element.getAttribute('data-link');

    const hotelData = {
        name: hotelName,
        image: hotelImage,
        price: hotelPrice,
        link: hotelLink
    };

    // Check if the hotel is already in the wishlist
    const index = wishlist.findIndex(hotel => hotel.name === hotelName);
    
    // If hotel is not in wishlist, add it and mark the heart as red
    if (index === -1) {
        wishlist.push(hotelData);
        element.innerHTML = '&#9829;';  // Filled heart
        element.style.color = 'red';  // Change heart to red
    } else {
        wishlist.splice(index, 1);  // Remove from wishlist
        element.innerHTML = '&#9825;';  // Empty heart
        element.style.color = 'black';  // Change heart to black
    }

    // Save wishlist to local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Function to load the wishlist items on the wishlist page
function loadWishlist() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const wishlistContainer = document.getElementById('wishlist-items');

    wishlistContainer.innerHTML = ''; // Clear previous content

    // Generate the hotel cards for each item in the wishlist
    if (wishlistItems.length === 0) {
        // If no items in the wishlist, display a message to the user
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = "Your wishlist is empty.";
        emptyMessage.style.listStyle = "none";
        wishlistContainer.appendChild(emptyMessage);
    } else {
    wishlistItems.forEach((hotel) => {
        
        const hotelCard = `
            <div class="hotel-option" style="position: relative; margin-bottom: 20px;">
                
                <h3>${hotel.name}</h3>
                <p>Price: ${hotel.price}</p>
                <a href="${hotel.link}" target="_blank" class="book-now-btn">Book Now</a>
            </div>
        `;
        wishlistContainer.innerHTML += hotelCard;
    });
}}

// Load wishlist items when the page loads
window.onload = function() {
    if (document.getElementById('wishlist-items')) {
        loadWishlist();
    }
};
console.log(localStorage.getItem('wishlist'));

