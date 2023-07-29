import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {CameraPage} from '@app/screens/CameraPage';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {Routes} from '@app/routes';
import {CartPage} from './CartPage';

const Tab = createBottomTabNavigator();

type Props = BottomTabScreenProps<Routes, 'Home'>;
export function Home({}: Props) {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Camera"
        component={CameraPage}
        screenOptions={{headerShown: false}}
      />
      <Tab.Screen name="Cart" component={CartPage} />
    </Tab.Navigator>
  );
}
