import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Favorites from './Favorites';

describe('Favorites', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Favorites />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
