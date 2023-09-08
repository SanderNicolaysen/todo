import { useEffect, SetStateAction, Dispatch } from 'react';
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

type KeyboardAvoidingViewInputProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onSubmit: (text: string) => void;
  placeholder: string;
  onClose: () => void;
};

export const KeyboardAvoidingViewInput: React.FC<
  KeyboardAvoidingViewInputProps
> = ({ text, setText, onSubmit, placeholder, onClose }) => {
  useEffect(() => {
    // android does not support keyboardWillHide.
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        onClose();
      }
    );

    return () => {
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TextInput
        style={styles.textInput}
        autoFocus
        onChangeText={setText}
        value={text}
        placeholder={placeholder}
        onSubmitEditing={() => onSubmit(text)}
        multiline={false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 20,
    color: 'gray',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
