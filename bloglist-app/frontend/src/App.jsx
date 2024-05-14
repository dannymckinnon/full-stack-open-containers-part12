import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userInfo) => {
    try {
      const user = await loginService.login(userInfo);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setNotificationMessage('invalid username and password');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const createBlog = async (noteObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(noteObject);
      const response = await blogService.getAll();
      setBlogs(response);
      setNotificationMessage(
        `a new blog ${blog.title} by ${blog.author} added`
      );
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('invalid blog');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const updateLikes = async (blog) => {
    await blogService.update(blog);
    const response = await blogService.getAll();
    setBlogs(response);
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    const response = await blogService.getAll();
    setBlogs(response);
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notificationMessage} />
      <LoginForm handleLogin={handleLogin} />
    </div>
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>
        {user.name} has logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
            username={user.username}
          />
        ))}
    </div>
  );

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  );
};

export default App;
