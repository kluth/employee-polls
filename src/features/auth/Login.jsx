import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../users/usersSlice';

function Login() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    dispatch(login({ username, password }));
  };
  useEffect(() => {
    if (users.authedUser) {
      navigate('/');
    }
  }, [users.authedUser, navigate]);
  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="username" name="username" id="username" />
      <input type="password" placeholder="password" name="password" id="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
