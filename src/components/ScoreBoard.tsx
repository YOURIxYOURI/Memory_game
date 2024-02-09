
import React from 'react';
import '../styles/ScoreBoard.css';

const fakeData = [
  { username: 'user1', moves: 10, score: 1000 },
  { username: 'user2', moves: 12, score: 220 },
  { username: 'user3', moves: 15, score: 180 },
];

const ScoreBoard: React.FC = () => {

  var scoreboardData = JSON.parse(localStorage.getItem("scoreboard") || "[]");
  scoreboardData = [...scoreboardData, ...fakeData]
  scoreboardData = [...scoreboardData].sort((a, b) => b.score - a.score);
  return (
    <div className="ScoreboardPage">
      <h1>Scoreboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Moves</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreboardData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.moves}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
