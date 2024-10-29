// backend/routes/reviews.js

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Define path to reviews.json
const REVIEWS_FILE = path.join(__dirname, '..', 'data', 'reviews.json');

// Ensure the reviews file exists
async function ensureReviewsFile() {
    try {
        await fs.access(REVIEWS_FILE);
    } catch {
        await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
        await fs.writeFile(REVIEWS_FILE, JSON.stringify({}));
    }
}

// Get all reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
    try {
        await ensureReviewsFile();
        const reviews = JSON.parse(await fs.readFile(REVIEWS_FILE, 'utf8'));
        const restaurantReviews = reviews[req.params.restaurantId] || [];
        res.json(restaurantReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Add a new review
router.post('/:restaurantId', async (req, res) => {
    try {
        await ensureReviewsFile();
        const reviews = JSON.parse(await fs.readFile(REVIEWS_FILE, 'utf8'));
        
        const newReview = {
            reviewId: Date.now(),
            username: req.body.username || "Anonymous",
            rating: req.body.rating,
            reviewText: req.body.reviewText,
            createdAt: new Date().toISOString()
        };

        if (!reviews[req.params.restaurantId]) {
            reviews[req.params.restaurantId] = [];
        }
        
        reviews[req.params.restaurantId].unshift(newReview);
        await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
        
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ error: 'Failed to save review' });
    }
});

module.exports = router;