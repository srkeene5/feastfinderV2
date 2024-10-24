import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  lastUsed: { type: Date, default: null }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  /*
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },
  */
  uber_email: {
    type: String,
  },
  uber_password_Hash: {
    type: String,
  },
  doordash_email: {
    type: String,
  },
  doordash_password_Hash: {
    type: String,
  },
  grubhub_email: {
    type: String,
  },
  grubhub_password_Hash: {
    type: String,
  },
  addresses: [AddressSchema],
  dietaryPreferences: {
    type: [String], 
    default: []     
  },   // New Field: Array of Cart ObjectIDs
  // **New Field: Array of Cart ObjectIDs with Default Empty Array**
  cartIDs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    default: []
  }
});



const User = mongoose.model('User', UserSchema);

export default User;