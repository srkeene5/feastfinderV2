// src/frontend/screens/RestPageComponents/RestPage.tsx

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext.tsx'; // Adjust the path as necessary
import CoreBanner from '../CoreComponents/CoreBanner.tsx';
import { coreStyles } from '../CoreComponents/CoreStyles.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal.tsx'; // Import the ConfirmModal

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
      <span className="text-lg font-semibold text-green-600">${price.toFixed(2)}</span>
      <div className="flex space-x-2">
        <button
          onClick={onRemove}
          disabled={quantity <= 0}
          className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={onAdd} className="px-2 py-1 bg-green-500 text-white rounded">
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
  const [cartTotal, setCartTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  let prices: number[] = [];

  useEffect(() => {
    if (restaurant && restaurant.menu) {
      if (cart && cart.restaurant.restaurantID === restaurant.restaurantID) {
        setQuantities(cart.quantities);
        setCartTotal(cart.total);
      } else if (cart && cart.restaurant.restaurantID !== restaurant.restaurantID) {
        setShowModal(true);
      } else {
        setQuantities(Array(restaurant.menu.length).fill(0));
        setCartTotal(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, restaurant]);

  if (!restaurant || !restaurant.menu) {
    return <div>Error: Restaurant data is missing!</div>;
  }

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
      restaurant: restaurant,
      service: service,
      items: selectedItems,
      total: cartTotal,
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

  return (
    <div>
      <CoreBanner />
      <div style={styles.account}>
        <h2 style={coreStyles.headingText}>Service: {service}</h2>
        <h2 style={coreStyles.headingText}>Restaurant Name: {restaurant.restaurantName}</h2>
        <h2 style={coreStyles.headingText}>Restaurant ID: {restaurant.restaurantID}</h2>

        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{restaurant.restaurantName} Menu</h1>
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
        <div style={{ paddingTop: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 'bold' }}>Total: ${cartTotal.toFixed(2)}</h3>
        </div>
        <div style={{ paddingTop: 20 }}>
          <button
            onClick={handleViewCart}
            disabled={quantities.every((quantity) => quantity === 0)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            View Cart
          </button>
          <button onClick={handleSwitchRestaurant} className="px-4 py-2 bg-red-500 text-white rounded ml-4">
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





