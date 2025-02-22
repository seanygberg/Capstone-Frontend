import React, { useState, useEffect } from 'react';
import { getGames, getPerformances } from '../api';

const PerformancesPage = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('points');

  useEffect(() => {
    // Loading the data in from the api
    const loadData = async () => {
      try {
        const games = await getGames();
        const performances = [];
        
        for (const game of games) {
          const gamePerformances = await getPerformances(game.id);

          const finalPerformances = gamePerformances.map((performance) => ({
            ...performance, performanceScore: performance.points 
            + performance.assists + performance.rebounds + performance.steals + performance.blocks,
            replies: [],
          }));

          performances.push(...finalPerformances);
        }
  
        setPerformances(performances);
      } catch (err) {
        setError('Failed to fetch performances. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  // Get the top 5 performances
  const topPerformances = [...performances].sort((a,b) => b.performanceScore - a.performanceScore).slice(0,5);

  // Sort the performances by the filter
  const sortedPerformances = [...performances].sort(
    (a, b) => b[sortBy] - a[sortBy]
  );

  // Current reply changed
  const handleReplyChange = (performanceId, replyText) => {
    setPerformances((prevPerformances) =>
      prevPerformances.map((performance) =>
        performance.id === performanceId
          ? { ...performance, currentReply: replyText }
          : performance
      )
    );
  };

  // New reply added
  const handleAddReply = (performanceId) => {
    setPerformances((prevPerformances) =>
      prevPerformances.map((performance) =>
        performance.id === performanceId
          ? {
              ...performance,
              replies: [...performance.replies, performance.currentReply],
              currentReply: '',
            }
          : performance
      )
    );
  };

  if (loading) return <p>Loading performances...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div className="performances-page">
      <h1>Top Performances</h1>
      <div className="performance-list">
        {topPerformances.map((performance, index) => (
            <div key={index} className="performance-card">
              <h3>#{index + 1} - {performance.player}</h3>
              <p>Team: {performance.team}</p>
              <p>{performance.points} Points</p>
              <p>{performance.assists} Assists</p>
              <p>{performance.rebounds} Rebounds</p>
              <p>{performance.steals} Steals</p>
              <p>{performance.blocks} Blocks</p>

              <div>
                <textarea
                  value={performance.currentReply || ''}
                  onChange={(e) =>
                    handleReplyChange(performance.id, e.target.value)
                  }
                  placeholder="Write a reply..."
                />
                <button onClick={() => handleAddReply(performance.id)}>
                  Add Reply
                </button>
              </div>

              <div className="replies">
                  {performance.replies.map((reply, idx) => (
                    <div key={idx} className="reply">
                      <p>{reply}</p>
                    </div>
                  ))}
              </div>

            </div>
          ))}
      </div>
      
      <h1> All Performances</h1>
      <div>
        <label>Sort by: </label>
        <select onChange={handleSort} value={sortBy}>
          <option value="points">Points</option>
          <option value="assists">Assists</option>
          <option value="rebounds">Rebounds</option>
          <option value="steals">Steals</option>
          <option value="blocks">Blocks</option>
        </select>
      </div>
      <div className="performance-list">
        {sortedPerformances.map((performance, index) => (
          <div key={index} className="performance-card">
            <h3>{performance.player}</h3>
            <p>Team: {performance.team}</p>
            <p>{performance.points} Points</p>
            <p>{performance.assists} Assists</p>
            <p>{performance.rebounds} Rebounds</p>
            <p>{performance.steals} Steals</p>
            <p>{performance.blocks} Blocks</p>

            <div>
                <textarea
                  value={performance.currentReply || ''}
                  onChange={(e) =>
                    handleReplyChange(performance.id, e.target.value)
                  }
                  placeholder="Write a reply..."
                />
                <button onClick={() => handleAddReply(performance.id)}>
                  Add Reply
                </button>
                <div className="replies">
                  {performance.replies.map((reply, idx) => (
                    <div key={idx} className="reply">
                      <p>{reply}</p>
                    </div>
                  ))}
              </div>

              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformancesPage;
