import React from 'react';
import { Text, StyleSheet, View, TextStyle, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { TodoType } from '../../views';
import { AntDesign } from '@expo/vector-icons';

type TodoItemProps = {
  todo: TodoType;
  onTogglePress: (id: string) => void;
  onRemovePress: (id: string) => void;
  onEditPress: (id: string, text: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onTogglePress,
  onRemovePress,
  onEditPress,
}) => {
  const { id, text, isChecked } = todo;
  const textStyles: TextStyle = {
    textDecorationLine: todo.isChecked ? 'line-through' : 'none',
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          disabled={false}
          value={isChecked}
          onValueChange={() => onTogglePress(id)}
          style={styles.checkbox}
        />
        <Pressable
          onPress={() => onEditPress(id, text)}
          testID={`editTodo-${id}`}
          style={styles.textContainer}
        >
          <Text style={[styles.text, textStyles]}>{text}</Text>
        </Pressable>
      </View>
      <AntDesign
        name="delete"
        size={24}
        color="gray"
        onPress={() => onRemovePress(id)}
        testID={`deleteTodo-${id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    color: 'gray',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
