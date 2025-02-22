import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './Signup';

describe('SignUp', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
