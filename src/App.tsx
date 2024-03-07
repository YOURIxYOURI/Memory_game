import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Game from './components/Game';
import ScoreBoard from './components/ScoreBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthPage} />
        <Route path="/game" Component={Game} />
        <Route path="/scoreboard" Component={ScoreBoard} />
      </Routes>
    </Router>
  );

};

export default App;