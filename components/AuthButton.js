import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AuthButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        console.log('✅ BUTTON PRESSED:', title); // Force console log
        onPress(); // Make sure function runs
      }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Math.min(width * 0.9, 400),
    height: 55,
    borderRadius: 15,
    backgroundColor: '#00FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AuthButton;
