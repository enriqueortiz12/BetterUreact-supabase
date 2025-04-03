import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../utils/supabaseClient';

const HomeScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params?.user || null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (!error && userData) {
        setUser(userData.user);
      }
    };

    if (!user) fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.log('Error fetching profile:', error);
          } else {
            setProfile(data);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('AuthScreen'); // Back to login/signup screen
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: User data not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Text style={styles.header}>Good evening, {profile.full_name}!</Text>
          <Text style={styles.info}>Email: {profile.email}</Text>
          <Text style={styles.info}>Weight: {profile.weight} kg</Text>
          <Text style={styles.info}>Height: {profile.height} cm</Text>
          <Text style={styles.info}>Fitness Goal: {profile.fitness_goal}</Text>
          <Text style={styles.info}>Gender: {profile.gender}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.loading}>Loading profile...</Text>
      )}
    </View>
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
  info: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  loading: {
    fontSize: 18,
    color: '#fff',
  },
  error: {
    fontSize: 18,
    color: '#FF0000',
  },
});

export default HomeScreen;
