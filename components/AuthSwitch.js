import React from 'react';
import { Button } from 'react-native-paper';

const AuthSwitch = ({ onPress, text }) => {
  return (
    <Button
      onPress={onPress}
      style={{
        width: '90%', // Full width button for consistency
        height: 55, // Adequate height for the switch button
        borderRadius: 15, // Rounded button edges
        backgroundColor: '#00FFFF', // Neon blue color
        marginTop: 15, // Space above the button
      }}
      labelStyle={{
        color: '#000000', // Button text color
        fontSize: 18, // Button text font size
        fontWeight: 'bold', // Bold text for visibility
      }}
    >
      {text}
    </Button>
  );
};

export default AuthSwitch;
