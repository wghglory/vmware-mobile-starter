import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
      <Text>Splash Screen</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export default SplashScreen;
