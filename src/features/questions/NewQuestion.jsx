import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveNewQuestion } from './questionsSlice';

function NewQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.authedUser);
  const handleSaveQuestion = (event) => {
    event.preventDefault();
    dispatch(saveNewQuestion({
      optionOne: document.getElementById('optionOne').value,
      optionTwo: document.getElementById('optionTwo').value,
      author: user.id,
    }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSaveQuestion}>
      <h1>New Question</h1>
      <div className="options">
        <div className="option">
          <label htmlFor="optionOne">
            Option One:
            <input type="text" name="optionOne" id="optionOne" />
          </label>
        </div>
        <div className="option">
          <label htmlFor="optionTwo">
            Option Two:
            <input type="text" name="optionTwo" id="optionTwo" />
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewQuestion;
