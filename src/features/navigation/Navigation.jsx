import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation() {
  const users = useSelector((state) => state.users);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/questions/new">New Question</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          Hey,
          {' '}
          {users.authedUser?.name || 'Guest'}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
