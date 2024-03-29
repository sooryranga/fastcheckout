import React from 'react';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabParamList, Routes} from '@app/routes';
import {Container, Heading, Text} from 'native-base';
import {View, StyleSheet, FlatList} from 'react-native';
import {CartScreenProps, CartScreen} from '@app/components/Cart';

type CartPageNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Cart'>,
  NativeStackScreenProps<Routes>
>;
export function CartPage({}: CartPageNavigationProp) {
  const cartItemsIN: CartScreenProps = {
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
  };
  return <CartScreen props={cartItemsIN} />;
}
