import { render, screen } from '@testing-library/react';
import { Header } from '.';

// simulando o useRouter
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

// simulando o useSession do next-auth
jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
});

describe('Header component', () => {
  // Testando renderização do componente Header
  it('renders correctly', () => {
    render(
      <Header />
    );

    screen.logTestingPlaygroundURL();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});