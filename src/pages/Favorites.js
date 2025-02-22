import React, { useState, useEffect } from 'react';
import { fetchTeams, fetchPlayers, findTeamGames, findPlayerPerfomances } from '../api';

const Favorites = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamScores, setTeamScores] = useState({});
  const [playerPerformances, setPlayerPerformances] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const teamData = await fetchTeams();
        setTeams(teamData);
        const playerData = await fetchPlayers();
        setPlayers(playerData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadTeamScores = async () => {
      const scores = {};
      for (const team of favoriteTeams) {
        const games = await findTeamGames(team.name);
        if (games.length > 0) {
          const latestGame = games[0]; // Assuming the first game is the most recent
          scores[team.id] = {
            opponent: latestGame.home_team === team.name ? latestGame.away_team : latestGame.home_team,
            team_score: latestGame.home_team === team.name ? latestGame.home_score : latestGame.away_score,
            opponent_score: latestGame.away_team === team.name ? latestGame.home_score : latestGame.away_score,
            result: latestGame.home_team === team.name ? (latestGame.home_score > latestGame.away_score ? "W" : latestGame.home_score < latestGame.away_score
          ? "L" : "T") : (latestGame.away_score > latestGame.home_score ? "W" : latestGame.away_score < latestGame.home_score ? "L": "T"),
          };
        }
      }
      setTeamScores(scores);
    };

    if (favoriteTeams.length > 0) {
      loadTeamScores();
    }
  }, [favoriteTeams]);

  useEffect(() => {
    const loadPlayerStats = async () => {
      const performances = {};
      for (const player of favoritePlayers) {
        const players = await findPlayerPerfomances(player.id);
        performances[player.id] = players;
      }
      setPlayerPerformances(performances);
    }
    loadPlayerStats();
  }, [favoritePlayers])

  const handleAddFavoritePlayer = () => {
    if (selectedPlayer) {
      const player = players.find((p) => p.id === selectedPlayer);
      if (!favoritePlayers.some((p) => p.id === selectedPlayer)) {
        setFavoritePlayers([...favoritePlayers, player]);
        setSelectedPlayer('');
      }
    }
  };

  const handleAddFavoriteTeam = () => {
    if (selectedTeam) {
      const team = teams.find((t) => t.id === selectedTeam);
      if (!favoriteTeams.some((t) => t.id === selectedTeam)) {
        setFavoriteTeams([...favoriteTeams, team]);
        setSelectedTeam('');
      }
    }
  };

  const handleRemoveFavoritePlayer = (playerId) => {
    setFavoritePlayers(favoritePlayers.filter((player) => player.id !== playerId));
  };

  const handleRemoveFavoriteTeam = (teamId) => {
    setFavoriteTeams(favoriteTeams.filter((team) => team.id !== teamId));
  };

  console.log(playerPerformances);

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>

      <div>
        <h2>Add a Player</h2>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">Select a Player</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name} - {player.team}
            </option>
          ))}
        </select>
        <button onClick={handleAddFavoritePlayer}>Add Player</button>
      </div>

      <div>
        <h2>Your Favorite Players</h2>
        {favoritePlayers.length === 0 ? (
          <p>No favorite players yet.</p>
        ) : (
          <ul>
            {favoritePlayers.map((player) => (
              <li key={player.id} className="favorite-card">
                {player.name} - {' '}
                {playerPerformances[player.id] && playerPerformances[player.id][0] ? (
                  <span>
                    {playerPerformances[player.id][0].points} Points, 
                    {playerPerformances[player.id][0].assists} Assists, 
                    {playerPerformances[player.id][0].rebounds} Rebounds, 
                    {playerPerformances[player.id][0].steals} Steals, 
                    {playerPerformances[player.id][0].blocks} Blocks
                  </span>
                ) : (
                  <span>No performance data available</span>
                )}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFavoritePlayer(player.id)}
                >
                  Remove Player
                </button>
              </li>
            ))}
          </ul>

        )}
      </div>

      <div>
        <h2>Add a Team</h2>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddFavoriteTeam}>Add Team</button>
      </div>

      <div>
        <h2>Your Favorite Teams</h2>
        {favoriteTeams.length === 0 ? (
          <p>No favorite teams yet.</p>
        ) : (
          <ul>
            {favoriteTeams.map((team) => (
              <li key={team.id} className="favorite-card">
                {team.name}{' '}
                {teamScores[team.id] && (
                  <span>
                    {teamScores[team.id].result} {teamScores[team.id].team_score} - {teamScores[team.id].opponent_score} vs{' '}
                    {teamScores[team.id].opponent}
                  </span>
                )}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFavoriteTeam(team.id)}
                >
                  Remove Team
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;