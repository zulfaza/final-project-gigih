import 'jest-canvas-mock';
import { render, screen, waitFor } from 'test/app-test-utils';
import userEvent from '@testing-library/user-event';
import App from 'App';
jest.mock('lottie-web');

describe('trying create playlist page', () => {
  test('try to access guest page with token and search', async () => {
    render(<App />, {
      route: `/#access_token=asdfasf&token_type=Bearer&expires_in=3600`,
    });
    expect(window.location.pathname).toStrictEqual('/create-playlist');
    const input = screen.getByTestId('searchForm');
    userEvent.type(input, '88rising');
    await waitFor(async () => {
      const tracks = await screen.findAllByTestId('track-item');
      tracks.forEach((track) => expect(track).toBeInTheDocument());
    });
  });
});
