import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { asyncPreloadProcess } from './states/isPreload/actions';
import { asyncUnsetAuthUser } from './states/authUser/actions';
import Loading from './components/Loading';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailThreadPage from './pages/DetailThreadPage';
import LeaderboardsPage from './pages/LeaderboardPage';
import ThreadInput from './components/ThreadInput';
import { asyncCreateThread } from './states/threads/actions';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  };

  return (
    <div className="app-container">

      <header>
        <Navigation authUser={authUser} logout={onLogout} />
        <Loading />
      </header>
      <main>
        {isPreload ? (
          <Loading />
        ) : (
          <Routes>
            {authUser === null ? (
              <>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/leaderboard" element={<LeaderboardsPage />} />
                <Route path="/threads/:id" element={<DetailThreadPage />} />
                <Route path="/add-thread" element={<ThreadInput addThread={onAddThread} />} />
              </>
            )}
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
