// src/frontend/screens/RestPageComponents/RestPage.tsx

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx'; // Adjust the path as necessary
import {Image} from 'react-native';
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
  image: string; //will adjust based on how the API is set up
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, price, quantity, image, onAdd, onRemove }) => {
  return (
    <li className="flex items-center justify-between p-4 mb-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* flex justify-between items-center p-4 border-b border-gray-200 space-x-8 */}
      <div>
        <img
              src={require('../images/testDish.png')} 
              //require is used for static images (can't use variable). But, we can set it up with {uri: path} later potentially
              style={{
                height: 100,
                width: 150,
                borderRadius: 10,
              }}

              className="w-20 h-20 object-cover rounded shadow-sm"
          />
        </div>
       <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item}</h3>
        <p className="text-lg font-bold text-green-600">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <button 
          onClick={onRemove} 
          disabled={quantity <= 0}
          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full disabled:opacity-50 hover:bg-red-600 transition duration-200 ease-in-out"
        >
          -
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button 
          onClick={onAdd}
          className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200 ease-in-out"
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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const totalItems = restaurant.menu.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  // Page logic

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages - 1) return prevPage + 1;
      if (direction === 'prev' && prevPage > 0) return prevPage - 1;
      return prevPage;
    });
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedMenuItems = restaurant.menu.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="bg-gray-100">
      <CoreBanner />
      <div style={styles.account} className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6 mx-auto">
        {/* <h2 style={coreStyles.headingText}>Service: {service}</h2>
        <h2 style={coreStyles.headingText}>
          Restaurant Name: {restaurant.restaurantName}
        </h2>
        <h2 style={coreStyles.headingText}>
          Restaurant ID: {restaurant.restaurantID}
        </h2> */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {restaurant.restaurantName} Menu
        </h1>
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {paginatedMenuItems.map((item: string, index: number) => {
              const actualIndex = currentPage * itemsPerPage + index;
              return (
              <MenuItem
                key={actualIndex}
                item={item}
                price={prices[actualIndex]}
                quantity={quantities[actualIndex]}
                image={'../images/testDish.png'}
                onAdd={() => handleAdd(actualIndex)}
                onRemove={() => handleRemove(actualIndex)}
              />
              );
            })}
          
          </ul>
        </div>
        <div className="flex justify-between items-center sticky bottom-0 w-full bg-white p-4 mt-6 border-t border-gray-200">
          
          {/* Checkout Button */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Total: ${cartTotal.toFixed(2)}
            </h3>
            <button
              onClick={handleViewCart}
              disabled={quantities.every((quantity) => quantity === 0)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:opacity-50 hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              View Cart
            </button>
            
            
          </div>
          {/* Vertical Line */}
          <div className="h-20 border-l border-gray-300 mx-4"></div>
          {/* Pagination Controls */}
          <div className=" space-x-4 mt-4 mx-auto">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              Previous
            </button>
            <span className="text-lg font-medium">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              Next
            </button>
          </div>
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
