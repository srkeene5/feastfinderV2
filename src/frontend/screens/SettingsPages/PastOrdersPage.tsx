// src/frontend/screens/SettingsPages/PastOrdersPage.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import { useNavigate } from 'react-router-dom';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import CoreButton from '../CoreComponents/CoreButton.tsx';
import { API_BASE_URL } from '../../../config.js'; // Adjust the path as necessary
import CoreStyles from '../CoreComponents/CoreStyles.tsx';

const PastOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const { ffColors } = CoreStyles();
  const styles = CoreStyles().pastOrderPageStyles

  useEffect(() => {
    if (!user) {
      navigate('/account/login');
      return;
    }
    const fetchCarts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cartroute/mycarts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCarts(data.carts);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    fetchCarts();
  }, [user, navigate]);

  const handleSearchRestaurant = async (restaurantName: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/searchRestaurant?name=${encodeURIComponent(restaurantName)}`
      );

      if (response.ok) {
        const results = await response.json();
        navigate('/Search', { 
          state: { 
            search: restaurantName, 
            results, 
            searchType: 'restaurant', 
            deliveryService: '', 
            cuisine: '', 
            timeRanges: [] 
          } 
        });
      } else {
        console.log('No results found');
        navigate('/Search', { 
          state: { 
            search: restaurantName, 
            results: [], 
            searchType: 'restaurant', 
            deliveryService: '', 
            cuisine: '', 
            timeRanges: [], 
            errorText: 'No results found' 
          } 
        });
      }
    } catch (error) {
      console.error('Error searching for restaurant:', error);
      navigate('/Search', { 
        state: { 
          search: restaurantName, 
          results: [], 
          searchType: 'restaurant', 
          deliveryService: '', 
          cuisine: '', 
          timeRanges: [], 
          errorText: 'Error fetching results' 
        } 
      });
    }
  };

  return (
    <div style={{ backgroundColor: ffColors.ffBackground, minHeight: '100vh' }}>
      <CoreBanner />
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, marginBottom: 20, color: ffColors.ffHeading }}>Past Orders</h1>
        {carts.length === 0 ? (
          <p style={{color: ffColors.ffBody}}>No past orders found.</p>
        ) : (
          carts.map((cart, index) => (
            <div key={cart._id || index} style={styles.orderCard}>
              <h2 style={{ fontSize: 20, marginBottom: 5, color: ffColors.ffHeading }}>
                Order from {cart.restaurant.restaurantName}
              </h2>
              <p style={{ margin: 0, color: ffColors.ffBody }}>
                Address: {cart.restaurant.address || 'Address not available'}
              </p>
              <p style={{ margin: '5px 0', color: ffColors.ffBody }}>
                Ordered on {new Date(cart.createdAt).toLocaleDateString()} at{' '}
                {new Date(cart.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p style={{ margin: '5px 0', color: ffColors.ffBody }}>
                Service used: {cart.service.charAt(0).toUpperCase() + cart.service.slice(1)}
              </p>
              <ul>
                {cart.items.map((item, idx) => (
                  <li key={idx} style={{color: ffColors.ffBody}}>
                    {item.item} x {item.quantity}
                    {item.options.map((option, i) => (
                      <li key={i} style={{color: ffColors.ffBody, marginLeft:8, fontSize: 12}}>
                        {option.optionName}
                      </li>
                    ))}
                  </li>
                ))}
              </ul>
              <p style={{color: ffColors.ffBody}}>Total: ${cart.total.toFixed(2)}</p>
              <CoreButton
                pressFunc={() => handleSearchRestaurant(cart.restaurant.restaurantName)}
                bText="View Restaurant"
                buttonColor={ffColors.ffBlueD}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PastOrdersPage;
