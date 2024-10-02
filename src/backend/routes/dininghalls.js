import express from 'express';
const router = express.Router();

// Predefined list of dining halls
const diningHalls = [
    { name: 'Earhart Dining Court', latitude: 40.4260, longitude: -86.9256 },
    { name: 'Ford Dining Court', latitude: 40.4310, longitude: -86.9200 },
    { name: 'Hillenbrand Dining Court', latitude: 40.4241, longitude: -86.9216 },
    { name: 'Wiley Dining Court', latitude: 40.4245, longitude: -86.9265 },
    { name: 'Windsor Dining Court', latitude: 40.4274, longitude: -86.9171 },
];

// Route to get dining hall locations
router.get('/', (req, res) => {
    res.json(diningHalls);
});

export default router;
