import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  title: string;
};

export const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}, styles.button]}
    >
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
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#0D70EE',
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
