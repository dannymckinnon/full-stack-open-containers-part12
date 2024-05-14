import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://www.test.com/',
    likes: 0,
    user: {
      username: 'username',
      name: 'name',
    },
  };

  let container;
  const likeMockHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateLikes={likeMockHandler}
        username={blog.username}
      />
    ).container;
  });

  test('renders title and author but does not render url and likes by default', () => {
    const element = screen.getByText('Title Author');
    expect(element).toBeDefined();

    const element2 = container.querySelector('.extra-info');
    expect(element2).toHaveStyle('display: none');
  });

  test('URL and likes are shown when button is click', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const element = container.querySelector('.extra-info');
    expect(element).not.toHaveStyle('display: none');

    screen.getByText('hide');
  });

  test('update likes function is run twice when button clicked twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');
    await user.click(button);
    await user.click(button);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
