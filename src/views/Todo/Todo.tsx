import { View, Text, StyleSheet } from 'react-native';
import { TodoItems } from '../../components';
import { useState } from 'react';

export type TodoType = {
  label: string;
  isChecked: boolean;
};

export const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (todoLabel: string) => {
    if (todoLabel.trim() === '') {
      return;
    }

    const todo: TodoType = {
      label: todoLabel,
      isChecked: false,
    };

    setTodos([...todos, todo]);
  };

  return (
    <View style={styles.container}>
      <TodoItems todos={todos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
