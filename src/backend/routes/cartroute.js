import express from 'express';
import Cart from '../models/Cart.js'; // Import the Cart model
import { auth } from '../middleware/auth.js'; // Import the auth middleware
import User from '../models/User.js'; // Import the User model to retrieve user data

const router = express.Router();

// Route to save the cart during checkout
router.post('/checkout', auth, async (req, res) => {
  const { restaurants, cartTotal } = req.body;

  try {
    // Fetch the user data using the user ID from the auth middleware
    const user = await User.findById(req.user).select('username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newCart = new Cart({
      username: user.username, // Use the fetched username
      restaurants,
      cartTotal,
    });

    // Save the cart document to the database
    const savedCart = await newCart.save(); // Save the cart and get the saved document
    res.status(201).json({ message: 'Cart saved successfully', cartID: savedCart.cartID });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ message: 'Failed to save cart', error });
  }
});

export default router;
