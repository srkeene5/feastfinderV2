// src/backend/routes/cartroute.js

import express from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';

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
      { new: true }
    );

    res.status(201).json({ message: 'Cart saved successfully', cartID: savedCart._id });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ message: 'Failed to save cart', error: error.message });
  }
});

router.post('/cart/create', auth, async (req, res) => {
  try {
    const { restaurant, items, service, total, quantities } = req.body;

    if (!restaurant || !items || !service || !total || !quantities) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(req.user).select('username');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newCart = new Cart({
      username: user.username,
      restaurant,
      items,
      service,
      total,
      quantities,
    });

    await newCart.save();

    await User.findByIdAndUpdate(
      req.user,
      { $push: { cartIDs: newCart._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Cart created successfully', cartID: newCart._id });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/mycarts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('username cartIDs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const carts = await Cart.find({ username: user.username });

    res.json({ carts });
  } catch (error) {
    console.error('Error fetching user carts:', error);
    res.status(500).json({ message: 'Failed to fetch user carts', error });
  }
});

router.delete('/carts/:cartId', auth, async (req, res) => {
  const { cartId } = req.params;

  try {
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

router.delete('/mycarts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('username cartIDs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartIds = user.cartIDs;

    if (!cartIds || cartIds.length === 0) {
      return res.status(200).json({ message: 'No carts to delete' });
    }

    await Cart.deleteMany({ _id: { $in: cartIds } });

    user.cartIDs = [];
    await user.save();

    res.status(200).json({ message: 'All carts deleted successfully' });
  } catch (error) {
    console.error('Error deleting user carts:', error);
    res.status(500).json({ message: 'Failed to delete user carts', error: error.message });
  }
});

router.get('/cart/:cartId/prices', auth, async (req, res) => {
  try {
    const { cartId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const cart = await Cart.findOne({ _id: cartId, username: req.user.username });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart not found or is empty' });
    }

    const restaurant = await Restaurant.findOne({ restaurantID: cart.restaurant.restaurantID });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const serviceTotals = {
      uberEatsTotal: 0,
      doorDashTotal: 0,
      grubhubTotal: 0,
    };

    for (const item of cart.items) {
      const itemIndex = restaurant.menu.indexOf(item.item);

      if (itemIndex === -1) {
        return res.status(404).json({ message: `Item ${item.item} not found in restaurant menu` });
      }

      const quantity = item.quantity;

      if (restaurant.ubereatsAvailable && item.prices.uberEats !== null) {
        serviceTotals.uberEatsTotal += item.prices.uberEats * quantity;
      }

      if (restaurant.doordashAvailable && item.prices.doorDash !== null) {
        serviceTotals.doorDashTotal += item.prices.doorDash * quantity;
      }

      if (restaurant.grubhubAvailable && item.prices.grubhub !== null) {
        serviceTotals.grubhubTotal += item.prices.grubhub * quantity;
      }
    }

    if (!restaurant.ubereatsAvailable) delete serviceTotals.uberEatsTotal;
    if (!restaurant.doordashAvailable) delete serviceTotals.doorDashTotal;
    if (!restaurant.grubhubAvailable) delete serviceTotals.grubhubTotal;

    res.json(serviceTotals);
  } catch (error) {
    console.error('Error fetching service prices:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
