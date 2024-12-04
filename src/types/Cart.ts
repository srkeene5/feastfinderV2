// src/types/Cart.ts
export interface Option {
  optionName: string,
  optionPrice: number,
}

export interface OptionIndex {
  required: number[],
  optional: number[],
}

export interface CartItem {
  item: string;
  quantity: number;
  options: Option[];
  optionIndex: OptionIndex
  priceChange: number;
  prices: {
    doordash: number;
    ubereats: number;
    grubhub: number;
  };
}

export interface CartEntry {
  restaurant: any; // Replace 'any' with the appropriate type if available
  items: CartItem[];
  service: string;
  total: number;
  discount?: number;
}
