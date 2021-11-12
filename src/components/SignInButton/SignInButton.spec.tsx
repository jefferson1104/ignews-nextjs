import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';
import { SignInButton } from '.';

// simulando o useSession do next-auth
jest.mock('next-auth/client');

describe('SignInButton component', () => {
  // Testando renderização do componente SignInButton quando usuário não está logado
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);
    
    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  // Testando renderização do componente SignInButton quando está logado
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValue([
      {
        user: {
          name: 'Jhon Doe',
          email: 'jhondoe@example.com'
        },
        expires: 'fake-expires'
      }, false]);
    
    render(<SignInButton />);

    expect(screen.getByText('Jhon Doe')).toBeInTheDocument();
  });
});