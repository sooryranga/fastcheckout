import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, remove} from '@app/constants/cartReducers';
import counterSlice from '@app/constants/cartReducers';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {RenderCartItem} from './CartItem';
import type {CartItem, AppState} from './types';

type CartScreenProps = {
  cartItems: CartItem[];
};

const CartScreen: React.FC = () => {
  const cartItems: CartItem[] = useSelector(
    (state: AppState) => state.cart.cartItems,
  );
  const dispatch = useDispatch();

  const renderItem = ({item}: {item: CartItem}) => {
    return (
      <RenderCartItem
        id={item.id}
        name={item.name}
        price={item.price}
        image={item.image}
        quantity={item.quantity}
        onRemove={id => dispatch(remove(id))}
        onIncrement={id => dispatch(increment(id))}
        onDecrement={id => dispatch(decrement(id))}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerColor}>
          <Text style={styles.headingStyles}>My Cart</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>
          $
          {cartItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 'auto',
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '14%',
  },
  headerColor: {
    width: '110%',
    height: '110%',
  },
  headingStyles: {
    marginTop: '5%',
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: '700',
    color: '#2F3841',
  },
  container: {
    padding: 5,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    boxShadow: '0px 25px 40px #1687d933',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  totalText: {
    paddingLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    paddingRight: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    display: 'flex',
    padding: 20,
    width: '100%',
    height: '80%',
  },
});

export {CartScreen, CartScreenProps};
