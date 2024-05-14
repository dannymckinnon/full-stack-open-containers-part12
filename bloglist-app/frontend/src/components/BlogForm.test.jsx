import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('calls event handler it recieved as props', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const input = screen.getAllByRole('textbox');
  const submitButton = screen.getByText('create');

  await user.type(input[0], 'title');
  await user.type(input[1], 'author');
  await user.type(input[2], 'url');
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'title',
    author: 'author',
    url: 'url',
  });
});
