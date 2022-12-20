import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top 100 list', () => {
  render(<App />);
  const linkElement = screen.getByText(/Santa Baby/i);
  expect(linkElement).toBeInTheDocument();
});
