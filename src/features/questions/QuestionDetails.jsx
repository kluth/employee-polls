import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { saveAnswer, fetchQuestion } from './questionsSlice';

function QuestionDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions.questions);
  // get the current question out of questions via id
  useEffect(() => {
    dispatch(fetchQuestion(id));
  }, [dispatch, id, questions]);

  const question = useSelector((state) => state.questions.questions[id]);
  return (
    <div className="questionDetails">
      <h1>
        {question.author}
        {' '}
        asks on
        {' '}
        {new Date(question.timestamp).toLocaleDateString()}
        :
      </h1>
      <h3>
        Would you rather
        {question.optionOne.text}
        {' '}
        or
        {question.optionTwo.text}
        ?
      </h3>
      <div className="options">
        <div className="option">
          <div className="optionText">
            <h3>{question.optionOne.text}</h3>
            <p>
              {question.optionOne.votes.length}
              {' '}
              out of
              {' '}
              {users.length}
              {' '}
              votes
            </p>
          </div>
          <button
            onClick={() => {
              dispatch(saveAnswer({
                authedUser: users.authedUser.id,
                qid: id,
                answer: 'optionOne',
              }));
              navigate(-1);
            }}
            type="submit"
          >
            Vote
          </button>
        </div>
        <div className="option">
          <div className="optionText">
            <h3>{question.optionTwo.text}</h3>
            <p>
              {question.optionTwo.votes.length}
              {' '}
              out of
              {' '}
              {users.length}
              {' '}
              votes
            </p>
          </div>
          <button
            onClick={() => {
              dispatch(saveAnswer({
                authedUser: users.authedUser.id,
                qid: id,
                answer: 'optionTwo',
              }));
              navigate(-1);
            }}
            type="submit"
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetails;
