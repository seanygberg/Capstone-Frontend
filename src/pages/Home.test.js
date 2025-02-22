import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Home />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
