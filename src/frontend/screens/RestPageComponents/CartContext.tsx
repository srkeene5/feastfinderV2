// src/frontend/screens/RestPageComponents/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { CartEntry } from '../../../types/Cart'; // Define proper TypeScript interfaces in a separate file

interface CartContextType {
  cart: CartEntry[];
  updateCartEntry: (updatedEntry: CartEntry) => void;
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
  const [cart, setCart] = useState<CartEntry[]>([]);

  const updateCartEntry = (updatedEntry: CartEntry) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (entry) =>
          entry.restaurant.restaurantID === updatedEntry.restaurant.restaurantID &&
          entry.service === updatedEntry.service
      );
      if (index >= 0) {
        const newCart = [...prevCart];
        newCart[index] = updatedEntry;
        return newCart;
      } else {
        return [...prevCart, updatedEntry];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, updateCartEntry, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
