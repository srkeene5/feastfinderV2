import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppLogin from '../models/appLogin.js'; // Import the AppLogin model
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


// Helper function to generate random integers between min and max (inclusive)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate deals with a 50% chance of being 0
function getRandomDeal() {
  return Math.random() < 0.5 ? 0 : getRandomIntInclusive(5, 20);
}

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Extract username from email
    const username = email.split('@')[0];

    user = new User({
      username,
      email,
      password: passwordHash, // Store hashed password
    });

    await user.save();

    // Generate random deals between 5 and 20 or 0
    const doorDashDeal = getRandomDeal();
    const grubHubDeal = getRandomDeal();
    const uberEatsDeal = getRandomDeal();

    // Create appLogin document
    const appLogin = new AppLogin({
      userID: user._id,
      username: username,
      email: email,
      passwordHash: passwordHash, // Store hashed password
      logins: [
        `${username}@doordash.com`,
        `${username}@ubereats.com`,
        `${username}@grubhub.com`,
      ],
      doorDashDeal: doorDashDeal,
      grubHubDeal: grubHubDeal,
      uberEatsDeal: uberEatsDeal,
    });

    await appLogin.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error during registration:', err.message);
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
      expiresIn: '24h'
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

/* logs in to uber/doordash/login account. example of response:

{
  "msg": "Logged into DoorDash successfully",
  "service": "DoorDash",
  "deal": 15,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
*/
router.post('/app-login', async (req, res) => {
  const { email, password } = req.body;
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide both email and password' });
  }

  try {
    // Find the AppLogin document that includes the provided email
    const appLogin = await AppLogin.findOne({ logins: email });

    if (!appLogin) {
      return res.status(400).json({ msg: 'App account not found' });
    }

    // Compare the provided password with the stored passwordHash
    const isMatch = await bcrypt.compare(password, appLogin.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Determine which service the email belongs to
    let service = '';
    let deal = 0;
    let loginField = '';
    let tokenField = '';

    if (email.endsWith('@doordash.com')) {
      service = 'DoorDash';
      deal = appLogin.doorDashDeal;
      loginField = 'doordash_logged_in';
      tokenField = 'doordash_token';
    } else if (email.endsWith('@ubereats.com')) {
      service = 'UberEats';
      deal = appLogin.uberEatsDeal;
      loginField = 'uber_logged_in';
      tokenField = 'uber_token';
    } else if (email.endsWith('@grubhub.com')) {
      service = 'Grubhub';
      deal = appLogin.grubHubDeal;
      loginField = 'grubhub_logged_in';
      tokenField = 'grubhub_token';
    } else {
      return res.status(400).json({ msg: 'Invalid app account domain' });
    }
  

    // Update the User's Login Status
    const user = await User.findById(appLogin.userID);
    if (user) {
      user[loginField] = true;
      await user.save();
    } else {
      return res.status(400).json({ msg: 'Associated user not found' });
    }

    // Generate a JWT for the app account session
    const token = jwt.sign(
      { appEmail: email, service: service },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    const user2 = await User.findById(appLogin.userID);
    if (user2) {
      user[tokenField] = token;
      await user.save();
    } else {
      return res.status(400).json({ msg: 'Associated user not found' });
    }
    
    res.json({ 
      msg: `Logged into ${service} successfully`,
      service: service,
      deal: deal,
      token: token // Optional: Provide a token for further authenticated requests
    });
  } catch (err) {
    console.error('Error during app login:', err.message);
    res.status(500).send('Server error');
  }
});

export const appAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Check if the token is blacklisted
    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ msg: 'Token has been revoked. Please log in again.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.appEmail = decoded.appEmail;
    req.service = decoded.service;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

/* invalidates the uber/doordash/grubhub token
example response:
{
    "msg": "Successfully logged out"
}
*/
router.post('/app-logout', appAuth, async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];

    // Decode the token to get expiration time
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert to milliseconds

    // Add the token to the blacklist
    const blacklistedToken = new BlacklistedToken({ token, expiresAt });
    await blacklistedToken.save();

    // Update the User's Login Status
    let loginField = '';
    let tokenField = '';
    
    if (decoded.service === 'DoorDash') {
      loginField = 'doordash_logged_in';
      tokenField = 'doordash_token';
    } else if (decoded.service === 'UberEats') {
      loginField = 'uber_logged_in';
      tokenField = 'uber_token';
    } else if (decoded.service === 'Grubhub') {
      loginField = 'grubhub_logged_in';
      tokenField = 'grubhub_token';
    } else {
      return res.status(400).json({ msg: 'Invalid service in token' });
    }

    // Find the AppLogin document using appEmail
    const appLogin = await AppLogin.findOne({ logins: decoded.appEmail });
    if (appLogin) {
      const user = await User.findById(appLogin.userID);
      if (user) {
        user[loginField] = false;
        user[tokenField] = null;
        await user.save();
      } else {
        return res.status(400).json({ msg: 'Associated user not found' });
      }
    } else {
      return res.status(400).json({ msg: 'AppLogin document not found' });
    }

    res.status(200).json({ msg: `Successfully logged out of ${decoded.service}` });
  } catch (error) {
    console.error('Error during app logout:', error.message);
    res.status(500).json({ msg: 'Server error', error });
  }
});

/*
provide Bearer token. get token from feastfinder login
example response:
{
    "uber_logged_in": false,
    "doordash_logged_in": true,
    "grubhub_logged_in": true
}
*/
router.get('/app-status', auth, async (req, res) => {
  try {
    const userId = req.user; // Assuming the main auth middleware sets req.user to the user's ID
    const user = await User.findById(userId).select('uber_logged_in doordash_logged_in grubhub_logged_in');

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      uber_logged_in: user.uber_logged_in,
      doordash_logged_in: user.doordash_logged_in,
      grubhub_logged_in: user.grubhub_logged_in
    });
  } catch (err) {
    console.error('Error fetching app status:', err.message);
    res.status(500).send('Server error');
  }
});

/* gets the app name and deal amount given a Bearer token
example of response:
{
  "service": "DoorDash",
  "deal": 15
}

*/
router.get('/app-deal', appAuth, async (req, res) => {
  const { appEmail, service } = req;

  try {
    // Find the AppLogin document containing the appEmail
    const appLogin = await AppLogin.findOne({ logins: appEmail });

    if (!appLogin) {
      return res.status(400).json({ msg: 'App account not found' });
    }

    let deal = 0;

    switch (service) {
      case 'DoorDash':
        deal = appLogin.doorDashDeal;
        break;
      case 'UberEats':
        deal = appLogin.uberEatsDeal;
        break;
      case 'Grubhub':
        deal = appLogin.grubHubDeal;
        break;
      default:
        return res.status(400).json({ msg: 'Invalid service' });
    }

    res.json({ service, deal });
  } catch (err) {
    console.error('Error fetching app deal:', err.message);
    res.status(500).send('Server error');
  }
});



// puts user's uber's login and hashed password in database
router.put('/uberlogin', auth, async (req, res) => {
  const { uber_email, uber_password } = req.body;

  if (!uber_email || !uber_password) {
    return res.status(400).json({ msg: 'Please enter your UberEats email and password' });
  }

  try {
    const uber_password_Hash = await bcrypt.hash(uber_password, 10);

    const user = await User.findByIdAndUpdate(
      req.user,
      {
        uber_email,
        uber_password_Hash,
      },
      { new: true } 
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).send('Server error');
  }
});

// returns "uber_stored": true if user's uber login credentials is in database
// returns "uber_stored": false if user's uber login credentials is not in the database
router.get('/uberlogin/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('uber_email uber_password_Hash');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const uber_stored = !!(user.uber_email && user.uber_password_Hash);

    res.json({ uber_stored });
  } catch (err) {
    console.error('Error checking uber login status:', err.message);
    res.status(500).send('Server error');
  }
});

// removes user's uber login credentials from the database
router.delete('/uberlogin', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user,
      { $unset: { uber_email: "", uber_password_Hash: "" } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'UberEats login deleted successfully', user });
  } catch (err) {
    console.error('Error deleting UberEats login:', err.message);
    res.status(500).send('Server error');
  }
});

// puts user's doordash login and hashed password in database
router.put('/doordashlogin', auth, async (req, res) => {
  const { doordash_email, doordash_password } = req.body;

  if (!doordash_email || !doordash_password) {
    return res.status(400).json({ msg: 'Please enter your DoorDash email and password' });
  }

  try {
    const doordash_password_Hash = await bcrypt.hash(doordash_password, 10);

    const user = await User.findByIdAndUpdate(
      req.user,
      {
        doordash_email,
        doordash_password_Hash,
      },
      { new: true } 
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).send('Server error');
  }
});

// returns "doordash_stored": true if user's doordash login credentials is in database
// returns "doordash_stored": false if user's doordash login credentials is not in the database
router.get('/doordashlogin/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('doordash_email doordash_password_Hash');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const doordash_stored = !!(user.doordash_email && user.doordash_password_Hash);

    res.json({ doordash_stored });
  } catch (err) {
    console.error('Error checking doordash login status:', err.message);
    res.status(500).send('Server error');
  }
});

// removes user's Doordash login credentials from the database
router.delete('/doordashlogin', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user,
      { $unset: { doordash_email: "", doordash_password_Hash: "" } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'DoorDash login deleted successfully', user });
  } catch (err) {
    console.error('Error deleting DoorDash login:', err.message);
    res.status(500).send('Server error');
  }
});

// puts user's grubhub login and hashed password in database
router.put('/grubhublogin', auth, async (req, res) => {
  const { grubhub_email, grubhub_password } = req.body;

  if (!grubhub_email || !grubhub_password) {
    return res.status(400).json({ msg: 'Please enter your GrubHub email and password' });
  }

  try {
    const grubhub_password_Hash = await bcrypt.hash(grubhub_password, 10);

    const user = await User.findByIdAndUpdate(
      req.user,
      {
        grubhub_email,
        grubhub_password_Hash,
      },
      { new: true } 
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).send('Server error');
  }
});

// returns "grubhub_stored": true if user's grubhub login credentials is in database
// returns "grubhub_stored": false if user's grubhub login credentials is not in the database
router.get('/grubhublogin/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('grubhub_email grubhub_password_Hash');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const grubhub_stored = !!(user.grubhub_email && user.grubhub_password_Hash);

    res.json({ grubhub_stored });
  } catch (err) {
    console.error('Error checking grubhub login status:', err.message);
    res.status(500).send('Server error');
  }
});

// removes user's GrubHub login credentials from the database
router.delete('/grubhublogin', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user,
      { $unset: { grubhub_email: "", grubhub_password_Hash: "" } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'GrubHub login deleted successfully', user });
  } catch (err) {
    console.error('Error deleting GrubHub login:', err.message);
    res.status(500).send('Server error');
  }
});

export default router;