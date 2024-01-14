// Importowanie potrzebnych modułów z biblioteki React
import React, { useState, useEffect } from 'react';
import './Game.css'; // Importowanie pliku stylów CSS

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
        setMatchedPairs([...flippedIndices])
        setScore(score + (100-moves))
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards]);

  // Obsługa kliknięcia na kartę
  const handleCardClick = (index: number) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(index)) {
      setFlippedIndices([...flippedIndices, index]);
      setMoves(moves + 1);
    }
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
    </div>
  );
};

// Eksportowanie komponentu do użycia w innych plikach
export default Game;
