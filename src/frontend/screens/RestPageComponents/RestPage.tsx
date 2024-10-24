// src/frontend/screens/RestPageComponents/RestPage.tsx

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx'; // Adjust the path as necessary

// Components
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { coreStyles, ffColors } from '../CoreComponents/CoreStyles.tsx';

// Navigation
import { useLocation, useNavigate } from 'react-router-dom';

// Define the MenuItem component
interface MenuItemProps {
  item: string;
  price: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, price, quantity, onAdd, onRemove }) => {
  return (
    <li className="flex justify-between items-center p-4 border-b border-gray-200 space-x-8">
      <span className="text-lg font-medium text-gray-800">{item}</span>
      <span className="text-lg font-semibold text-green-600">
        ${price.toFixed(2)}
      </span>
      <div className="flex space-x-2">
        <button 
          onClick={onRemove} 
          disabled={quantity <= 0}
          className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
        >
          -
        </button>
        <span>{quantity}</span>
        <button 
          onClick={onAdd}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
    </li>
  );
};

export default function RestPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from navigation state
  const { restaurant, service } = location.state || {};
  const { cart, updateCartEntry } = useCart();

  // Initialize state with safe defaults
  const [quantities, setQuantities] = useState<number[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Prices setup based on service
  let prices: number[] = [];

  // Find existing cart entry for this restaurant (safe check)
  const existingCartEntry = restaurant
    ? cart.find(
        (entry) =>
          entry.restaurant.restaurantID === restaurant.restaurantID &&
          entry.service === service
      )
    : null;

  // useEffect to update state based on existing cart entry
  useEffect(() => {
    if (restaurant && restaurant.menu) {
      if (existingCartEntry) {
        setQuantities(existingCartEntry.quantities);
        setCartTotal(existingCartEntry.total);
      } else {
        setQuantities(Array(restaurant.menu.length).fill(0));
        setCartTotal(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingCartEntry, restaurant]);

  // Early return after hooks
  if (!restaurant || !restaurant.menu) {
    return <div>Error: Restaurant data is missing!</div>;
  }

  // Set up prices based on the selected service
  switch (service) {
    case 'DoorDash':
      prices = restaurant.doordashMenuPrice;
      break;
    case 'UberEats':
      prices = restaurant.ubereatsMenuPrice;
      break;
    case 'GrubHub':
      prices = restaurant.grubhubMenuPrice;
      break;
    default:
      console.log("Invalid service or service's prices not available");
  }

  // Cart logic
  const handleAdd = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    setCartTotal(cartTotal + prices[index]);
  };

  const handleRemove = (index: number) => {
    if (quantities[index] > 0) {
      const newQuantities = [...quantities];
      newQuantities[index]--;
      setQuantities(newQuantities);
      setCartTotal(cartTotal - prices[index]);
    }
  };

  const handleViewCart = () => {
    const selectedItems = restaurant.menu
      .map((item, index) => ({
        item,
        price: prices[index],
        quantity: quantities[index],
      }))
      .filter((item) => item.quantity > 0);

    const newCartEntry = {
      restaurant: restaurant, // Ensure this is an object, not a string
      service: service,
      items: selectedItems,
      total: cartTotal,
      quantities: quantities,
    };

    // Update the cart in the Cart Context
    updateCartEntry(newCartEntry);

    // Navigate to cart without passing cart state
    navigate('/cart');
  };

  return (
    <div>
      <CoreBanner />
      <div style={styles.account}>
        <h2 style={coreStyles.headingText}>Service: {service}</h2>
        <h2 style={coreStyles.headingText}>
          Restaurant Name: {restaurant.restaurantName}
        </h2>
        <h2 style={coreStyles.headingText}>
          Restaurant ID: {restaurant.restaurantID}
        </h2>

        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {restaurant.restaurantName} Menu
          </h1>
          <ul className="divide-y divide-gray-200">
            {restaurant.menu.map((item: string, index: number) => (
              <MenuItem
                key={index}
                item={item}
                price={prices[index]}
                quantity={quantities[index]}
                onAdd={() => handleAdd(index)}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </ul>
        </div>
        {/* Checkout button */}
        <div style={{ paddingTop: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 'bold' }}>
            Total: ${cartTotal.toFixed(2)}
          </h3>
        </div>
        <div style={{ paddingTop: 20 }}>
          <button
            onClick={handleViewCart}
            disabled={quantities.every((quantity) => quantity === 0)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  account: {
    padding: '16px',
  },
};
