import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      track: {
        name: 'Test Song',
        artist: 'Test Artist',
        url: 'https://open.spotify.com/',
      },
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders portfolio content and the latest Spotify track', async () => {
  render(<App />);
  expect(screen.getByText(/Nithilan Elangovan/)).toBeInTheDocument();
  expect(await screen.findByText('Test Song')).toBeInTheDocument();
});
