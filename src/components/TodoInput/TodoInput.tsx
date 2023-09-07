import { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

type TodoInputProps = {
  onAddTodoPress: (todoLabel: string) => void;
};

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodoPress }) => {
  const [text, setText] = useState('');
  const [inputIsOpen, setInputIsOpen] = useState(false);

  const handleKeyboardClose = () => {
    setInputIsOpen(false);
  };

  useEffect(() => {
    // android does not support keyboardWillHide.
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        handleKeyboardClose();
      }
    );

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const handleOpenInputPress = () => {
    setInputIsOpen(!inputIsOpen);
  };

  const handleAddTodoPress = () => {
    setInputIsOpen(false);
    setText('');

    if (text.trim() !== '') {
      onAddTodoPress(text);
    }
  };

  return (
    <>
      {!inputIsOpen ? (
        <Pressable style={styles.container} onPress={handleOpenInputPress}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.description}>
            {text.trim() ? text : 'Add a task'}
          </Text>
        </Pressable>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            style={styles.textInput}
            autoFocus
            onChangeText={setText}
            value={text}
            placeholder="Add a task"
            onSubmitEditing={handleAddTodoPress}
            multiline={false}
          />
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  plus: {
    fontSize: 40,
    color: '#0D70EE',
  },
  description: {
    fontSize: 20,
    color: '#0D70EE',
  },
  textInput: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    color: 'gray',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
