import { View } from 'react-native';
import { TodoItem } from '../TodoItem';
import { TodoType } from '../../views';

type TodoItemsProps = {
  todos: TodoType[];
};

export const TodoItems: React.FC<TodoItemsProps> = ({ todos }) => {
  return (
    <View>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </View>
  );
};
