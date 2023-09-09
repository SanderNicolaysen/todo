import { SetStateAction, Dispatch } from 'react';
import { Text, StyleSheet, Pressable, Platform, Keyboard } from 'react-native';
import { KeyboardAvoidingViewInput } from '../KeyboardAvoidingViewInput';

type AddTodoInputProps = {
  onAddTodoPress: (text: string) => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// Component resposible for adding a new Todo.
export const AddTodoInput: React.FC<AddTodoInputProps> = ({
  onAddTodoPress,
  text,
  setText,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <>
      {!isOpen ? (
        <Pressable style={styles.container} onPress={onOpen} testID="addTaskId">
          <Text style={styles.plus}>+</Text>
          <Text style={styles.description}>
            {text.trim() ? text : 'Add task'}
          </Text>
        </Pressable>
      ) : (
        <KeyboardAvoidingViewInput
          text={text}
          setText={setText}
          placeholder="Add task"
          onSubmit={onAddTodoPress}
          onClose={onClose}
        />
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
