
import express from 'express';
import Restaurant from '../models/Restaurant.js';  // Import Restaurant model

const router = express.Router();


// restaurantAuth.js


router.get('/searchRestaurant', async (req, res) => {
    const { name, dish, cuisineType, operatingHours, deliveryService } = req.query;

    try {
        let query = {};

        if (name) {
            query.restaurantName = new RegExp(name, 'i');
        }

        if (dish) {
            const searchTerm = dish.toLowerCase();
            query.menu = { $elemMatch: { $regex: new RegExp(searchTerm, 'i') } };
        }

        if (cuisineType && cuisineType !== 'All Cuisines') {
            query.cuisineType = cuisineType;
        }

        if (operatingHours) {
            const operatingHoursArray = operatingHours.split(',');

            if (operatingHoursArray.includes('All Day')) {
                // User selected 'All Day', include restaurants where 'All Day' is in operatingHours
                query.operatingHours = { $in: ['All Day'] };
            } else {
                // Include restaurants where operatingHours includes any of the selected time ranges or 'All Day'
                query.operatingHours = { $in: operatingHoursArray.concat('All Day') };
            }
        }

        if (deliveryService && deliveryService !== 'All Services') {
            if (deliveryService === 'UberEats') {
                query.ubereatsAvailable = true;
            } else if (deliveryService === 'Grubhub') {
                query.grubhubAvailable = true;
            } else if (deliveryService === 'DoorDash') {
                query.doordashAvailable = true;
            }
        }

        const restaurants = await Restaurant.find(query);

        if (!restaurants.length) {
            return res.status(404).json({ message: 'No restaurants found' });
        }

        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// router.get('/searchRestaurant', async (req, res) => {
//     const { name, dish } = req.query;

//     try {
//         let restaurants;

//         if (name) {
//             // Search for restaurants by name
//             restaurants = await Restaurant.find({ restaurantName: new RegExp(name, 'i') });
//         } else if (dish) {
//             // Search for restaurants offering the dish
//             const searchTerm = dish.toLowerCase();
//             restaurants = await Restaurant.find({
//                 menu: { $elemMatch: { $regex: new RegExp(searchTerm, 'i') } }
//             });
//         } else {
//             return res.status(400).json({ message: 'Please provide a restaurant name or dish to search' });
//         }

//         if (!restaurants.length) {
//             return res.status(404).json({ message: 'No restaurants found' });
//         }

//         res.json(restaurants);
//     } catch (error) {
//         console.error('Error fetching restaurants:', error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// In restaurantAuth.js or a similar route file
router.get('/popularRestaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();  // Query your database for popular restaurants
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});




router.get('/searchDish', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ msg: 'Please provide a dish name to search' });
    }

    const searchTerm = name.toLowerCase();
    const results = {}; // Use an object to store unique dishes by normalized dish name

    try {
        const restaurants = await Restaurant.find();

        restaurants.forEach((restaurant) => {
            restaurant.menu.forEach((dishName, index) => {
                if (dishName.toLowerCase().includes(searchTerm)) {
                    // Normalize the dish name
                    const normalizedDishName = dishName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');

                    if (!results[normalizedDishName]) {
                        results[normalizedDishName] = {
                            dishName: dishName,
                            // Since multiple restaurants have this dish, we can list all restaurant names
                            restaurantNames: [restaurant.restaurantName],
                            image: restaurant.menuItemImages[index],
                            ubereatsAvailable: restaurant.ubereatsAvailable,
                            doordashAvailable: restaurant.doordashAvailable,
                            grubhubAvailable: restaurant.grubhubAvailable,
                            // Other fields as needed
                        };
                    } else {
                        // If the dish already exists, add the restaurant name to the list
                        results[normalizedDishName].restaurantNames.push(restaurant.restaurantName);
                    }
                }
            });
        });

        const resultsArray = Object.values(results);

        if (resultsArray.length === 0) {
            return res.status(404).json({ msg: 'No dishes found matching your search' });
        }

        res.json(resultsArray);
    } catch (error) {
        console.error('Error fetching dishes:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;