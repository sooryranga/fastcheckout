import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {CartItem, AppState} from '@app/components/types';

const initialState: AppState = {
  cart: {
    cartItems: [
      {
        id: '1',
        name: 'cookie',
        price: 10,
        image:
          'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
        quantity: 1,
      },
      {
        id: '2',
        name: 'cookie',
        price: 20,
        image:
          'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
        quantity: 1,
      },
      {
        id: '3',
        name: 'cookie is the best',
        price: 30,
        image:
          'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
        quantity: 1,
      },
      {
        id: '4',
        name: 'cookie is the best',
        price: 30,
        image:
          'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
        quantity: 1,
      },
      {
        id: '5',
        name: 'cookie is the best',
        price: 30,
        image:
          'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
        quantity: 1,
      },
      {
        id: '6',
        name: 'cookie is the best',
        price: 30,
        image:
          'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
        quantity: 1,
      },
    ],
    total: 6,
  },
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state, id: PayloadAction<String>) {
      state.cart.cartItems.map(item => {
        if (item.id === id.payload) {
          item.quantity += 1;
        }
      });
    },
    decrement(state, id: PayloadAction<String>) {
      state.cart.cartItems.map(item => {
        if (item.id === id.payload) {
          item.quantity -= 1;
        }
      });
    },
    remove(state, id: PayloadAction<String>) {
      state.cart.cartItems = state.cart.cartItems.filter(item => item.id !== id.payload);
    },
    add(state, cartItem: PayloadAction<CartItem>) {
      state.cart.cartItems.push(cartItem.payload);
      state.cart.total++;
    },
    addWithBarcode(state, barcode: PayloadAction<string>) {
      let itemNew = true;
      state.cart.cartItems.map(item => {
        if (item.id === barcode.payload) {
          item.quantity += 1;
          itemNew = false;
        }
      });
      if (itemNew === true) {
        state.cart.total++;
        state.cart.cartItems.push({
          id: barcode.payload,
          name: 'barcode: ' + barcode.payload,
          price: 30,
          image:
            'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2240,c_limit/chocolate-chip-cookie.jpg',
          quantity: 1,
        });
      }
    },
  },
});

export const {increment, decrement, remove, add} = counterSlice.actions;

export default counterSlice.reducer;
