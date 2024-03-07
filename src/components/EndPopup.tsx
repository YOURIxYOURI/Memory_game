import React from 'react';
import '../styles/EndPopUp.css'; // Importowanie pliku stylów CSS
import { useNavigate } from 'react-router-dom'; // Importowanie hooka do nawigacji

const EndPopUp: React.FC = () => {
  const navigate = useNavigate(); // Hook do nawigacji

  // Obsługa przycisku restartu gry
  const handleRestart = () => {
    window.location.reload(); // Przeładowanie strony, aby zrestartować grę
  };

  // Obsługa przycisku sprawdzania wyników
  const handleScoreBoard = () => {
    navigate('/scoreboard'); // Przekierowanie do strony wyników
  };

  // Renderowanie komponentu
  return (
    <div className="overlay">
      {/* Okno pop-up */}
      <div className="popup">
        <h2>GAME OVER!</h2> {/* Nagłówek informujący o zakończeniu gry */}
        <p>CONGRATULATIONS</p> {/* Gratulacje dla użytkownika */}
        {/* Przycisk restartu gry */}
        <button onClick={handleRestart}>Play Again</button>
        {/* Przycisk sprawdzania wyników */}
        <button onClick={handleScoreBoard}>Check Scoreboard</button>
      </div>
    </div>
  );
};

export default EndPopUp;
