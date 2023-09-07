import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '../Button';

type TodoInputProps = {
  onAddTodoPress: (todoLabel: string) => void;
};

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodoPress }) => {
  const [text, onChangeText] = useState('Useless Text');

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Button onPress={() => onAddTodoPress(text)} title="add todo" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
