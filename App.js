import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectionScreen from './SelectionScreen';
import GameScreen from './GameScreen';
import WinnerScreen from './WinnerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Winner" component={WinnerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}