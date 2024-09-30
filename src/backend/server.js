import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';  
import restaurantData from './restaurantData.js'; 
import Restaurant from './models/Restaurant.js';
import cors from 'cors';
import authRoutes from './routes/auth.js'; 
import restaurantAuthRoutes from './routes/restaurantAuth.js'; // Import your restaurant routes


dotenv.config();

const app = express();

app.use(cors());  // Enable CORS for all routes

app.use(express.json());

console.log(process.env.MONGO_URI); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    populateUsers();
    populateRestaurants(); // Call the function to populate restaurants 
  })
  .catch((err) => console.error('MongoDB connection error:', err));


// Function to populate database with test users
const populateUsers = async () => {
  try {
    // Check if any users already exist to avoid duplication
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Users already exist in the database.');
      return;
    }

    // Array of test users
    const testUsers = [
      { username: 'user1', email: 'user1_test@example.com', password: 'password1' },
      { username: 'user2', email: 'user2_test@example.com', password: 'password2' },
      { username: 'user3', email: 'user3_test@example.com', password: 'password3' }
    ];

    // Insert test users into the database
    await User.insertMany(testUsers);
    console.log('Test users have been added to the database.');
  } catch (err) {
    console.error('Error populating users:', err);
  }
};

// Function to populate the database with restaurant data
const populateRestaurants = async () => {
  try {
    const existingRestaurants = await Restaurant.find({});
    
    // Only insert restaurants that don't already exist in the database
    const newRestaurants = restaurantData.filter(
      newRestaurant => !existingRestaurants.some(
        existingRestaurant => existingRestaurant.restaurantID === newRestaurant.restaurantID
      )
    );

    if (newRestaurants.length > 0) {
      await Restaurant.insertMany(newRestaurants);
      console.log('New restaurant data has been added to the database.');
    } else {
      console.log('No new restaurants to add.');
    }
  } catch (err) {
    console.error('Error populating restaurants:', err);
  }
};

// Routes
app.use('/api/auth', authRoutes); 

// Use the restaurant routes
app.use('/api', restaurantAuthRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
