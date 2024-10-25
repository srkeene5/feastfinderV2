// src/types/Cart.ts
export interface CartItem {
    item: string;
    price: number;
    quantity: number;
  }
  
  export interface Restaurant {
    restaurantID: string;
    restaurantName: string;
    restaurantAddress: string;
    distance: number;
    menu: string[];
    ubereatsMenuPrice: number[];
    doordashMenuPrice: number[];
    grubhubMenuPrice: number[];
    uberEatsAvailable: boolean;
    doordashAvailable: boolean;
    grubhubAvailable: boolean;
  }
  
  export interface CartEntry {
    restaurant: Restaurant;
    service: string;
    items: CartItem[];
    total: number;
    quantities: number[];
  }
  
  export interface CartContextType {
    cart: CartEntry[];
    updateCartEntry: (updatedEntry: CartEntry) => void;
    clearCart: () => void;
  }
  