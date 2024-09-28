import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import { auth } from '../middleware/auth.js'; 
import BlacklistedToken from '../models/BlacklistedToken.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/protected', auth, async (req, res) => {
    try {
        // Fetch the user from the database using the user ID from the token
        const user = await User.findById(req.user).select('-password');
        
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
        
        // Send the user profile information as the response
        res.json(user);
      } catch (err) {
        res.status(500).json({ msg: 'Server error' });
      }
    });

router.put('/address', auth, async (req, res) => {
  const { street, city, state, postalCode, country } = req.body;
    
  if (!street || !city || !state || !postalCode || !country) {
    return res.status(400).json({ msg: 'Please provide all address fields' });
  }
    
  try {
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        address: {
          street,
          city,
          state,
          postalCode,
          country
        }
      },
      { new: true } // Return the updated document
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Error updating address:', err.message);
    res.status(500).send('Server error');
  }
});

// Logout route
router.post('/logout', auth, async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];

    // Decode the token to get expiration time
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert to milliseconds

    // Add the token to the blacklist
    const blacklistedToken = new BlacklistedToken({ token, expiresAt });
    await blacklistedToken.save();

    res.status(200).json({ msg: 'Successfully logged out' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
});

export default router;