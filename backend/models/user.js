const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicUrl: { type: String },
    bio: { type: String },
    favoriteBook: { type: String },
    hobbies: { type: String },
    favoritePlaces: { type: String },
    age: { type: Number },
    gender: { type: String },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
