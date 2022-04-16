import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from 'pages/Login';
import 'jest-canvas-mock';

test('if user can login', async () => {
  render(<Login />);
  it('should have image', () => {
    const signInBtn = screen.getByAltText(/Sign in/i);
    console.log(signInBtn);

    expect(signInBtn).toBeInTheDocument();
  });
});

export {};
