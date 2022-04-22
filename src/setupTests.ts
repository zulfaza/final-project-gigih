// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import server from '__test__/msw/server';
import { setupIntersectionObserverMock } from 'test/setupIntersectionObserverMock';

beforeAll(() => {
  server.listen();
  localStorage.clear();
  setupIntersectionObserverMock();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
