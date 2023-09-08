import { SetStateAction, Dispatch } from 'react';
import { KeyboardAvoidingViewInput } from '../KeyboardAvoidingViewInput';

type EditTodoInputProps = {
  onEditTodoPress: (text: string) => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  onClose: () => void;
};

export const EditTodoInput: React.FC<EditTodoInputProps> = ({
  onEditTodoPress,
  text,
  setText,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen ? (
        <KeyboardAvoidingViewInput
          text={text}
          setText={setText}
          placeholder="Edit task"
          onSubmit={onEditTodoPress}
          onClose={onClose}
        />
      ) : null}
    </>
  );
};
