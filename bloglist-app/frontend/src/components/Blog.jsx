import { useState } from 'react';

const Blog = ({ blog, updateLikes, removeBlog, username }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const showWhenCurrentUser = {
    display: username === blog.user.username ? '' : 'none',
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedBlog);
  };

  const handleRemove = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );

    if (confirm) removeBlog(blog.id);
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div className="extra-info" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button id="likes" onClick={handleLikes}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button id="remove" style={showWhenCurrentUser} onClick={handleRemove}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
