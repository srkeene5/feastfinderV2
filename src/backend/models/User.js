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
  uber_logged_in: {
    type: Boolean,
    default: false
  },
  doordash_logged_in: {
    type: Boolean,
    default: false
  },
  grubhub_logged_in: {
    type: Boolean,
    default: false
  },
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
  },   
  cartIDs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    default: []
  },
  uber_token: {
    type: String,
    default: null
  },
  doordash_token: {
    type: String,
    default: null
  },
  grubhub_token: {
    type: String,
    default: null
  },
});



const User = mongoose.model('User', UserSchema);

export default User;