import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProviders from 'core/context';

async function render(ui: JSX.Element, { route = '/list', ...renderOptions }) {
  window.history.pushState({}, 'Test page', route);
  return rtlRender(ui, {
    wrapper: AppProviders,
    ...renderOptions,
  });
}

export * from '@testing-library/react';
export { render, userEvent };
