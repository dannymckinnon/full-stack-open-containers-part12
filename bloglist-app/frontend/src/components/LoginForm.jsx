import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = (event) => {
    event.preventDefault();
    const user = { username, password };
    handleLogin(user);
  };

  return (
    <form onSubmit={userLogin}>
      <div>
        username
        <input
          id="username"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button id="login">login</button>
    </form>
  );
};

export default LoginForm;
