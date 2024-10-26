// src/frontend/screens/RestPageComponents/CartContext.tsx

import React, { createContext, useContext, useState } from 'react';
import { CartEntry } from '../../../types/Cart'; // Ensure this interface is updated

interface CartContextType {
  cart: CartEntry | null;
  updateCart: (updatedCart: CartEntry) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};

// Define the props type for CartContextProvider
interface CartContextProviderProps {
  children: React.ReactNode;
}

// CartContextProvider component
export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartEntry | null>(null);

  const updateCart = (updatedCart: CartEntry) => {
    // If there's an existing cart, check if the restaurant matches
    if (cart && cart.restaurant.restaurantID !== updatedCart.restaurant.restaurantID) {
      alert('You can only have items from one restaurant in your cart. Please clear your cart to add items from a different restaurant.');
      return;
    }
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart(null);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

