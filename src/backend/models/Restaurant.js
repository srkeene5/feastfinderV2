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
  menuDietaryViolations: [
    [
      {
        type: String,
        enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'],
      },
    ],
  ],
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
  },
  // New fields
  cuisineType: {
    type: String,
    enum: ['Italian', 'Indian', 'Japanese', 'Chinese', 'Mexican', 'American', 'All'],
    required: true
  },
  operatingHours: [{
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'All Day'],
    required: true
  }],
  restaurantImage: {
    type: String,
    required: true
  },
  menuItemImages: [{
    type: String,
    required: true
  }],
  websiteURL: {
    type: String,
    required: false, // This field is optional
    match: [
      /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.?=&%]*)*\/?$/,
      'Please fill a valid URL'
    ]
  },
  
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
