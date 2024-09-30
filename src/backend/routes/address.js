import express from 'express';
import { auth } from '../middleware/auth.js'; // Import authentication middleware
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Add a new address and mark it as most recently used
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

    // Reset `lastUsed` for all addresses
    user.addresses.forEach(address => {
      address.lastUsed = null;
    });

    // Add the new address and mark it as `lastUsed`
    const newAddress = { street, city, state, postalCode, country, lastUsed: new Date() };
    user.addresses.push(newAddress);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Error adding address:', err.message);
    res.status(500).send('Server error');
  }
});

// Update an existing address and mark it as most recently used
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

    // Reset `lastUsed` for all addresses
    user.addresses.forEach(addr => {
      addr.lastUsed = null;
    });

    // Update the address fields and mark as `lastUsed`
    address.street = street;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;
    address.lastUsed = new Date(); // Set `lastUsed` to current date

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

// Fetch the most recently used address
router.get('/recent', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the most recently used address by sorting
    const recentAddress = user.addresses.sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed))[0];

    if (!recentAddress || !recentAddress.lastUsed) {
      return res.status(404).json({ msg: 'No recent address found' });
    }

    res.json(recentAddress);
  } catch (err) {
    console.error('Error fetching recent address:', err.message);
    res.status(500).send('Server error');
  }
});

export default router;
