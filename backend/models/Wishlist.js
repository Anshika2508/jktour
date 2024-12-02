const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the user
        required: true,
        ref: 'User',  // Assuming you have a User model
    },
    places: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            description: { type: String, required: true },
            link: { type: String, required: true },
        }
    ],
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
