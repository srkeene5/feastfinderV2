import express from 'express';
import { auth } from '../middleware/auth.js'; // Import auth middleware
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Add dietary preferences
router.put('/', auth, async (req, res) => {
  const { preferences } = req.body; // Expect an array of preferences

  if (!preferences || !Array.isArray(preferences)) {
    return res.status(400).json({ msg: 'Please provide an array of preferences' });
  }

  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Add the new preferences to the user's dietary preferences array
    user.dietaryPreferences.push(...preferences);
    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Error adding preferences:', err.message);
    res.status(500).send('Server error');
  }
});

// Update dietary preferences
router.put('/update', auth, async (req, res) => {
    const { preferences } = req.body; // Expect an array of preferences
  
    if (!preferences || !Array.isArray(preferences)) {
      return res.status(400).json({ msg: 'Please provide an array of preferences' });
    }
  
    try {
      const user = await User.findById(req.user);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Replace the user's dietary preferences with the new array
      user.dietaryPreferences = preferences;
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error('Error updating preferences:', err.message);
      res.status(500).send('Server error');
    }
  });
  
  // Delete a specific dietary preference
router.delete('/:preference', auth, async (req, res) => {
    const { preference } = req.params; // Expect a preference in the URL
  
    try {
      const user = await User.findById(req.user);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Remove the specified preference from the array
      user.dietaryPreferences = user.dietaryPreferences.filter(pref => pref !== preference);
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error('Error deleting preference:', err.message);
      res.status(500).send('Server error');
    }
  });
  
  router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Return the user's dietary preferences
      res.json({ dietaryPreferences: user.dietaryPreferences });
    } catch (err) {
      console.error('Error retrieving preferences:', err.message);
      res.status(500).send('Server error');
    }
  });
  export default router;
  