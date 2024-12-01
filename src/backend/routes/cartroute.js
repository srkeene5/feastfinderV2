import express from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js'; // Import the Cart model
import { auth } from '../middleware/auth.js'; // Import the auth middleware
import User from '../models/User.js'; // Import the User model to retrieve user data
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

router.post('/cart/create', auth, async (req, res) => {
  try {
    const { restaurant, items, service, total, quantities } = req.body;

    if (!restaurant || !items || !service || !total || !quantities) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCart = new Cart({
      user: req.user,
      restaurant,
      items,
      service,
      total,
      quantities,
    });

    await newCart.save();

    // Add cart ID to user's cartIDs array
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $push: { cartIDs: newCart._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }


    res.status(201).json({ message: 'Cart created successfully', cartID: newCart._id });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/mycarts', auth, async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.user })
      .sort({ createdAt: -1 })
      .lean() // Use lean for better performance
      .exec();

    // Get unique restaurantIDs from carts
    const restaurantIDs = [...new Set(carts.map(cart => cart.restaurant.restaurantID))];

    // Fetch restaurant details
    const restaurants = await Restaurant.find({ restaurantID: { $in: restaurantIDs } }).lean();

    // Create a map from restaurantID to restaurant details
    const restMap = {};
    restaurants.forEach(restaurant => {
      restMap[restaurant.restaurantID] = restaurant;
    });

    // Merge restaurant details into carts
    const cartsWithRestaurantDetails = carts.map(cart => {
      const restaurantDetails = restMap[cart.restaurant.restaurantID] || {};
      return {
        ...cart,
        restaurant: {
          ...cart.restaurant,
          address: restaurantDetails.restaurantAddress || 'Address not available',
          // Include any other details you need
        },
      };
    });

    res.json({ carts: cartsWithRestaurantDetails });
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

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const cart = await Cart.findOne({ _id: cartId, user: req.user });

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

      if (restaurant.ubereatsAvailable && item.pricePerService.uberEats !== null) {
        serviceTotals.uberEatsTotal += item.pricePerService.uberEats * quantity;
      }

      if (restaurant.doordashAvailable && item.pricePerService.doorDash !== null) {
        serviceTotals.doorDashTotal += item.pricePerService.doorDash * quantity;
      }

      if (restaurant.grubhubAvailable && item.pricePerService.grubhub !== null) {
        serviceTotals.grubhubTotal += item.pricePerService.grubhub * quantity;
      }
    }

    // Remove totals for services that are not available
    if (!restaurant.ubereatsAvailable) delete serviceTotals.uberEatsTotal;
    if (!restaurant.doordashAvailable) delete serviceTotals.doorDashTotal;
    if (!restaurant.grubhubAvailable) delete serviceTotals.grubhubTotal;

    res.json(serviceTotals);
  } catch (error) {
    console.error('Error fetching service prices:', error);
    res.status(500).json({ message: 'Server error' });
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

    const restaurantIDs = [...new Set(carts.map(cart => cart.restaurant.restaurantID))];
    const restaurants = await Restaurant.find({restaurantID: {$in: restaurantIDs}});

    const restaurantMap = {};
    restaurants.forEach(restaurant => {
      restaurantMap[restaurant.restaurantID] = restaurant;
    })

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

          const rest = restaurantMap[restaurantID];
          const itemIndex = rest.menu.findIndex(dish => dish === item.item);
          const dishImage = itemIndex !== -1 ? rest.menuItemImages[itemIndex] : null;

          recentDishes.push({
            dishName: item.item,
            restaurantID: restaurantID,
            restaurantName: restaurantName,
            orderedAt: formattedDate,
            dishImage: dishImage,
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

