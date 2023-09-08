import { View, Button, StyleSheet, SafeAreaView, Text } from 'react-native';
import { TodoItems, AddTodoInput, EditTodoInput } from '../../components';
import { useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type TodoType = {
  id: string;
  text: string;
  isChecked: boolean;
};

type TodoProps = {
  logout: () => void;
};

export const Todo: React.FC<TodoProps> = ({ logout }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const [addTodoText, setAddTodoText] = useState('');
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const [editTodoText, setEditTodoText] = useState('');
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editingTodoId, seteditingTodoId] = useState('');

  const handleAddTodo = (text: string) => {
    if (text.trim() === '') {
      return;
    }

    const todo: TodoType = {
      text: text,
      isChecked: false,
      id: uuidv4(), // generate random id. Typically this would be generated on the server.
    };

    setTodos([...todos, todo]);
    setIsAddingTodo(false);
    setAddTodoText('');
  };

  const handleOpenAddTodo = () => {
    setIsAddingTodo(true);
  };

  const handleCloseAddTodo = () => {
    setIsAddingTodo(false);
  };

  const handleEditTodo = (id: string, text: string) => {
    if (text.trim() === '') {
      return;
    }

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setIsEditingTodo(false);
    setEditTodoText('');
  };

  const handleEditPress = (id: string, text: string) => {
    setEditTodoText(text);
    seteditingTodoId(id);
    setIsEditingTodo(true);
  };

  const handleCloseEditTodo = () => {
    setIsEditingTodo(false);
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
        onTogglePress={handleToggleTodo}
        onRemovePress={handleRemoveTodo}
        onEditPress={handleEditPress}
      />
      {isEditingTodo ? (
        <EditTodoInput
          onEditTodoPress={(text) => handleEditTodo(editingTodoId, text)}
          text={editTodoText}
          setText={setEditTodoText}
          isOpen={isEditingTodo}
          onClose={handleCloseEditTodo}
        />
      ) : (
        <AddTodoInput
          onAddTodoPress={handleAddTodo}
          onOpen={handleOpenAddTodo}
          onClose={handleCloseAddTodo}
          text={addTodoText}
          setText={setAddTodoText}
          isOpen={isAddingTodo}
        />
      )}
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
