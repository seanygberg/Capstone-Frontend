import React from 'react';
import "./cards.css"

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <h3>{game.home_team} vs {game.away_team}</h3>
      <p>Score: {game.home_score} - {game.away_score}</p>
    </div>
  );
};

export default GameCard;