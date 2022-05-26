import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from './questionsSlice';
import Question from './Question';

function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const users = useSelector((state) => state.users);

  const questionsLength = useRef(Object.entries(questions).length);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch, questionsLength]);

  const aId = users.authedUser?.id;

  return (
    <>
      <h3>New Questions</h3>
      <div className="questionsGrid">
        {
          // eslint-disable-next-line no-unused-vars
          Object.entries(questions).filter(([id, question]) => !question.optionOne.votes
            .includes(aId)
                      && !question.optionTwo.votes.includes(aId))
            .map(([key, question]) => (
              <Link to={`/questions/${key}`} key={key}>
                <Question question={question} key={question.id} />
              </Link>
            ))
                }
      </div>
      <h3>Old Questions</h3>
      <div className="questionsGrid">
        {
          // eslint-disable-next-line no-unused-vars
          Object.entries(questions).filter(([id, question]) => question.optionOne.votes
            .includes(aId) || question.optionTwo.votes.includes(aId))
            .map(([key, question]) => (
              <Link to={`/questions/${key}`} key={key}>
                <Question question={question} key={question.id} />
              </Link>
            ))
                }
      </div>
    </>
  );
}

export default Questions;
