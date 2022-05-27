import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../context/AuthContext';

const HomeScreen = () => {
  const {user, status, signOut} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {user?.name}</Text>
      <Button title="Logout" color="red" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
