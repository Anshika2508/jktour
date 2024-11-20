document.addEventListener("DOMContentLoaded", function() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistItems = document.getElementById("wishlist-items");

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<p class="empty-message">Your wishlist is empty.</p>';
    } else {
        wishlist.forEach(hotel => {
            const hotelCard = document.createElement("li");
            hotelCard.className = "col-md-4";
            hotelCard.innerHTML = `
                <div class="hotel-card">
                    
                    <div class="card-body">
                        <h5>${hotel.name}</h5>
                       
                        <button class="remove-btn" data-id="${hotel.id}">Remove</button>
                    </div>
                </div>
            `;
            wishlistItems.appendChild(hotelCard);
        });
    }

    wishlistItems.addEventListener("click", function(e) {
        if (e.target.classList.contains("remove-btn")) {
            const hotelId = e.target.getAttribute("data-id");
            removeFromWishlist(hotelId);
            e.target.closest("li").remove();

            if (wishlistItems.children.length === 0) {
                wishlistItems.innerHTML = '<p class="empty-message">Your wishlist is empty.</p>';
            }
        }
    });

    function removeFromWishlist(id) {
        const updatedWishlist = wishlist.filter(hotel => hotel.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
});


