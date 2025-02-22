import axios from 'axios';

const ESPN_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
const ESPN_SUMMARY_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=';
const ESPN_TEAMS_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams';

// Get all games from the ESPN API
export const getGames = async () => {
    const response = await axios.get(ESPN_URL);
    return response.data.events.map((event) => ({
        id: event.id,
        date: event.date,
        home_team: event.competitions[0].competitors[0].team.displayName,
        home_score: event.competitions[0].competitors[0].score,
        away_team: event.competitions[0].competitors[1].team.displayName,
        away_score: event.competitions[0].competitors[1].score,
    }));
};

// Get top performances
export const getPerformances = async (game_id) => {
  // Using flatMap because there are multiple arrays
  const response = await axios.get(`${ESPN_SUMMARY_URL}${game_id}`);
  const playerStats = response.data.boxscore.players.flatMap((team) => {
    return team.statistics.flatMap((stat) =>
      stat.athletes.map((athlete) => ({
        id: athlete.athlete.id,
        player: athlete.athlete.displayName,
        team: team.team.displayName,
        points: parseInt(athlete.stats[13]) || 0,
        assists: parseInt(athlete.stats[7]) || 0,
        rebounds: parseInt(athlete.stats[6]) || 0,
        steals: parseInt(athlete.stats[8]) || 0,
        blocks: parseInt(athlete.stats[9]) || 0,
      }))
    );
  });

  return playerStats;
};

// Get all the teams for favorites  
export const fetchTeams = async () => {
  try {
    const response = await fetch(ESPN_TEAMS_URL);
    const data = await response.json();
    
    const teams = data.sports[0].leagues[0].teams.map((team) => ({
      id: team.team.id,
      name: team.team.displayName,
    }));

    return teams; 
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

// Get all the players for favorites
export const fetchPlayers = async () => {
  try {
    const teamsResponse = await axios.get(ESPN_TEAMS_URL);
    const teams = teamsResponse.data.sports[0].leagues[0].teams;
    
    const playerPromises = teams.map(async (team) => {
      const teamId = team.team.id;
      const rosterResponse = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamId}/roster`);
      const rosterData = rosterResponse.data;

      return rosterData.athletes.map((player) => ({
        id: player.id,
        name: player.displayName,
        team: team.team.displayName,
      }));
    });

    const playerResults = await Promise.all(playerPromises);
    return playerResults.flat();
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

// Match a team with a game
export const findTeamGames = async (name) => {
  const response = await axios.get(ESPN_URL);
  const team_games = [];
  // Get the games
  const games = response.data.events.map((event) => ({
        id: event.id,
        date: event.date,
        home_team: event.competitions[0].competitors[0].team.displayName,
        home_score: event.competitions[0].competitors[0].score,
        away_team: event.competitions[0].competitors[1].team.displayName,
        away_score: event.competitions[0].competitors[1].score,
  }));

  // Push the games to the array
  for (let game of games) {
    if (game.home_team === name || game.away_team === name) {
      team_games.push(game);
    }
  }

  return team_games;

}

// Match a player with a perfomance
export const findPlayerPerfomances = async (id) => {
  try {
    // Get all games
    const games = await getGames();

    const playerPerformances = [];

    // Go through the games array to get performance data
    for (let game of games) {
      const performances = await getPerformances(game.id);
      // Find performances for the player with the given ID
      const playerStats = performances.find((player) => player.id === id);
      // Add playerStats to the performances array
      if (playerStats) {
        playerPerformances.push({
          gameId: game.id,
          date: game.date,
          opponent: game.home_team === playerStats.team ? game.away_team : game.home_team,
          ...playerStats,
        });
      }
    }
    return playerPerformances;
  } catch (error) {
    console.error("Error fetching player performances:", error);
    throw error;
  }
};
