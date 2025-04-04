import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const AuthForm = ({ onChangeEmail, onChangePassword, confirmPassword, setConfirmPassword }) => {
  return (
    <View>
      <TextInput style={styles.input} placeholder='Email' onChangeText={onChangeEmail} />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={onChangePassword} />
      {confirmPassword !== undefined && (
        <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry onChangeText={setConfirmPassword} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default AuthForm;
