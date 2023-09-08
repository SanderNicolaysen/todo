import { StyleSheet, ScrollView } from 'react-native';
import { TodoItem } from '../TodoItem';
import { TodoType } from '../../views';

type TodoItemsProps = {
  todos: TodoType[];
  onToggleTodoPress: (id: string) => void;
  onRemovePress: (id: string) => void;
};

export const TodoItems: React.FC<TodoItemsProps> = ({
  todos,
  onToggleTodoPress,
  onRemovePress,
}) => {
  return (
    <ScrollView style={styles.container}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodoPress={onToggleTodoPress}
          onRemovePress={onRemovePress}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
