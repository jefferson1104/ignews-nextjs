import { render } from '@testing-library/react';
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
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  // Testando o recebimento da classe css 'active'
  it('adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toHaveClass('active');
  });
});