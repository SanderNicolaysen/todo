import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  title: string;
};

export const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4681f4',
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
