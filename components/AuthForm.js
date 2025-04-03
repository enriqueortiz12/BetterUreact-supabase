import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../utils/supabaseClient'; // Your supabase client

const AuthForm = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (type) => {
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (type === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      let { data, error } =
        type === 'signup'
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
        return;
      }

      if (type === 'signup') {
        navigation.navigate('ProfileInfoForm', { user: data.user });
      } else {
        navigation.navigate('HomeScreen');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {route.name === 'SignUpScreen' ? 'Create an Account' : 'Login to BetterU'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {route.name === 'SignUpScreen' && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAuth(route.name === 'SignUpScreen' ? 'signup' : 'login')}
      >
        <Text style={styles.buttonText}>{route.name === 'SignUpScreen' ? 'Sign Up' : 'Log In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() =>
          navigation.navigate(route.name === 'SignUpScreen' ? 'LoginScreen' : 'SignUpScreen')
        }
      >
        <Text style={styles.toggleButtonText}>
          {route.name === 'SignUpScreen' ? 'Already have an account? Log in' : 'Don’t have an account? Sign up'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#00FFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00FFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    width: '100%',
    height: 50,
    borderColor: '#00FFFF',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  toggleButtonText: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AuthForm;
