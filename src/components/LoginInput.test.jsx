/**
 * test scenario
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByLabelText(/email/i);

    // action
    await userEvent.type(emailInput, 'test@email.com');

    // assert
    expect(emailInput).toHaveValue('test@email.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByLabelText(/password/i);

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // action
    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'test@email.com',
      password: 'passwordtest',
    });
  });
});