import express from 'express';
import axios from 'axios';
const router = express.Router();


const API_KEY = 'AIzaSyBju-jbEs2tyctuT2hYMriG21tHzH3lT6Q';


// Predefined list of dining halls
const diningHalls = [
    { name: 'Earhart Dining Court', latitude: 40.4260, longitude: -86.9256 },
    { name: 'Ford Dining Court', latitude: 40.4310, longitude: -86.9200 },
    { name: 'Hillenbrand Dining Court', latitude: 40.4241, longitude: -86.9216 },
    { name: 'Wiley Dining Court', latitude: 40.4245, longitude: -86.9265 },
    { name: 'Windsor Dining Court', latitude: 40.4274, longitude: -86.9171 },
];


// Route to calculate distances from user's location to dining halls
router.post('/get-distances', async (req, res) => {
    const { latitude, longitude } = req.body; // User's current location sent from the client


    try {
        // Construct Google Distance Matrix API request
        const destinations = diningHalls.map(hall => `${hall.latitude},${hall.longitude}`).join('|');
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${latitude},${longitude}&destinations=${destinations}&mode=walking|driving&key=${API_KEY}`;


        const response = await axios.get(url);
        const distances = response.data.rows[0].elements;


        // Attach distances (walking and driving) to dining hall data
        const diningHallWithDistances = diningHalls.map((hall, index) => ({
            ...hall,
            walkingDistance: distances[index].distance.text, // Walking distance
            drivingDistance: distances[index].duration.text // Driving distance
        }));


        res.json(diningHallWithDistances);
    } catch (error) {
        console.error('Error fetching distances:', error);
        res.status(500).send('Error calculating distances');
    }
});


export default router;
