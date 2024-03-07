import React, { useEffect } from 'react';
import '../styles/ScoreBoard.css'; // Importowanie pliku stylów CSS
import { useNavigate } from 'react-router-dom'; // Importowanie hooka do nawigacji

// Dane testowe dla tablicy wyników
const fakeData = [
  { username: 'user1', moves: 10, score: 1000 },
  { username: 'user2', moves: 12, score: 220 },
  { username: 'user3', moves: 15, score: 180 },
];

const ScoreBoard: React.FC = () => {
const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('loggedUser')){
      navigate('/')
    }
  }, []) 
  // Pobranie danych tablicy wyników z localStorage
  let scoreboardData = JSON.parse(localStorage.getItem("scoreboard")!);

  // Połączenie danych testowych z danymi z localStorage
  scoreboardData = [...scoreboardData, ...fakeData];

  // Sortowanie danych tablicy wyników malejąco według wyniku
  scoreboardData = [...scoreboardData].sort((a, b) => b.score - a.score);

  // Renderowanie komponentu
  return (
    <div className="ScoreboardPage">
      {/* Nagłówek strony */}
      <h1>Scoreboard</h1>

      {/* Tabela wyników */}
      <table>
        {/* Nagłówek tabeli */}
        <thead>
          <tr>
            <th>Username</th> {/* Nazwa użytkownika */}
            <th>Moves</th> {/* Liczba ruchów */}
            <th>Score</th> {/* Wynik */}
          </tr>
        </thead>

        {/* Ciało tabeli */}
        <tbody>
          {/* Mapowanie danych tablicy wyników na wiersze tabeli */}
          {scoreboardData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td> {/* Nazwa użytkownika */}
              <td>{entry.moves}</td> {/* Liczba ruchów */}
              <td>{entry.score}</td> {/* Wynik */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
