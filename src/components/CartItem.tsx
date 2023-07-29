import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {IconInCircle} from '../screens/AddSubicon';
import type {CartItem} from '@app/components/types';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const RenderCartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  const handleIncrement = () => {
    onIncrement(id);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onDecrement(id);
    } else {
      onRemove(id);
    }
  };

  return (
    <View style={styles.cartItems}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{uri: image}} />
      </View>
      <View style={styles.nameContainer}>
        <View style={styles.titleContainer}>
          <Text adjustsFontSizeToFit={true} style={styles.title}>
            {name}
          </Text>
        </View>
        <Text style={styles.subtitle}>Other stuff</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.counter}>
          <Pressable onPress={handleDecrement}>
            {() => (
              <IconInCircle
                name="-"
                size={10}
                color="black"
                borderWidth={1}
                circleSize={20}
              />
            )}
          </Pressable>
          <Text style={styles.count}>{quantity}</Text>
          <Pressable onPress={handleIncrement}>
            {() => (
              <IconInCircle
                name="+"
                size={10}
                color="black"
                borderWidth={1}
                circleSize={20}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItems: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBox: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  image: {
    width: 116,
    height: 116,
    resizeMode: 'cover',
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 5,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: 5,
    fontSize: 23,
    fontWeight: '800',
    color: '#202020',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#909090',
  },
  counter: {
    flexDirection: 'row',
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  count: {
    width: 35,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '900',
    color: '#202020',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'right',
    marginTop: 10,
  },
});

export {RenderCartItem, CartItem, CartItemProps};
