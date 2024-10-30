import express from 'express';
import Review from '../models/Review.js';
import { auth } from '../middleware/auth.js';   // Assuming you have this middleware

const router = express.Router();
router.post('/', auth, async (req, res) => {
    console.log('Received review submission:', req.body);
  
    // Simple validation
    if (!req.body.restaurantID || !req.body.username || !req.body.rating || !req.body.reviewText) {
      return res.status(400).json({
        message: 'Missing required fields',
        received: req.body
      });
    }
  
    try {
      // Create new review every time
      const review = new Review({
        restaurantID: req.body.restaurantID,
        username: req.body.username,
        rating: req.body.rating,
        reviewText: req.body.reviewText
      });
  
      const savedReview = await review.save();
      console.log('Review saved successfully:', savedReview);
      res.status(201).json(savedReview);
    } catch (error) {
      console.error('Error saving review:', error);
      res.status(400).json({ message: error.message });
    }
  });
  
  // GET route to fetch reviews for a restaurant
  router.get('/restaurant/:restaurantID', async (req, res) => {
    try {
      const reviews = await Review.find({ 
        restaurantID: req.params.restaurantID 
      })
      .sort({ createdAt: -1 }); // Sort by newest first
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;