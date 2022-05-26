import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './features/navigation/Navigation';
import Questions from './features/questions/Questions';
import QuestionDetails from './features/questions/QuestionDetails';
import NewQuestion from './features/questions/NewQuestion';
import Leaderboard from './features/leaderboard/Leaderboard';
import Footer from './features/footer/Footer';
import { getAllUsers } from './features/users/usersSlice';
import { fetchQuestions } from './features/questions/questionsSlice';
import Login from './features/auth/Login';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  // per default just get all the data
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(fetchQuestions());
    if (users.authedUser === null) {
      navigate('/login');
    }
  }, [dispatch, navigate, users.authedUser]);
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/questions/:id" element={<QuestionDetails />} />
        <Route path="/questions/new" element={<NewQuestion />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
