import { render, screen } from '@testing-library/react';
import GameCard from './GameCard';
import '@testing-library/jest-dom/extend-expect';

describe('GameCard', () => {
  const game = {
    home_team: 'Los Angeles Lakers',
    away_team: 'Golden State Warriors',
    home_score: 102,
    away_score: 98
  };

  test('matches snapshot', () => {
    const { asFragment } = render(<GameCard game={game} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
