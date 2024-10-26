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

  if (!cart) {
    return (
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your Cart is Empty</Text>
        <Button title="Back to Home" onPress={() => navigate('/home')} />
      </View>
    );
  }

  // Function to handle navigating back to the restaurant page
  const handleBackToRestaurant = () => {
    navigate('/restaurant', {
      state: {
        restaurant: cart.restaurant,
        service: cart.service,
      },
    });
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
          restaurant: cart.restaurant,
          items: cart.items,
          cartTotal: cart.total,
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
      alert('Error during checkout');
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Your Cart</Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {cart.restaurant.restaurantName} - {cart.service}
        </Text>
        {cart.items.map((item, idx) => (
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
          Cart Total: ${cart.total.toFixed(2)}
        </Text>
      </View>

      {/* Back to Restaurant Button */}
      <Button title="Back to Restaurant" onPress={handleBackToRestaurant} />

      {/* Proceed to Checkout Button */}
      <Button title="Proceed to Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CartPage;

