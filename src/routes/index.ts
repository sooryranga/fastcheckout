import {NavigatorScreenParams} from '@react-navigation/native';

export type Routes = {
  Permissions: undefined;
  Home: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  Camera: undefined;
  Profile: undefined;
  Cart: undefined;
};
