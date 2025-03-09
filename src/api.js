import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Get all games from your backend
export const getGames = async () => {
    const response = await axios.get(`${BASE_URL}/games`);
    return response.data;
};

// Get top performances from your backend
export const getPerformances = async (game_id) => {
    const response = await axios.get(`${BASE_URL}/performances/${game_id}`);
    return response.data;
};

// Get all the teams for favorites from your backend
export const fetchTeams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

// Get all the players for favorites from your backend
export const fetchPlayers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/players`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

// Match a team with a game from your backend
export const findTeamGames = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/team/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team games:", error);
    throw error;
  }
};

// Match a player with a performance from your backend
export const findPlayerPerfomances = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/performances/player/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching player performances:", error);
    throw error;
  }
};
