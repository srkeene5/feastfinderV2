import express from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js'; // Import the Cart model
import { auth } from '../middleware/auth.js'; // Import the auth middleware
import User from '../models/User.js'; // Import the User model to retrieve user data
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// Route to save the cart during checkout
/*
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
*/

// Route to save the cart during checkout
router.post('/checkout', auth, async (req, res) => {
  const { restaurant, items, cartTotal } = req.body;

  try {
    // Fetch the user data
    const user = await User.findById(req.user).select('username cartIDs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new cart
    const newCart = new Cart({
      user: req.user,
      restaurant,
      items,
      cartTotal,
    });

    // Save the cart document to the database
    const savedCart = await newCart.save();

    // Add the new cart's ID to the user's 'cartIDs' array
    await User.findByIdAndUpdate(
      req.user,
      { $push: { cartIDs: savedCart._id } },
      { new: true }
    );

    res.status(201).json({
      message: 'Cart saved successfully',
      cartID: savedCart._id,
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

// Route to delete all carts for the authenticated user
router.delete('/mycarts', auth, async (req, res) => {
  try {
    // Fetch the authenticated user
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the user's cart IDs
    const cartIds = user.cartIDs;

    if (!cartIds || cartIds.length === 0) {
      return res.status(200).json({ message: 'No carts to delete' });
    }

    // Delete all carts associated with the user
    await Cart.deleteMany({ _id: { $in: cartIds } });

    // Clear the user's cartIDs array
    user.cartIDs = [];
    await user.save();

    res.status(200).json({ message: 'All carts deleted successfully' });
  } catch (error) {
    console.error('Error deleting user carts:', error);
    res.status(500).json({ message: 'Failed to delete user carts', error: error.message });
  }
});


// Route to get all available food delivery app prices for a specified cartId
// Returns DoorDash/UberEats/Grubhub cart price and restaurant name
router.get('/cart/:cartId/prices', auth, async (req, res) => {
  try {
    const { cartId } = req.params;

    // Validate cartId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    // Fetch the cart by ID, ensuring it belongs to the user
    const cart = await Cart.findOne({ _id: cartId, user: req.user });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart not found or is empty' });
    }

    // Fetch the restaurant details
    const restaurant = await Restaurant.findOne({ restaurantID: cart.restaurant.restaurantID });

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: `Restaurant with ID ${cart.restaurant.restaurantID} not found` });
    }

    const serviceTotals = {
      uberEats: 0,
      doorDash: 0,
      grubhub: 0,
    };

    const servicesAvailable = {
      uberEats: restaurant.uberEatsAvailable,
      doorDash: restaurant.doordashAvailable,
      grubhub: restaurant.grubhubAvailable,
    };

    // For each item in the cart
    for (const itemEntry of cart.items) {
      const itemName = itemEntry.item;
      const quantity = itemEntry.quantity;

      // Find the index of the item in the restaurant's menu
      const itemIndex = restaurant.menu.indexOf(itemName);

      if (itemIndex === -1) {
        return res
          .status(404)
          .json({
            message: `Item ${itemName} not found in restaurant ${restaurant.restaurantName}`,
          });
      }

      // Add the item's price to each service total if the service is available
      if (restaurant.uberEatsAvailable) {
        serviceTotals.uberEats += restaurant.ubereatsMenuPrice[itemIndex] * quantity;
      }
      if (restaurant.doordashAvailable) {
        serviceTotals.doorDash += restaurant.doordashMenuPrice[itemIndex] * quantity;
      }
      if (restaurant.grubhubAvailable) {
        serviceTotals.grubhub += restaurant.grubhubMenuPrice[itemIndex] * quantity;
      }
    }

    // Prepare the response with available services and restaurant name
    const result = {
      restaurant: restaurant.restaurantName,
      prices: {},
    };

    if (servicesAvailable.uberEats) {
      result.prices.uberEatsTotal = parseFloat(serviceTotals.uberEats.toFixed(2));
    }
    if (servicesAvailable.doorDash) {
      result.prices.doorDashTotal = parseFloat(serviceTotals.doorDash.toFixed(2));
    }
    if (servicesAvailable.grubhub) {
      result.prices.grubhubTotal = parseFloat(serviceTotals.grubhub.toFixed(2));
    }

    if (Object.keys(result.prices).length === 0) {
      return res
        .status(400)
        .json({ message: 'No delivery services are available for the items in your cart' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error calculating cart prices:', error);
    res.status(500).json({ message: 'Failed to calculate cart prices', error: error.message });
  }
});

// Endpoint to clear the active cart
router.delete('/cart/clear', auth, async (req, res) => {
  try {
    // Delete the user's active cart
    await Cart.findOneAndDelete({ username: req.user.username });

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
});

// Endpoint to get the active cart
router.get('/cart', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ username: req.user.username });

    if (!cart) {
      return res.status(404).json({ message: 'No active cart found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
});

// Endpoint to get the 5 most recent restaurants from user's carts
router.get('/recent-restaurants', auth, async (req, res) => {
  try {
    // Ensure req.user contains the user ID
    const userId = req.user;

    // Fetch the 5 most recent carts of the user
    const carts = await Cart.find({ user: userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(5);

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: 'No recent carts found' });
    }

    // Extract the unique restaurant IDs from the carts
    const restaurantIDs = carts.map((cart) => cart.restaurant.restaurantID);

    // Remove duplicate restaurant IDs
    const uniqueRestaurantIDs = [...new Set(restaurantIDs)];

    // Fetch the restaurant objects from the database
    const restaurants = await Restaurant.find({ restaurantID: { $in: uniqueRestaurantIDs } });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching recent restaurants:', error);
    res.status(500).json({ message: 'Failed to fetch recent restaurants', error: error.message });
  }
});

// Returns the 8 most recent dish names, their restaurantID, restaurant name, and date ordered
router.get('/recent-dishes', auth, async (req, res) => {
  try {
    const userId = req.user;

    // Fetch the user's most recent carts that contain items
    const carts = await Cart.find({ user: userId, items: { $exists: true, $ne: [] } })
      .sort({ createdAt: -1 })
      .limit(10); // Increase limit to have more carts to pull unique dishes from

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: 'No recent carts found' });
    }

    const recentDishes = [];
    const dishSet = new Set();

    for (const cart of carts) {
      const { restaurant } = cart;
      const { restaurantID, restaurantName } = restaurant;

      for (const item of cart.items) {
        if (recentDishes.length >= 8) break;

        const dishKey = `${item.item}-${restaurantID}`;
        if (!dishSet.has(dishKey)) {
          dishSet.add(dishKey);

          // Format the date to include only day, month, and year
          const formattedDate = cart.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          recentDishes.push({
            dishName: item.item,
            restaurantID: restaurantID,
            restaurantName: restaurantName,
            orderedAt: formattedDate,
          });
        }
      }

      if (recentDishes.length >= 8) break;
    }

    if (recentDishes.length === 0) {
      return res.status(404).json({ message: 'No recent dishes found' });
    }

    res.status(200).json(recentDishes);
  } catch (error) {
    console.error('Error fetching recent dishes:', error);
    res.status(500).json({ message: 'Failed to fetch recent dishes', error: error.message });
  }
});

export default router;
