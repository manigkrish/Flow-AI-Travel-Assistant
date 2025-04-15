import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AppNavigator from '../src/navigation/AppNavigator';
import LoadingScreen from '../src/screens/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
      <AppNavigator />
  );
}
