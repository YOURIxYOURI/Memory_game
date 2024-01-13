import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import Game from './Game';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthPage} />
        <Route path="/game" Component={Game} />
      </Routes>
    </Router>
  );

};

export default App;