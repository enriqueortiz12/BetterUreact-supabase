import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00FFFF', // Neon blue
    background: '#000000', // Black background
    surface: '#333333', // Dark surface color
    text: '#FFFFFF', // White text
    placeholder: '#888888', // Placeholder color
    error: '#FF0000', // Red for errors
  },
  roundness: 10, // Rounded edges for buttons and inputs
};

export default theme;
