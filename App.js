import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthForm from './components/AuthForm'; // The same AuthForm for both Login and Signup
import HomeScreen from './screens/HomeScreen'; // Home screen after login
import ProfileInfoForm from './screens/ProfileInfoForm'; // Profile information screen after signup

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={AuthForm}
          options={{ headerShown: false }} // Hide header for login screen
        />
        <Stack.Screen
          name="SignUpScreen"
          component={AuthForm}
          options={{ headerShown: false }} // Hide header for signup screen
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide header for home screen
        />
        <Stack.Screen
          name="ProfileInfoForm"
          component={ProfileInfoForm}
          options={{ headerShown: false }} // Hide header for profile info form
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
