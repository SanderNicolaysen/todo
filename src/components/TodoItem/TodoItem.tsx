import React from 'react';
import { Text, StyleSheet, View, TextStyle } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TodoType } from '../../views';
import { AntDesign } from '@expo/vector-icons';

type TodoItemProps = {
  todo: TodoType;
  onToggleTodoPress: (id: string) => void;
  onRemovePress: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleTodoPress,
  onRemovePress,
}) => {
  const { id, label, isChecked } = todo;
  const textStyles: TextStyle = {
    textDecorationLine: todo.isChecked ? 'line-through' : 'none',
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={isChecked}
          onValueChange={() => onToggleTodoPress(todo.id)}
          onAnimationType="bounce"
          animationDuration={0.3}
        />
        <Text style={[styles.label, textStyles]}>{label}</Text>
      </View>
      <AntDesign
        name="delete"
        size={24}
        color="gray"
        onPress={() => onRemovePress(id)}
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
  label: {
    fontSize: 20,
    color: 'gray',
    flex: 1,
    marginRight: 10,
  },
});
