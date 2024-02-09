import React from 'react';
import '../styles/EndPopUp.css';
import {useNavigate} from 'react-router-dom'

const EndPopUp: React.FC = () => {
  const navigate = useNavigate()

  const handleRestart = () => {
    window.location.reload(); 
  };

  const handleScoreBoard = () => {
    navigate('/scoreboard')
  };

  return (
    <div className="overlay">
        <div className="popup">
        <h2>GAME OVER!</h2>
        <p>CONGRATULATIONS</p>
        <button onClick={handleRestart}>Play Again</button>
        <button onClick={handleScoreBoard}>Check Scoreboard</button>
        </div>
    </div>
  );
};

export default EndPopUp;
