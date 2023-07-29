import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PermissionsScreen} from '@app/screens/PermissionsScreen';
import {Home} from '@app/screens/Home';
import type {Routes} from '@app/routes';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Provider} from 'react-redux';
import {store} from '@app/constants/store';

const Stack = createNativeStackNavigator<Routes>();

// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});
// 3. Pass the `theme` prop to the `NativeBaseProvider`

export function App(): React.ReactElement | null {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsScreen = cameraPermission !== 'authorized';
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
              animationTypeForReplace: 'push',
            }}
            initialRouteName={showPermissionsScreen ? 'Permissions' : 'Home'}>
            <Stack.Screen name="Permissions" component={PermissionsScreen} />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
