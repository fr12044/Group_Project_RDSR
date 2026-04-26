import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const originalFetch = global.fetch

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ products: [] })
    })
  )
})

afterAll(() => {
  global.fetch = originalFetch
})

test('renders dashboard heading', async () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /welcome back/i });
  expect(headingElement).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText(/loading product feed/i)).not.toBeInTheDocument();
  });
});
