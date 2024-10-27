// src/frontend/screens/CartPageComponents/CartPage.tsx

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx'; // Corrected path
import CoreBanner from '../CoreComponents/CoreBanner.tsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../../types/Cart'; // Adjusted path

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart(); // Destructure clearCart from useCart
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/home');
    }
  }, [cart, navigate]);

  // Function to calculate total for a specific service
  const calculateServiceTotal = (service: string) => {
    return cart.items.reduce((total: number, item: CartItem) => {
      const price = item.prices[service.toLowerCase()];
      return total + price * item.quantity;
    }, 0);
  };

  // Function to handle checkout
  const handleCheckout = async (serviceName: string) => {
    // Call the backend to store the cart
    const success = await createCartInDatabase({ ...cart, service: serviceName });

    if (success) {
      // Set the selected service and show the success modal
      setSelectedService(serviceName);
      setShowSuccessModal(true);
    }
  };

  // Function to get the URL for a specific service
  const getServiceURL = (serviceName: string) => {
    switch (serviceName) {
      case 'UberEats':
        return 'https://www.ubereats.com';
      case 'DoorDash':
        return 'https://www.doordash.com';
      case 'Grubhub':
        return 'https://www.grubhub.com';
      default:
        return '#';
    }
  };

  // Function to create the cart in the database
  const createCartInDatabase = async (cartData: any): Promise<boolean> => {
    try {
      // Retrieve the 'user' object from localStorage
      const userData = localStorage.getItem('user');

      if (!userData) {
        console.error('No user data found in localStorage.');
        alert('You are not logged in. Please log in to proceed.');
        return false;
      }

      // Parse the JSON string to an object
      const user = JSON.parse(userData);

      // Extract the token
      const token = user.token;

      if (!token) {
        console.error('No token found in user data.');
        alert('Authentication token is missing. Please log in again.');
        return false;
      }

      console.log('Using token:', token); // Debugging line

      // Make the POST request with the correct token
      const response = await fetch('http://localhost:5001/api/cartroute/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response from server:', data);
        alert(`Error: ${data.message}`);
        return false;
      }

      console.log('Cart saved:', data);
      // Remove the alert, handled by the modal
      return true;
    } catch (error: any) { // TypeScript requires a type for 'error'
      console.error('Error saving cart:', error);
      alert('An unexpected error occurred while saving the cart.');
      return false;
    }
  };

  // Prevent rendering if cart is empty (handled by useEffect)
  if (!cart || !cart.items || cart.items.length === 0) {
    return null; // Or a loading spinner if desired
  }

  return (
    <div>
      <CoreBanner />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* Services Sections */}
        {['DoorDash', 'UberEats', 'Grubhub'].map((service) => {
          const serviceAvailable = cart.restaurant[`${service.toLowerCase()}Available`];
          const serviceTotal = calculateServiceTotal(service);

          return (
            <div key={service} className="border p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">{service}</h2>
              {serviceAvailable ? (
                <>
                  {/* Display selected items and prices */}
                  <ul>
                    {cart.items.map((item: CartItem, index: number) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.item} x {item.quantity}
                        </span>
                        <span>
                          $
                          {(
                            item.prices[service.toLowerCase()] * item.quantity
                          ).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-bold mt-2">
                    <span>Total:</span>
                    <span>${serviceTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => handleCheckout(service)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    Checkout with {service}
                  </button>
                </>
              ) : (
                <p>Not Available</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Success Modal */}
      {showSuccessModal && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Checkout Successful!</h2>
            <p>You can proceed to {selectedService} to place your order.</p>
            <button
              onClick={() => {
                window.open(getServiceURL(selectedService), '_blank');
                clearCart();
                navigate('/home');
              }}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

