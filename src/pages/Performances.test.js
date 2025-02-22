import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PerformancesPage from './Performances';

describe('PerformancesPage', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <PerformancesPage />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
