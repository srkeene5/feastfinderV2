import express from 'express';
import { auth } from '../middleware/auth.js'; // Import your authentication middleware
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Add a new address
router.put('/', auth, async (req, res) => {
  const { street, city, state, postalCode, country } = req.body;

  if (!street || !city || !state || !postalCode || !country) {
    return res.status(400).json({ msg: 'Please provide all address fields' });
  }

  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Add the new address to the user's addresses array
    user.addresses.push({ street, city, state, postalCode, country });
    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Error adding address:', err.message);
    res.status(500).send('Server error');
  }
});

// Update an existing address
router.put('/:addressId', auth, async (req, res) => {
  const { street, city, state, postalCode, country } = req.body;

  if (!street || !city || !state || !postalCode || !country) {
    return res.status(400).json({ msg: 'Please provide all address fields' });
  }

  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the address by ID
    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({ msg: 'Address not found' });
    }

    // Update the address fields
    address.street = street;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Error updating address:', err.message);
    res.status(500).send('Server error');
  }
});

// Delete an address
router.delete('/:addressId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the address by ID and remove it
    user.addresses = user.addresses.filter(address => address._id.toString() !== req.params.addressId);

    await user.save();

    res.json({ msg: 'Address removed', user });
  } catch (err) {
    console.error('Error deleting address:', err.message);
    res.status(500).send('Server error');
  }
});

export default router;
