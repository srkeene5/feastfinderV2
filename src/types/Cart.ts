// src/types/Cart.ts

export interface CartItem {
  item: string;
  quantity: number;
  prices: {
    doordash: number;
    ubereats: number;
    grubhub: number;
  };
}

export interface CartEntry {
  restaurant: any; // Replace 'any' with the appropriate type if available
  items: CartItem[];
  quantities: number[];
  service: string;
  total: number;
}
