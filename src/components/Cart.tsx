import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {RenderCartItem} from './CartItem';
import type {CartItem} from './CartItem';

type CartScreenProps = {
  cartItems: CartItem[];
};

const CartScreen: React.FC<{props: CartScreenProps}> = ({props}) => {
  const [items, setItems] = useState<CartItem[]>(props.cartItems);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleIncrementItem = (id: string) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    );
  };

  const handleDecrementItem = (id: string) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      }),
    );
  };

  const renderItem = ({item}: {item: CartItem}) => {
    return (
      <RenderCartItem
        id={item.id}
        name={item.name}
        price={item.price}
        image={item.image}
        quantity={item.quantity}
        onRemove={handleRemoveItem}
        onIncrement={handleIncrementItem}
        onDecrement={handleDecrementItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headingStyles}>My Cart</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.total}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>
          $
          {items
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
    width: '90%',
    height: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 70,
  },
  headingStyles: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2F3841',
  },
  container: {
    width: '99%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    boxShadow: '0px 25px 40px #1687d933',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export {CartScreen, CartScreenProps};
