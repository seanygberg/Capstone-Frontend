import React, { useState, useEffect } from 'react';
import { getGames } from '../api';
import GameCard from "../cards/GameCard"

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    loadGames();
  }, []);

  return (
    <div className="home-page">
      <h1>NBA Games</h1>
      <div className="game-list">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
