import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';  
import restaurantData from './restaurantData.js'; 
import Restaurant from './models/Restaurant.js';
import cors from 'cors';
import authRoutes from './routes/auth.js'; 
import restaurantAuthRoutes from './routes/restaurantAuth.js'; // Import your restaurant routes
import addressRoutes from './routes/address.js';
import preferencesRoutes from './routes/preferences.js'; // Import preferences routes
import chatRoutes from './routes/chat.js';
import diningHallsRoutes from './routes/dininghalls.js';
import locationRoutes from './routes/location.js';

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
    // Check if any restaurants already exist to avoid duplication
    const restaurantCount = await Restaurant.countDocuments();
    if (restaurantCount > 0) {
      console.log('Restaurants already exist in the database.');
      return;
    }

    // Insert restaurant data into the database
    await Restaurant.insertMany(restaurantData);
    console.log('Restaurant data has been added to the database.');
  } catch (err) {
    console.error('Error populating restaurants:', err);
  }
};

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/address', addressRoutes);
app.use('/api/preferences', preferencesRoutes); // Preferences-related routes
app.use('/api/chat', chatRoutes);
app.use('/api/dining-halls', diningHallsRoutes);
app.use('/api/location', locationRoutes);
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
