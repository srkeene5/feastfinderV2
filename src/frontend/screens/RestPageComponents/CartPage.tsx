// src/frontend/screens/RestPageComponents/CartPage.tsx
import React from 'react';
import axios from 'axios';
import { View, Text, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../UserComponents/Authorizer.tsx';
import { useCart } from './CartContext.tsx';


const CartPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  // Calculate cart total (sum of all restaurant totals)
  const cartTotal = cart.reduce((acc, entry) => acc + entry.total, 0);

  // Function to handle navigating back to the restaurant page while keeping cart items
  const handleBackToRestaurant = () => {
    if (cart.length === 0) {
      navigate('/home');
    } else {
      const lastRestaurant = cart[cart.length - 1];
      navigate('/restaurant', {
        state: {
          restaurant: lastRestaurant.restaurant,
          service: lastRestaurant.service,
        },
      });
    }
  };

  // Function to handle checkout and save cart to the backend
  const handleCheckout = async () => {
    try {
      const token = user?.token; // Retrieve the token from AuthContext

      if (!token) {
        alert('You must be logged in to checkout.');
        return;
      }

      // Log cart data being sent to backend
      console.log('Cart data being sent to backend:', cart);

      const response = await axios.post(
        'http://localhost:5001/api/cartroute/checkout',
        {
          restaurants: cart, // Ensure this matches the backend's schema
          cartTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert(`Cart saved successfully! Cart ID: ${response.data.cartID}`);
        clearCart(); // Clear the cart after successful checkout
        navigate('/home'); // Navigate to home or order confirmation page
      } else {
        alert('Failed to save cart');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Error during checkout');
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your Cart</Text>
      {cart.map((entry, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {entry.restaurant.restaurantName} - {entry.service}
          </Text>
          {entry.items.map((item, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
            >
              <Text>
                {item.item} (x{item.quantity})
              </Text>
              <Text>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Restaurant Total: ${entry.total.toFixed(2)}
          </Text>
        </View>
      ))}
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Cart Total: ${cartTotal.toFixed(2)}
      </Text>

      {/* Back to Restaurant Button */}
      <Button title="Back to Restaurant" onPress={handleBackToRestaurant} />

      {/* Proceed to Checkout Button */}
      <Button title="Proceed to Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CartPage;
