// Array of places with their details
const places = [
    {
        name: "Srinagar",
        image: "images/srinagar1.jpg",
        description: "Explore the famous Dal Lake, Mughal Gardens, and houseboats in this beautiful city.",
        link: "srinagar.html",
    },
    {
        name: "Jammu",
        image: "images/jammu1.jpg",
        description: "The winter capital of Jammu and Kashmir, known for its scenic beauty and religious significance.",
        link: "jammu.html",
    },
    {
        name: "Pahalgam",
        image: "images/pahalgam1.jpg",
        description: "Pahalgam, nestled in the Anantnag district of Jammu and Kashmir, is a gateway to the Amarnath Cave.",
        link: "pahalgam.html",
    },
    {
        name: "Sonmarg",
        image: "images/sonmarg1.jpg",
        description: "Sonmarg, often referred to as the 'Meadow of Gold,' is a stunning destination in Srinagar.",
        link: "sonmarg.html",
    },
    {
        name: "Gulmarg",
        image: "images/gulmarg1.jpg",
        description: "Gulmarg, is celebrated for its stunning natural beauty, world-class skiing facilities, and snow-capped mountains.",
        link: "gulmarg.html",
    },
    {
        name: "Patnitop",
        image: "images/patnitop1.jpg",
        description: "Patnitop is a charming hill station, celebrated for its lush meadows, panoramic views, and a serene atmosphere ideal for outdoor activities and relaxation.",
        link: "udhampur.html",
    },
    {
        name: "Bhaderwah",
        image: "images/bhaderwah1.jpg",
        description: "Bhaderwah, often called the 'Chhota Kashmir,' is a scenic valley in Jammu and Kashmir known for its lush greenery, stunning landscapes, and vibrant cultural heritage.",
        link: "doda.html",
    },
    {
        name: "Mansar",
        image: "images/mansar1.jpg",
        description: "Mansar Lake is a stunning freshwater lake surrounded by forested hills, offering a tranquil escape and rich cultural significance with its ancient temples nearby.",
        link: "udhampur.html",
    },
    {
        name: "Shri Mata Vaishno Devi Shrine",
        image: "images/vaishnodevi.jpg",
        description: "Shri Mata Vaishno Devi Shrine, nestled in the Trikuta Mountains of Reasi, is one of India's most revered pilgrimage sites, drawing millions of devotees seeking divine blessings.",
        link: "reasi.html",
    },
    {
        name: "Shiv Khori",
        image: "images/shivkhori.jpg",
        description: "Shiv Khori is a famous cave shrine dedicated to Lord Shiva, located in the Reasi district of Jammu and Kashmir.",
        link: "reasi.html",
    },
    {
        name: "Sanasar",
        image: "images/sanasar.jpg",
        description: "Sanasar is a scenic hill station located about 20 km from Patnitop in the Udhampur district of Jammu and Kashmir.",
        link: "udhampur.html",
    },
    {
        name: "Machail Mata",
        image: "images/machail1.jpg",
        description: "Machail Mata is a revered shrine dedicated to Goddess Chandi, located in the Machail village of the Kishtwar district in Jammu and Kashmir.",
        link: "kishtwar.html",
    },
    {
        name: "Daksum Waterfall",
        image: "images/daksum.jpg",
        description: "Daksum Waterfall is a scenic waterfall located in the Daksum region, nestled within the Kokernag area of Anantnag district, Jammu and Kashmir.",
        link: "kishtwar.html",
    },
    {
        name: "Ranjit Sagar Dam",
        image: "images/mansar1.jpg",
        description: "Ranjit Sagar Dam, located near the border of Punjab and Kathua district in Jammu and Kashmir, is one of the largest dams in northern India.",
        link: "kathua.html",
    },
    {
        name: "Bhaderwah Valley",
        image: "images/bhaderwah1.jpg",
        description: "Bhaderwah, often referred to as 'Mini Kashmir,' is a beautiful town located in the Doda district of Jammu and Kashmir.",
        link: "doda.html",
    },
    {
        name: "Dhanidhar Fort",
        image: "images/dhanidhar.jpg",
        description: "Built in the 18th century, this historical fort showcases the architectural brilliance of its time.",
        link: "rajouri.html",
    },
];

// Function to render the places
const placesContainer = document.getElementById('placesContainer');

places.map((place, index) => {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    placeCard.setAttribute('data-place', place.name);

    placeCard.innerHTML = `
        <img src="${place.image}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <a href="${place.link}" class="details-button" target="_blank">Learn More</a>
        <button class="wishlist-button" onclick="addToWishlist(${index})">Add to Wishlist</button>
    `;

    placesContainer.appendChild(placeCard);
});
// Function to show the toaster message
function showToaster(message) {
    var toaster = document.getElementById('toaster');
    var toasterMessage = document.getElementById('toaster-message');
    
    toasterMessage.textContent = message;  // Set the message
    toaster.classList.remove('hidden');    // Make toaster visible
    toaster.classList.add('show');         // Apply animation

    // Automatically hide toaster after 3 seconds
    setTimeout(function() {
        toaster.classList.remove('show');  // Hide toaster
        toaster.classList.add('hidden');   // Reset visibility
    }, 3000);
}


// Function to add places to wishlist (localStorage)
function addToWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.includes(index)) {
        wishlist.push(index);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Show toaster notification
        showToaster(`${places[index].name} has been added to your wishlist!`);
        saveWishlistToBackend(wishlist);

    } else {
        // Show toaster notification if it's already in the wishlist
        showToaster(`${places[index].name} is already in your wishlist.`);
    }
}

// Function to save wishlist data to the backend
async function saveWishlistToBackend(wishlist) {
    try {
        // Get the logged-in user ID from localStorage
        const userId = localStorage.getItem('loggedInUser'); // This should be the logged-in user's ID

        // Check if the user is logged in
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        // Map the indices to actual place details
        const wishlistData = wishlist.map(index => places[index]);

        // Send data to the server
        const response = await fetch('http://localhost:4000/save-wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,          // Get the logged-in user's ID from localStorage
                wishlistData,    // List of places to save
            }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Wishlist saved successfully:', data.wishlist);
        } else {
            console.error('Failed to save wishlist:', data.message);
        }
    } catch (error) {
        console.error('Error saving wishlist to backend:', error);
    }
}
/// DOM Elements
