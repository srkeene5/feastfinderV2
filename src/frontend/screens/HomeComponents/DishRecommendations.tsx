import React, { useState, useEffect } from 'react';
import { useCart } from '../RestPageComponents/CartContext.tsx';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config.js';
import { useAuth } from '../UserComponents/Authorizer.tsx';


interface Dish {
    dishName: string;
    restaurantNames: string[];
    image?: string;
    ubereatsAvailable: boolean;
    doordashAvailable: boolean;
    grubhubAvailable: boolean;
  }

const DishRecommendations = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, updateCart } = useCart();
  const navigate = useNavigate();
  const {user} = useAuth();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        // Step 1: Fetch recently ordered dishes
        const recentDishesResponse = await fetch(`${API_BASE_URL}/api/cartroute/recent-dishes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`, // Adjust token handling as needed
          },
        });
  
        if (recentDishesResponse.ok) {
          const recentDishes = await recentDishesResponse.json();
  
          if (recentDishes.length > 0) {
            // Step 2: Fetch recommendations based on recently ordered dishes
            const recentDishNames = recentDishes.map((dish: any) => dish.dishName);
            const recommendedDishes = [];
  
            for (const dishName of recentDishNames) {
              const response = await fetch(`${API_BASE_URL}/api/searchDish?name=${encodeURIComponent(dishName)}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
  
              if (response.ok) {
                const data = await response.json();
                recommendedDishes.push(...data); // Combine results from multiple queries
              }
            }
  
            setDishes(recommendedDishes.slice(0, 8)); // Limit to 8 recommendations
            setError(null);
            return; // Exit early since we found recommendations
          }
        }
  
        // Step 3: Fallback to random dishes if no recent dishes found or API call fails
        console.log("step 3")
        const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        const randomDishesResponse = await fetch(`${API_BASE_URL}/api/searchDish?name=${randomLetter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (randomDishesResponse.ok) {
          const randomDishes = await randomDishesResponse.json();
          setDishes(randomDishes.slice(0, 8));
          setError(null);
        } else {
          setError('Failed to fetch random dishes.');
        }
      } catch (error) {
        console.error('Error fetching dishes:', error);
        setError('An error occurred while fetching dishes.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDishes();
  }, []);

  const handleAddToCart = (dish) => {
    // Find the restaurant object from the first restaurant in restaurantNames
    const restaurant = {
      restaurantName: dish.restaurantNames[0],
      ubereatsAvailable: dish.ubereatsAvailable,
      doordashAvailable: dish.doordashAvailable,
      grubhubAvailable: dish.grubhubAvailable,
    };

    const newItem = {
      item: dish.dishName,
      quantity: 1,
      prices: {
        ubereats: 10.99, // You'll need to add actual prices to your dish data
        doordash: 10.99,
        grubhub: 10.99
      }
    };

    const updatedCart = cart ? {
        ...cart,
        items: [...cart.items, newItem]
      } : {
        restaurant,
        items: [newItem],
        quantities: [1],              
        service: 'ubereats',         
        total: 10.99                 
      };
    
    updateCart(updatedCart);
    navigate('/cart');
  };

  if (loading) return <div className="p-4">Loading recommendations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!dishes.length) return <div className="p-4">No dishes found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended for you</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
          {dishes.map((dish, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden" style={{ width: '200px' }}>
              <img
                src={dish.image || "/api/placeholder/300/200"}
                alt={dish.dishName}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-base truncate">{dish.dishName}</h3>
                <p className="text-gray-600 text-sm truncate">at {dish.restaurantNames[0]}</p>
                <button 
                  className="mt-2 w-full bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700"
                  onClick={() => handleAddToCart(dish)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishRecommendations;