import React from 'react';
import {View, Text} from 'react-native';

const IconInCircle = ({
  circleSize = 1,
  borderWidth = 2,
  borderColor = 'black',
  ...props
}) => {
  return (
    <View
      style={{
        width: circleSize,
        height: circleSize,
        borderRadius: 0.99 * circleSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor,
        borderWidth,
        backgroundColor: '#d9d9d9',
      }}>
      <Text>{props.name}</Text>
    </View>
  );
};

export {IconInCircle};
