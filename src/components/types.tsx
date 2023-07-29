export type AppState = {
  cart: {
    cartItems: CartItem[];
    total: number;
  };
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
