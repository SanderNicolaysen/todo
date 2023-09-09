import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react-native';
import { Todo } from './Todo';

const taskId = '123456789';
const taskName = 'Sample task';
const editedTaskName = 'Edited sample task';

// Mock the UUID library to provide a predictable task ID.
jest.mock('uuid', () => ({ v4: () => taskId }));

// Helper function to add a task
const addTask = (component: RenderResult, taskName: string) => {
  fireEvent.press(component.getByTestId('addTaskId'));
  const taskInput = component.getByTestId('keyboardAvoidingViewInputId');
  fireEvent.changeText(taskInput, taskName);
  fireEvent(taskInput, 'submitEditing');
};

// This test suite focuses on testing the behavior of the <Todo /> component,
// including adding, deleting, and editing tasks within the todo list.
describe('<Todo />', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Todo onLogout={jest.fn()} />);
  });

  test('should render the name of the todo list', () => {
    const { getByText } = component;
    const header = getByText('TODO');
    expect(header).toBeTruthy();
  });

  test('should add a new task', () => {
    const { getByText } = component;
    addTask(component, taskName);
    const taskElement = getByText(taskName);
    expect(taskElement).toBeTruthy();
  });

  test('should delete a task', () => {
    const { getByTestId, queryByText } = component;

    addTask(component, taskName);

    const deleteButton = getByTestId(`deleteTodo-${taskId}`);
    fireEvent.press(deleteButton);

    const deletedTask = queryByText(taskName);
    expect(deletedTask).toBeNull();
  });

  test('should edit a task', () => {
    const { getByTestId, getByText } = component;

    addTask(component, taskName);

    const editButton = getByTestId(`editTodo-${taskId}`);
    fireEvent.press(editButton);

    const editInput = getByTestId('keyboardAvoidingViewInputId');
    fireEvent.changeText(editInput, editedTaskName);
    fireEvent(editInput, 'submitEditing');

    const editedTask = getByText(editedTaskName);
    expect(editedTask).toBeTruthy();
  });
});
