import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { stripe } from '../../services/stripe';
import Home, { getStaticProps } from '../../pages';

// simulando o useRouter
jest.mock('next/router');

// simulando o useSession do next-auth
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
});

// simulando o stripe
jest.mock('../../services/stripe');

describe('Home page', () => {
  // testando renderização da página Home
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />)

    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument();
  });

  // testando o getStaticProps da home
  it('loads initial data', async () => {
    const retrieveStripeMocked = mocked(stripe.prices.retrieve);

    retrieveStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    );
  });
})