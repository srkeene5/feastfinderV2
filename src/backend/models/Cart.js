// src/backend/models/Cart.js
import mongoose from 'mongoose';

// Define the schema for individual cart items
const cartItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Define the schema for each restaurant entry in the cart
const restaurantEntrySchema = new mongoose.Schema({
  restaurant: { type: Object, required: true }, // Changed from String to Object
  service: { type: String, required: true },
  items: [cartItemSchema],
  total: { type: Number, required: true },
  quantities: { type: [Number], required: true }, // Ensure quantities array is stored
});

// Define the main Cart schema
const cartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    restaurants: [restaurantEntrySchema], // Array of restaurant entries
    cartTotal: {
      type: Number,
      required: true,
    },
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

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;