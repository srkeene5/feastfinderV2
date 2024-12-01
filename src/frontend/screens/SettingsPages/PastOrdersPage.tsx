// // src/frontend/screens/SettingsPages/PastOrdersPage.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import { useNavigate } from 'react-router-dom';
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { API_BASE_URL } from '../../../config.js'; // Adjust the path as necessary

const PastOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

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

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <CoreBanner />
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>Past Orders</h1>
        {carts.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          carts.map((cart, index) => (
            <div key={cart._id || index} style={styles.orderCard}>
              <h2 style={{ fontSize: 20, marginBottom: 5 }}>
                Order from {cart.restaurant.restaurantName}
              </h2>
              <p style={{ margin: 0 }}>
                Address: {cart.restaurant.address || 'Address not available'}
              </p>
              <p style={{ margin: '5px 0' }}>
                Ordered on {new Date(cart.createdAt).toLocaleDateString()} at{' '}
                {new Date(cart.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p style={{ margin: '5px 0' }}>
                Service used: {cart.service.charAt(0).toUpperCase() + cart.service.slice(1)}
              </p>
              <ul>
                {cart.items.map((item, idx) => (
                  <li key={idx}>
                    {item.item} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ${cart.total.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  orderCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};

export default PastOrdersPage;

