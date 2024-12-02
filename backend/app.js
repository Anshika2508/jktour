const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./models/user');
const Wishlist = require('./models/Wishlist');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/userData')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection error:', error));

// User Creation Route
app.post('/createUser', async (req, res) => {
    const { userData } = req.body;
    const { name, email, password, favoriteBook, profilePicUrl } = userData;
    
    console.log('Received request to create user:', req.body);

    try {
        // Hash the password before saving
        

        // Create a new user with hashed password
        const newUser = new User({
            name,
            email,
            password,
            favoriteBook,
            profilePicUrl,
        });

        // Save the user to the database
        await newUser.save();

        console.log('User created successfully:', {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Detailed Error creating user:', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack
        });

        // Handle specific Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: Object.keys(error.errors).map(key => ({
                    field: key,
                    message: error.errors[key].message
                }))
            });
        }

        // Handle duplicate key error (unique email)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the user',
            error: error.message
        });
    }
});

app.post('/updateUserData', async (req, res) => {
    const { userData } = req.body;
    console.log('Received request to update user data:', userData);

    try {
        // Find the user by email and update their data
        const user = await User.findOneAndUpdate({ email: userData.email }, userData, {
            new: true, // Return the updated user
        });

        if (user) {
            console.log('User data updated successfully:', user);
            res.json({ success: true, message: 'User data updated successfully' });
        } else {
            console.log('User not found:', userData.email);
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        res.json({
            success: false,
            message: 'An error occurred while updating user data.',
        });
    }
});

app.post('/updatePassword', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received request to update password for email:', email);

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the user and update their password
        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (user) {
            console.log('Password updated successfully for email:', email);
            res.json({ success: true, message: 'Password updated successfully' });
        } else {
            console.log('User not found:', email);
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.json({
            success: false,
            message: 'An error occurred while updating the password.',
        });
    }
});

// Get all users' data
app.get('/getUserData', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        if (users.length > 0) {
            console.log('Fetched all users:', users);
            res.json({
                success: true,
                users
            });
        } else {
            console.log('No users found.');
            res.json({
                success: false,
                message: 'No users found.'
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.json({
            success: false,
            message: 'An error occurred while fetching user data.',
            error: error.message
        });
    }
});

// Get user data by email
app.get('/getUserDataByEmail', async (req, res) => {
    const { email } = req.query;  // Get email from query parameter
    console.log('Received request to get user data by email:', email);

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (user) {
            console.log('User found:', user);
            res.json({
                success: true,
                user
            });
        } else {
            console.log('User not found:', email);
            res.json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Error fetching user data by email:', error);
        res.json({
            success: false,
            message: 'An error occurred while fetching user data by email.',
            error: error.message
        });
    }
});

// Save wishlist Route
app.post('/save-wishlist', async (req, res) => {
    const { userId, wishlistData } = req.body;
    console.log('Received wishlist data:', wishlistData);

    try {
        // Find the user's wishlist or create a new one if not found
        const wishlist = await Wishlist.findOneAndUpdate(
            { userId },
            { places: wishlistData },
            { new: true, upsert: true } // If no wishlist, create a new one
        );

        console.log('Wishlist saved/updated successfully:', wishlist);
        res.json({
            success: true,
            message: 'Wishlist saved successfully',
            wishlist
        });
    } catch (error) {
        console.error('Error saving wishlist:', error);
        res.json({
            success: false,
            message: 'An error occurred while saving the wishlist.',
            error: error.message
        });
    }
});

// Server start
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});