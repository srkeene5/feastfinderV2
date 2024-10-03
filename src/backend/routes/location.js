import express from 'express';
const router = express.Router();

// API route to handle location requests (client sends its latitude and longitude)
router.get('/current-location', async (req, res) => {
    try {
        const { latitude, longitude } = req.query; // Extract user's coordinates from query params
        res.json({ latitude, longitude });
    } catch (error) {
        console.error('Error fetching location:', error.message);
        res.status(500).send('Server Error');
    }
});

export default router;
