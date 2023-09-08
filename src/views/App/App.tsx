import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Linking, Platform } from 'react-native';
import { Login, Todo } from '../../views';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = async () => {
    const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
    if (enrolledLevel === 0) {
      Platform.OS === 'ios'
        ? await Linking.openURL('App-Prefs:Password')
        : await Linking.sendIntent('android.settings.SECURITY_SETTINGS');

      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter password',
    });

    setIsAuthenticated(result.success);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Todo logout={logout} />
      ) : (
        <Login onAuthenticatePress={handleAuthenticate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4F3',
  },
});
