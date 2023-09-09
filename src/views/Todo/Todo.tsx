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
  onLogout: () => void;
};

export const Todo: React.FC<TodoProps> = ({ onLogout }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const [addTodoText, setAddTodoText] = useState('');
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const [editTodoText, setEditTodoText] = useState('');
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editingTodoId, seteditingTodoId] = useState('');

  const handleAddTodoPress = (text: string) => {
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

  const handleOpenAddTodoPress = () => {
    setIsAddingTodo(true);
  };

  const handleCloseAddTodoPress = () => {
    setIsAddingTodo(false);
  };

  const handleEditTodoPress = (id: string, text: string) => {
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

  const handleOpenEditTodoPress = (id: string, text: string) => {
    setEditTodoText(text);
    seteditingTodoId(id);
    setIsEditingTodo(true);
  };

  const handleCloseEditTodoPress = () => {
    setIsEditingTodo(false);
  };

  const handleToggleTodoPress = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleRemoveTodoPress = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container} testID="todoComponentId">
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TODO</Text>
        <Button color="#AB2310" title="Logout" onPress={onLogout} />
      </View>
      <TodoItems
        todos={todos}
        onTogglePress={handleToggleTodoPress}
        onRemovePress={handleRemoveTodoPress}
        onEditPress={handleOpenEditTodoPress}
      />
      {isEditingTodo ? (
        <EditTodoInput
          onEditTodoPress={(text) => handleEditTodoPress(editingTodoId, text)}
          text={editTodoText}
          setText={setEditTodoText}
          isOpen={isEditingTodo}
          onClose={handleCloseEditTodoPress}
        />
      ) : (
        <AddTodoInput
          onAddTodoPress={handleAddTodoPress}
          onOpen={handleOpenAddTodoPress}
          onClose={handleCloseAddTodoPress}
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
