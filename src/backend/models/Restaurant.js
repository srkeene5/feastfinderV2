import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  restaurantID: {
    type: String,
    required: true,
    unique: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  restaurantAddress: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  menu: [{
    type: String,
    required: true
  }],
  ubereatsMenuPrice: [{
    type: Number,
    required: true
  }],
  doordashMenuPrice: [{
    type: Number,
    required: true
  }],
  grubhubMenuPrice: [{
    type: Number,
    required: true
  }],
  ubereatsAvailable: {
    type: Boolean,
    required: true
  },
  doordashAvailable: {
    type: Boolean,
    required: true
  },
  grubhubAvailable: {
    type: Boolean,
    required: true
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
