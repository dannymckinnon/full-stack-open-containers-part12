import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newBlog.title}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, title: target.value });
            }}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newBlog.author}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, author: target.value });
            }}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newBlog.url}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, url: target.value });
            }}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
