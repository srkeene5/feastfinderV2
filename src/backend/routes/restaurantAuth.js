import express from 'express';
import Restaurant from '../models/Restaurant.js';  // Import Restaurant model

const router = express.Router();

// API endpoint to search for restaurants by name (returns all matching restaurants)
router.get('/searchRestaurant', async (req, res) => {
    const { name } = req.query;

    try {
        // Search for all restaurants that match the name (case-insensitive)
        const restaurants = await Restaurant.find({ restaurantName: new RegExp(name, 'i') });

        if (!restaurants.length) {
            return res.status(404).json({ message: 'No restaurants found' });
        }

        // Return the full restaurant object
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// In restaurantAuth.js or a similar route file
router.get('/popularRestaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();  // Query your database for popular restaurants
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;