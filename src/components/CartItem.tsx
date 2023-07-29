import React, {useState} from 'react'

import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
import {IconInCircle} from '../screens/AddSubicon'

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

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
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleIncrement = () => {
    setLocalQuantity(localQuantity + 1);
    onIncrement(id);
  };

  const handleDecrement = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
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
      <View style={styles.detailsContainer}>
        <Text adjustsFontSizeToFit={true} style={styles.title}>
          {name}
        </Text>
        <Text style={styles.subtitle}>Other stuff</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.counter}>
          <Pressable onPress={handleDecrement}>
            {({pressed}) => (
              <IconInCircle
                name="minus"
                size={10}
                color="black"
                borderWidth={1}
                circleSize={20}
              />
            )}
          </Pressable>
          <Text style={styles.count}>{quantity}</Text>
          <Pressable onPress={handleIncrement}>
            {({pressed}) => (
              <IconInCircle
                name="plus"
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
    margin: 'auto',
    marginBottom: '20px',
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBox: {
    width: '25%',
  },
  detailsContainer: {
    height: 100,
    width: '40%',
    alignItems: 'center',
  },
  title: {
    paddingTop: 5,
    fontSize: 20,
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
    margin: 10,
  },
  btn: {
    width: '40px',
    height: '40px',
    backgroundColor: '#d9d9d9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: '#202020',
  },
  count: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
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
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  image: {
    display: 'flex',
    bottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 70,
    height: 70,
    resizeMode: 'cover',
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
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export {RenderCartItem, CartItem, CartItemProps};
