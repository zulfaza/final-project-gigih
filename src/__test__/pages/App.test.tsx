import 'jest-canvas-mock';
import { render, screen } from 'test/app-test-utils';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { randomString } from 'utils/make';
jest.mock('lottie-web');

test('if user can login', async () => {
  render(<App />, { route: '/' });
  const signInBtn: HTMLAnchorElement = screen.getByText(/Sign in/i);
  expect(signInBtn).toBeInTheDocument();
  userEvent.click(signInBtn);
  const uriPattern =
    /https:\/\/accounts.spotify.com\/authorize\?response_type=token&client_id=\w+&scope=.+&redirect_uri=((http(s)?:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/i;
  expect(signInBtn.href).toMatch(uriPattern);
});

test('try to access user page without login', () => {
  render(<App />, { route: '/create-playlist' });
  expect(window.location.pathname).toStrictEqual('/');
});

test('try to access guest page with token', () => {
  render(<App />, {
    route: `/#access_token=${randomString(
      40
    )}&token_type=Bearer&expires_in=3600`,
  });
  expect(window.location.pathname).toStrictEqual('/create-playlist');
  console.log(screen);
});

export {};
