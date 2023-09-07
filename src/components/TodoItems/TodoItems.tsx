import { View, StyleSheet } from 'react-native';
import { TodoItem } from '../TodoItem';
import { TodoType } from '../../views';

type TodoItemsProps = {
  todos: TodoType[];
  onToggleTodoPress: (id: string) => void;
};

export const TodoItems: React.FC<TodoItemsProps> = ({
  todos,
  onToggleTodoPress,
}) => {
  return (
    <View style={styles.container}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodoPress={onToggleTodoPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
