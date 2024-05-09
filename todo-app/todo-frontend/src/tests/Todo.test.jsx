import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Todo from '../Todos/Todo';

test('renders content', async () => {
  const todo = {
    text: 'Sample Todo',
    done: false,
  };
  const deleteTodo = vi.fn();
  const completeTodo = vi.fn();

  render(
    <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
  );

  expect(screen.getByText('Sample Todo')).toBeInTheDocument();
  expect(screen.getByText('This todo is not done')).toBeInTheDocument();

  const user = userEvent.setup();

  await user.click(screen.getByText('Set as done'));

  expect(completeTodo).toHaveBeenCalledTimes(1);
  expect(completeTodo).toHaveBeenCalledWith(todo);

  await user.click(screen.getByText('Delete'));
  expect(deleteTodo).toHaveBeenCalledTimes(1);
  expect(deleteTodo).toHaveBeenCalledWith(todo);
});
