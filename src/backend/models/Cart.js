// src/backend/models/Cart.js

import mongoose from 'mongoose';
import User from './User.js'; // Make sure to import the User model

// Define the schema for individual cart items
const cartItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  prices: {
    doordash: { type: Number, required: true },
    ubereats: { type: Number, required: true },
    grubhub: { type: Number, required: true },
  },
});

// Define the main Cart schema
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: {
      restaurantID: { type: String, required: true },
      restaurantName: { type: String, required: true },
      
      // ... other restaurant details
    },
    items: [cartItemSchema],
    service: { type: String, required: true },
    total: { type: Number, required: true },
    quantities: { type: [Number], required: true },
  },
  { timestamps: true }
);

// Create a virtual field 'cartID' that maps to '_id'
cartSchema.virtual('cartID').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized when converting documents to JSON
cartSchema.set('toJSON', {
  virtuals: true,
});

// Post middleware for findOneAndDelete
cartSchema.post('findOneAndDelete', async function (doc, next) {
  if (doc) {
    try {
      // Find the user associated with this cart
      const user = await User.findById(doc.user);

      if (user) {
        // Remove the cart ID from the user's cartIDs array
        user.cartIDs.pull(doc._id);
        await user.save();
      }

      next();
    } catch (error) {
      console.error('Error removing cartID from user:', error);
      next(error);
    }
  } else {
    next();
  }
});

// Similarly, handle deleteOne
cartSchema.post('deleteOne', { document: true, query: false }, async function (doc, next) {
  if (doc) {
    try {
      // Find the user associated with this cart
      const user = await User.findById(doc.user);

      if (user) {
        // Remove the cart ID from the user's cartIDs array
        user.cartIDs.pull(doc._id);
        await user.save();
      }

      next();
    } catch (error) {
      console.error('Error removing cartID from user:', error);
      next(error);
    }
  } else {
    next();
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
