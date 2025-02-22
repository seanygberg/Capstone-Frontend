import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Login', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Login />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
