import {View} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

const IconInCircle = ({
  circleSize,
  borderWidth = 2,
  borderColor = 'black',
  ...props
}) => (
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
    }}>
    <IconFA {...props} />
  </View>
);

export {IconInCircle};
