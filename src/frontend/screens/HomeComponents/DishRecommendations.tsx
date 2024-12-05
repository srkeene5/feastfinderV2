import React, { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config.js';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import CoreStyles from '../CoreComponents/CoreStyles.tsx';

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
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { coreStyles, scrollableStyleX, popularCardsStyles, coreForm } = CoreStyles();

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
            const recommendedDishes: any = [];

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

  const handlePop = async (names: string[]) => {
    if (names && names.length > 0) {
      const name = names[0];

      console.log("Searching for: " + name);
      try {
        const response = await fetch(`${API_BASE_URL}/api/searchRestaurant?name=` + encodeURIComponent(name));

        if (response.ok) {
          const results = await response.json();
          console.log('Restaurants Found:', results);
          navigate('/Search', {
            state: {
              search: name,
              results: results,
              searchType: 'restaurant',
              deliveryService: '',
              errorText: ''
            }
          });
        } else {
          console.log('No restaurants found');
          navigate('/Search', {
            state: {
              search: name,
              results: [],
              searchType: 'restaurant',
              deliveryService: '',
              errorText: 'No restaurants found'
            }
          });
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        navigate('/Search', {
          state: {
            search: name,
            results: [],
            searchType: 'restaurant',
            deliveryService: '',
            errorText: 'Error fetching restaurant'
          }
        });
      }
    } else {
      console.error('Error fetching restaurant:', error);
      navigate('/Search', {
        state: {
          search: 'Failed to Find Restaurant',
          results: [],
          searchType: 'restaurant',
          deliveryService: '',
          errorText: 'Error fetching restaurant'
        }
      });
    }
  }

  if (loading) return <div className="p-4" style={coreStyles.headingText}>Loading recommendations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!dishes.length) return <div className="p-4">No dishes found</div>;

  return (
    <div className="pb-4">
      <h2 className="text-xl font-bold mb-4" style={coreStyles.headingText}>Recommended for You:</h2>
      <div style={{ ...scrollableStyleX, ...popularCardsStyles.scrollCards }}>
        <div className="flex pb-4" style={{ width: 'max-content' }}>
          {dishes.map((dish, index) => (
            <Pressable
              key={index}
              style={popularCardsStyles.container}
              onPress={() => { handlePop(dish.restaurantNames) }}
            >
              <div style={popularCardsStyles.card}>
                <img
                  src={dish.image || "/api/placeholder/300/200"}
                  alt={dish.dishName}
                  style={popularCardsStyles.cardImage}
                />
                <h3 className="font-semibold text-base truncate" style={coreForm.subheader}>{dish.dishName}</h3>
                <div style={coreForm.body}>
                  <p className="text-gray-600 text-sm truncate" style={coreForm.text}>at {dish.restaurantNames[0]}</p>
                </div>
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishRecommendations;