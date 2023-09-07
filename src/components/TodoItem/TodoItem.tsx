import React, { useState } from 'react';
import { Text, StyleSheet, View, TextStyle } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TodoType } from '../../views';

type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { label, isChecked } = todo;
  const textStyles: TextStyle = {
    textDecorationLine: todo.isChecked ? 'line-through' : 'none',
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={isChecked}
          onValueChange={(newValue) => () => {
            return;
          }}
        />
        <Text style={[styles.label, textStyles]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  label: {
    fontSize: 18,
    color: 'gray',
  },
});
