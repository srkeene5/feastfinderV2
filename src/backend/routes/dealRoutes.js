import express from 'express';
import AppLogin from '../models/appLogin.js';
import { auth } from '../middleware/auth.js'; // Import auth middleware

const router = express.Router();

router.get('/userDeals', auth, async (req, res) => {
  try {
    // Get user from auth middleware
    const userId = req.user;
    
    const appLogin = await AppLogin.findOne({ userID: userId });
    
    if (!appLogin) {
      return res.status(404).json({
        success: false,
        message: 'No deals found for this user'
      });
    }

    const deals = {
      uberEats: appLogin.uberEatsDeal,
      doorDash: appLogin.doorDashDeal,
      grubHub: appLogin.grubHubDeal
    };

    return res.status(200).json({
      success: true,
      deals
    });

  } catch (error) {
    console.error('Error fetching deals:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching deals'
    });
  }
});

export default router;