import React from 'react';
import './Questions.css';

function Question(question) {
  const quest = Object.values(question)[0];
  return (
    <div key={quest.id}>
      <img src={quest.avatarURL || `https://avatars.dicebear.com/api/big-smile/${quest.author}.svg?scale=50`} alt={quest.author} />
      <h3>
        {quest.author}
        {' '}
        asks... on
        {' '}
        {new Date(quest.timestamp).toLocaleDateString()}
      </h3>
      <h2>Would you rather...</h2>
      <div className="options">
        <div className="option">
          <h4>{quest.optionOne.text}</h4>
          <div className="votes">
            {quest.optionOne.votes.length}
          </div>
        </div>
        <div className="option">
          <h4>{quest.optionTwo.text}</h4>
          <div className="votes">
            {quest.optionTwo.votes.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
