// Importowanie potrzebnych modułów z biblioteki React
import React, { useState, useEffect } from 'react';
import '../styles/Game.css'; // Importowanie pliku stylów CSS
import { useNavigate } from 'react-router-dom'; // Importowanie hooka do nawigacji
import EndPopUp from './EndPopup'; // Importowanie komponentu pop-upu na koniec gry

// Tablica z emoji reprezentującymi karty
const images: string[] = [
  '💻', '🖱️', '🕹️', '🎮', '👾', '🎧', '🖥️', '⌨️',
];

// Funkcja do tasowania tablicy
const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Główny komponent aplikacji
const Game: React.FC = () => {
  // Stany dla karty, indeksów odkrytych kart, odnalezionych par, punktacji i liczby ruchów
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState(false); // Stan informujący, czy gra się zakończyła
  const navigate = useNavigate(); // Hook do nawigacji

  // useEffect, który tasuje karty przy pierwszym uruchomieniu
  useEffect(() => {
    const initialCards = shuffleArray([...images, ...images]);
    setCards(initialCards);
  }, []);

  // useEffect, który sprawdza, czy dwie odkryte karty tworzą parę
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs([...matchedPairs, ...flippedIndices])
        setScore(score + (100 - moves))
        if (matchedPairs.length === 14) { // Sprawdzenie, czy wszystkie pary zostały odnalezione
          setGameFinished(true); // Ustawienie stanu informującego, że gra się zakończyła
        }
      }
      setTimeout(() => setFlippedIndices([]), 1000); // Zresetowanie odkrytych kart po 1 sekundzie
    }
  }, [flippedIndices, cards, matchedPairs, moves, score]);

  // useEffect, który zapisuje wynik do localStorage po zakończeniu gry
  useEffect(() => {
    if (gameFinished) {
      const scoreBoard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
      const scoreData = {
        username: localStorage.getItem('loggedUser'),
        moves: moves,
        score: score
      }
      scoreBoard.push(scoreData);
      localStorage.setItem('scoreboard', JSON.stringify(scoreBoard));
    }
  }, [gameFinished, moves, score]);

  // Obsługa kliknięcia na kartę
  const handleCardClick = (index: number) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(index)) {
      setFlippedIndices([...flippedIndices, index]);
      setMoves(moves + 1);
    }
  };

  // Obsługa kliknięcia przycisku wylogowania
  const handleLogout = () => {
    localStorage.removeItem('loggedUser'); // Usunięcie danych użytkownika z localStorage
    navigate('/'); // Przekierowanie do strony logowania
  };

  // Obsługa kliknięcia przycisku scoreboard
  const handleScoreboardClick = () => {
    navigate('/scoreboard'); // Przekierowanie do tablicy wyników
  };

  // Renderowanie komponentu
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) || matchedPairs.includes(index) ? card : '❓'}
          </div>
        ))}
      </div>
      <div className="game-info">
        <h2>Moves: {moves}</h2>
        <h2>Score: {score}</h2>
      </div>
      <div className="navigation-buttons">
        <button onClick={handleScoreboardClick}>Scoreboard</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {gameFinished && (<EndPopUp/>)}
    </div>
  );
};

// Eksportowanie komponentu do użycia w innych plikach
export default Game;
