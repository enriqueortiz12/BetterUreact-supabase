import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../utils/supabaseClient';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (!email || !password) return Alert.alert('Please fill all fields');

    if (!isLogin && password !== confirmPassword) {
      return Alert.alert('Passwords do not match');
    }

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return Alert.alert('Login error', error.message);

      navigation.navigate('HomeScreen', { user: data.user });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: 'https://yourapp.com/welcome' },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          return Alert.alert('This email already exists.');
        }
        return Alert.alert('Signup error', error.message);
      }

      navigation.navigate('ProfileInfoForm', { user: data.user });
    }
  };

  const handleResetPassword = async () => {
    if (!email) return Alert.alert('Please enter your email address.');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://yourapp.com/reset-password',
    });
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Check your email to reset your password.');
  };

  const handleResendVerification = async () => {
    if (!email) return Alert.alert('Please enter your email address.');
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { redirectTo: 'https://yourapp.com/welcome' },
    });
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Verification email sent.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login to BetterU' : 'Create an Account'}</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {!isLogin && (
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      {isLogin && (
        <>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleResetPassword}>
            <Text style={styles.secondaryButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleResendVerification}>
            <Text style={styles.secondaryButtonText}>Resend Verification Email</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.linkText}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#00FFFF',
    fontWeight: '700',  // Bold title
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Roboto', // A better font-family
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#00FFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,  // Make the button text larger for better visibility
  },
  linkText: {
    marginTop: 20,
    color: '#00FFFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  secondaryButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1e1e1e',
    borderColor: '#00FFFF',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#00FFFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});
