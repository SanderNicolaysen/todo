import { StyleSheet, ScrollView } from 'react-native';
import { TodoItem } from '../TodoItem';
import { TodoType } from '../../views';

type TodoItemsProps = {
  todos: TodoType[];
  onTogglePress: (id: string) => void;
  onRemovePress: (id: string) => void;
  onEditPress: (id: string, text: string) => void;
};

export const TodoItems: React.FC<TodoItemsProps> = ({
  todos,
  onTogglePress,
  onRemovePress,
  onEditPress,
}) => {
  return (
    <ScrollView style={styles.container}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTogglePress={onTogglePress}
          onRemovePress={onRemovePress}
          onEditPress={onEditPress}
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
