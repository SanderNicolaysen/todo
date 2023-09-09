import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './App';
import * as LocalAuthentication from 'expo-local-authentication';

// Mock Expo's LocalAuthentication module
jest.mock('expo-local-authentication', () => ({
  getEnrolledLevelAsync: jest.fn(),
  authenticateAsync: jest.fn(),
}));

// Mock Linking's openURL and sendIntent methods
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
  sendIntent: jest.fn(),
}));

const taskId = '123456789';
// Mock uuid random Id generator
jest.mock('uuid', () => ({ v4: () => taskId }));

// This test suite focuses on testing the authentication logic and showing the correct screen.
describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the login screen when not authenticated', () => {
    const { getByTestId } = render(<App />);
    const loginComponent = getByTestId('loginComponentId');
    expect(loginComponent).toBeTruthy();
  });

  it('should render todo screen after successfull login', async () => {
    // Mock enrolled biometric
    (LocalAuthentication.getEnrolledLevelAsync as jest.Mock).mockResolvedValue(
      2
    );

    // Mock successful authentication
    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { getByText, getByTestId } = render(<App />);
    const LoginButton = getByText('Login');
    fireEvent.press(LoginButton);

    // Expect LocalAuthentication.authenticateAsync to be called
    await waitFor(() => {
      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalled();
    });

    // Expect todo screen to be rendered after login
    const todoComponent = getByTestId('todoComponentId');
    expect(todoComponent).toBeTruthy();
  });
});
