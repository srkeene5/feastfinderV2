import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';  // Import User model
import authRoutes from './routes/auth.js'; // Import routes here

dotenv.config();

const app = express();

app.use(express.json());

//debug the environment variables

console.log(process.env.MONGO_URI); // This should log connection string

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    populateUsers(); // Populate users after DB connection is established
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

// Routes
app.use('/api/auth', authRoutes); // Use routes here

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
