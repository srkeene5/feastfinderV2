// src/frontend/screens/RestPageComponents/RestPage.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx'; // Corrected path
import CoreBanner from '../CoreComponents/CoreBanner.tsx'; // Corrected path
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal.tsx'; // Corrected path
import { CartItem, CartEntry } from '../../../types/Cart'; // Adjusted path

interface MenuItemProps {
  item: string;
  price: number;
  quantity: number;
  image: string; // Will adjust based on how the API is set up
  
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, price, quantity, image, onAdd, onRemove }) => {
  return (
    <li className="flex items-center justify-between p-4 mb-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div>
        <img
          //src={require('../images/testDish.png')}
          src={image} // Use the passed-in image prop
          alt="Dish image"
          style={{
            height: 100,
            width: 150,
            borderRadius: 10,
            objectFit: 'contain', // Ensures the entire image is visible within the box

          }}
          className="w-20 h-20 object-cover rounded shadow-sm"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item}</h3>
        <div className="flex items-center space-x-2 mt-1">
          {/* replace the condition with the deal. If there is a deal, then show that the price changed*/}
          {Number(price) > 5 && (
            <p className="text-sm font-medium text-gray-500 line-through">${(Number(price) * 1.2).toFixed(2)}</p>
          )}
          <p className="text-lg font-bold text-green-600">${price.toFixed(2)}</p>
        </div>
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
  const { restaurant, service } = location.state || {};
  const { cart, updateCart, clearCart } = useCart();

  const [quantities, setQuantities] = useState<number[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const totalItems = restaurant?.menu?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Prices setup based on service
  let prices: number[] = [];

  useEffect(() => {
    if (restaurant && restaurant.menu) {
      if (cart && cart.restaurant.restaurantID === restaurant.restaurantID) {
        setQuantities(cart.quantities);
        setCartTotal(cart.total || 0);
      } else if (cart && cart.restaurant.restaurantID !== restaurant.restaurantID) {
        setShowModal(true);
      } else {
        setQuantities(Array(restaurant.menu.length).fill(0));
        setCartTotal(0);
      }
    }
  }, [cart, restaurant]);

  if (!restaurant || !restaurant.menu) {
    return <div>Error: Restaurant data is missing!</div>;
  }

  const normalizedService = service.trim().toLowerCase();

  switch (normalizedService) {
    case 'doordash':
      prices = restaurant.doordashMenuPrice;
      break;
    case 'ubereats':
      prices = restaurant.ubereatsMenuPrice;
      break;
    case 'grubhub':
      prices = restaurant.grubhubMenuPrice;
      break;
    default:
      console.error("Invalid service or service's prices not available:", service);
      prices = Array(restaurant.menu.length).fill(0);
      break;
  }

  // Check if prices array is valid
  if (!prices || prices.length === 0) {
    console.error('Prices array is empty or undefined for the selected service:', service);
    prices = Array(restaurant.menu.length).fill(0);
  }

  // Page logic
  const handlePageChange = (direction: string) => {
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
    if (typeof prices[index] !== 'number') {
      console.error(`Price at index ${index} is undefined or not a number`);
      return;
    }
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    setCartTotal((prevTotal) => prevTotal + prices[index]);
  };

  const handleRemove = (index: number) => {
    if (quantities[index] > 0 && typeof prices[index] === 'number') {
      const newQuantities = [...quantities];
      newQuantities[index]--;
      setQuantities(newQuantities);
      setCartTotal((prevTotal) => prevTotal - prices[index]);
    } else {
      console.error(`Cannot remove item at index ${index}`);
    }
  };

  const handleViewCart = () => {
    const selectedItems: CartItem[] = restaurant.menu
      .map((item: string, index: number) => ({
        item,
        quantity: quantities[index],
        prices: {
          doordash: restaurant.doordashMenuPrice[index],
          ubereats: restaurant.ubereatsMenuPrice[index],
          grubhub: restaurant.grubhubMenuPrice[index],
        },
      }))
      .filter((item) => item.quantity > 0);

    const total = selectedItems.reduce(
      (acc, item) => acc + item.prices[normalizedService] * item.quantity,
      0
    );

    const newCartEntry: CartEntry = {
      restaurant: restaurant,
      service: service,
      items: selectedItems,
      total: total,
      quantities: quantities,
    };

    updateCart(newCartEntry);
    navigate('/cart');
  };

  const handleSwitchRestaurant = () => {
    clearCart();
    navigate('/home');
  };

  const handleConfirm = () => {
    clearCart();
    setQuantities(Array(restaurant.menu.length).fill(0));
    setCartTotal(0);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate('/home');
  };

  const displayTotal = isNaN(cartTotal) || cartTotal === undefined ? 0 : cartTotal;

  return (
    <div className="bg-gray-100">
      <CoreBanner />
      <div
        style={styles.account}
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6 mx-auto"
      >
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
                  image={restaurant.menuItemImages[actualIndex]} // Pass image directly
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
              Total: ${displayTotal.toFixed(2)}
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
          <div className="space-x-4 mt-4 mx-auto">
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
          {/* Vertical Line */}
          <div className="h-20 border-l border-gray-300 mx-4"></div>
          <button
            onClick={handleSwitchRestaurant}
            className="px-4 py-2 bg-red-500 text-white rounded ml-4"
          >
            Switch Restaurant
          </button>
        </div>
      </div>

      {/* Include the ConfirmModal */}
      <ConfirmModal
        isOpen={showModal}
        title="Switch Restaurants?"
        message={`You can only have items from one restaurant in your cart (currently from "${cart?.restaurant.restaurantName}"). Would you like to clear your cart to add items from "${restaurant.restaurantName}"?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

const styles = {
  account: {
    padding: '16px',
  },
};
