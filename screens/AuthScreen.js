import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabaseClient';

const AuthScreen = () => {
  const navigation = useNavigation();

  // State for sign-up and login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');  // Added height input

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) throw error;

      console.log('Login successful:', user);
      navigation.navigate('HomeScreen', { user }); // Pass user to HomeScreen
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  const handleSignUp = async () => {
  if (password !== confirmPassword) {
    return Alert.alert('Passwords do not match');
  }

  try {
    // Step 1: Check if the email is already used in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.log('Auth Error:', authError);
      // If there's an error related to email already being used in Supabase Auth, show an error message
      if (authError.message.includes('duplicate key value violates unique constraint')) {
        return Alert.alert('Email already exists', 'This email is already associated with an account.');
      }
      throw authError; // Handle other errors from Supabase Auth
    }

    console.log('User signed up successfully in Auth:', authData);

    // Step 2: Check if the email already exists in the profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single(); // Look for a single profile with the given email

    if (profileData) {
      console.log('Profile already exists in profiles table:', profileData);
      // If email is found in the profiles table, show an error message and prevent navigation
      return Alert.alert('Email already exists', 'This email is already associated with a profile.');
    }

    // Step 3: Insert the profile data into the profiles table
    const { error: profileInsertError } = await supabase.from('profiles').insert([
      {
        id: authData.id, // Use the user ID from the Supabase Auth response
        full_name: fullName,
        email: authData.email,
        fitness_goal: fitnessGoal,
        gender: gender,
        height: height,
      },
    ]);

    if (profileInsertError) {
      console.log('Profile Insert Error:', profileInsertError);
      throw new Error(profileInsertError.message); // Handle errors when inserting profile
    }

    console.log('Profile data inserted successfully:', authData);

    // Step 4: After successful sign-up and profile creation, navigate to ProfileInfoScreen
    navigation.navigate('ProfileInfoScreen', { user: authData });

  } catch (error) {
    console.error('Sign-Up error:', error.message);
    Alert.alert('Error', error.message); // Show any errors that occur during the process
  }
};

  return (
    <View style={styles.container}>
      {isLogin ? (
        <>
          <Text style={styles.header}>Login to BetterU</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} color="#00FFFF" />

          <Text style={styles.switchText}>
            Don't have an account?{' '}
            <Text
              style={styles.switchButton}
              onPress={() => setIsLogin(false)}
            >
              Sign Up
            </Text>
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Create an Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Fitness Goal"
            value={fitnessGoal}
            onChangeText={setFitnessGoal}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
          />
          <Button title="Sign Up" onPress={handleSignUp} color="#00FFFF" />

          <Text style={styles.switchText}>
            Already have an account?{' '}
            <Text
              style={styles.switchButton}
              onPress={() => setIsLogin(true)}
            >
              Log In
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  switchText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  switchButton: {
    color: '#00FFFF',
    fontWeight: 'bold',
  },
});

export default AuthScreen;
