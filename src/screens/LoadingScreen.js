import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.logo}>Flow</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 50,
    paddingTop: 100,
  },
  logo: {
    color: '#FFF',
    fontSize: 55,
    fontWeight: 'bold',
  },
});

export default LoadingScreen;