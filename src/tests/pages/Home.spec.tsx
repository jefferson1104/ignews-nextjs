import { render, screen } from '@testing-library/react';
import Home from '../../pages';

// simulando o useRouter
jest.mock('next/router');

// simulando o useSession do next-auth
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
});

describe('Home page', () => {
  // Testando renderização da página Home
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />)

    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument();
  });
})