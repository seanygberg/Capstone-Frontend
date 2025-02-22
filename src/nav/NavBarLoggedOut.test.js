import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoggedOutNavbar from './NavBarLoggedOut';

describe('LoggedOutNavbar', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <LoggedOutNavbar />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
