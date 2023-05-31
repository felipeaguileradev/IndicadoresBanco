import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DetailIndicatorScreen,
  DetailScreen,
  HomeScreen,
} from '../screens/Screens';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Indicadores', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="DetailIndicatorScreen"
        component={DetailIndicatorScreen}
        options={{headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};
