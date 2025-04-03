import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';  // Login/SignUp screen
import HomeScreen from './screens/HomeScreen';  // Home screen after login

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
