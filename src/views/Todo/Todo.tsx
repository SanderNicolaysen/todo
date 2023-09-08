import { View, Button, StyleSheet, SafeAreaView, Text } from 'react-native';
import { TodoItems, TodoInput } from '../../components';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type TodoType = {
  id: string;
  label: string;
  isChecked: boolean;
};

type TodoProps = {
  logout: () => void;
};

export const Todo: React.FC<TodoProps> = ({ logout }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleAddTodo = (todoLabel: string) => {
    if (todoLabel.trim() === '') {
      return;
    }

    const todo: TodoType = {
      label: todoLabel,
      isChecked: false,
      id: uuidv4(), // generate random id. Typically this would be generated on the server.
    };

    setTodos([...todos, todo]);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TODO</Text>
        <Button color="#AB2310" title="Logout" onPress={logout} />
      </View>
      <TodoItems
        todos={todos}
        onToggleTodoPress={handleToggleTodo}
        onRemovePress={handleRemoveTodo}
      />
      <TodoInput onAddTodoPress={handleAddTodo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 20,
    color: '#0D70EE',
  },
});
