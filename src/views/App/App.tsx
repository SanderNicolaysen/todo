import React, { useState } from 'react';
import { StyleSheet, View, Linking, Platform } from 'react-native';
import { Login, Todo } from '../../views';
import * as LocalAuthentication from 'expo-local-authentication';

// App component manages user authentication and displays either the Login or Todo component based on authentication status.
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = async () => {
    const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();

    // If there are no enrolled authentication, open security settings for the user.
    if (enrolledLevel === LocalAuthentication.SecurityLevel.NONE) {
      Platform.OS === 'ios'
        ? await Linking.openURL('App-Prefs:Password')
        : await Linking.sendIntent('android.settings.SECURITY_SETTINGS');

      return;
    }

    // Authenticate the user using biometric authentication, pincode or password
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter password',
    });

    // Update the authentication status based on the result.
    setIsAuthenticated(result.success);
  };

  const handleLogoutPress = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Todo onLogout={handleLogoutPress} />
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
