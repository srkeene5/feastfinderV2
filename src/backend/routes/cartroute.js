import express from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js'; // Import the Cart model
import { auth } from '../middleware/auth.js'; // Import the auth middleware
import User from '../models/User.js'; // Import the User model to retrieve user data

const router = express.Router();

// Route to save the cart during checkout
router.post('/checkout', auth, async (req, res) => {
  const { restaurants, cartTotal } = req.body;

  try {
    // Fetch the user data using the user ID from the auth middleware
    const user = await User.findById(req.user).select('username cartIDs');

    if (!user) {

      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure cartIDs is initialized as an array
    if (!Array.isArray(user.cartIDs)) {
      user.cartIDs = [];
    }

    const newCart = new Cart({
      username: user.username, // Use the fetched username
      restaurants,
      cartTotal,
    });

    // Save the cart document to the database
    const savedCart = await newCart.save();

    // Atomically push the new cart's ID to the user's 'cartIDs' array
    await User.findByIdAndUpdate(
      req.user,
      { $push: { cartIDs: savedCart._id } },
      { new: true } // Return the updated document
    );

    res.status(201).json({ 
      message: 'Cart saved successfully', 
      cartID: savedCart._id 
      // Optionally, you can fetch and return updated 'cartIDs' if needed
    });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ message: 'Failed to save cart', error: error.message });
  }
});


// Optional: Route to get all carts for a user
router.get('/mycarts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('cartIDs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ carts: user.cartIDs });
  } catch (error) {
    console.error('Error fetching user carts:', error);
    res.status(500).json({ message: 'Failed to fetch user carts', error });
  }
});

// Route to delete a cart
router.delete('/carts/:cartId', auth, async (req, res) => {
  const { cartId } = req.params;

  try {
    // Find and delete the cart by ID
    const deletedCart = await Cart.findOneAndDelete({ _id: cartId });

    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Failed to delete cart', error: error.message });
  }
});


export default router;
