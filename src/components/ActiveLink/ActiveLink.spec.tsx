import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

// simulando o useRouter (mockando no teste)
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('ActiveLink component', () => {
  // Testando renderização do componente activeLink
  it('renders correctly', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  // Testando o recebimento da classe css 'active'
  it('adds active class if the link as currently active', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toHaveClass('active');
  });
});