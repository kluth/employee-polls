import React from 'react';
import { useSelector } from 'react-redux';
import './Leaderboard.css';

function Leaderboard() {
  const users = useSelector((state) => state.users.users);
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Rank #</th>
            <th>Name</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {/* iterate over all users sorted by answers */}
          {Object.keys(users).sort((a, b) => Object.keys(users[b].answers).length
            - Object.keys(users[a].answers).length).map((user, index) => (
              <tr key={user}>
                <td>{index + 1}</td>
                <td>{users[user].name}</td>
                <td>{Object.keys(users[user].answers).length}</td>
                <td>{users[user].questions.length}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
