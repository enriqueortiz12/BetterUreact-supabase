import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../utils/supabaseClient';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileInfoForm = ({ navigation, route }) => {
  const { user } = route.params; // Get the user info passed from the SignUp screen

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('Strength');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState('');

  const [fitnessGoalOpen, setFitnessGoalOpen] = useState(false); // State to control fitness goal dropdown
  const [genderOpen, setGenderOpen] = useState(false); // State to control gender dropdown

  const handleSaveProfile = async () => {
    setError('');
    if (!fullName || !age || !weight || !height) {
      setError('All fields are required.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            full_name: fullName,
            email: user.email,
            age: age,
            weight: weight,
            height: height,
            fitness_goal: fitnessGoal,
            gender: gender,
            user_id: user.id,
          },
        ]);

      if (error) {
        setError(error.message);
        return;
      }

      navigation.navigate('HomeScreen');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Complete Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.label}>Fitness Goal</Text>
      <DropDownPicker
        open={fitnessGoalOpen}
        value={fitnessGoal}
        items={[
          { label: 'Strength', value: 'Strength' },
          { label: 'Muscle Growth', value: 'Muscle Growth' },
          { label: 'Health and Wellness', value: 'Health and Wellness' },
          { label: 'Athleticism', value: 'Athleticism' },
        ]}
        setOpen={setFitnessGoalOpen}
        setValue={setFitnessGoal}
        containerStyle={[styles.dropdownContainer, { zIndex: 10 }]} // Ensure this dropdown is above others
        style={styles.dropdownStyle}
        dropDownStyle={styles.dropdownDropDown}
        textStyle={fitnessGoalOpen ? styles.dropdownTextOpen : styles.dropdownTextClosed} // Change text color based on dropdown open state
      />

      <Text style={styles.label}>Gender</Text>
      <DropDownPicker
        open={genderOpen}
        value={gender}
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ]}
        setOpen={setGenderOpen}
        setValue={setGender}
        containerStyle={[styles.dropdownContainer, { zIndex: 5 }]} // Lower zIndex so it’s behind the fitness goal dropdown
        style={styles.dropdownStyle}
        dropDownStyle={styles.dropdownDropDown}
        textStyle={genderOpen ? styles.dropdownTextOpen : styles.dropdownTextClosed} // Change text color based on dropdown open state
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
    paddingBottom: 40, // Add bottom padding for dropdown visibility
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
  label: {
    color: '#00FFFF',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  dropdownContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownStyle: {
    backgroundColor: '#222',
    borderColor: '#444',
  },
  dropdownDropDown: {
    backgroundColor: '#222',
    maxHeight: 200, // Ensure dropdown doesn’t extend too much
  },
  dropdownTextOpen: {
    color: '#00FFFF', // Text color when dropdown is open
    fontSize: 16,
  },
  dropdownTextClosed: {
    color: '#fff', // Text color when dropdown is closed
    fontSize: 16,
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProfileInfoForm;
