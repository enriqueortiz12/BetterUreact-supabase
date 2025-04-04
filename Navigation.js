import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileInfoForm from './screens/ProfileInfoForm';

const Stack = createStackNavigator();

const Navigation = () => (
  <Stack.Navigator initialRouteName='AuthScreen'>
    <Stack.Screen name='AuthScreen' component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }}/>
    <Stack.Screen name='ProfileInfoForm' component={ProfileInfoForm} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

export default Navigation;