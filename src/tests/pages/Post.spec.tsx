import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

// criando um array com um post fake
const post = { 
  slug: 'lorem-ipsum-post', 
  title: 'Lorem Ipsum Post', 
  content: '<p>Post excerpt</p>', 
  updatedAt: 'April, 11'
};

// simulando next-auth client
jest.mock('next-auth/client');

// simulando a biblioteca prismic
jest.mock('../../services/prismic');

describe('Post page', () => {
  // testando renderização da página de Post
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('Lorem Ipsum Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

  // teste de redirecionamento caso nao estiver com inscricao ativa
  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'lorem-ipsum-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    );
  });

  // teste verifica os dados carregados do getserversideprops
  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {type: 'heading', text: 'Lorem Ipsum Post'}
          ],
          content: [
            {type: 'paragraph', text: 'Post excerpt'}
          ],
        },
        last_publication_date: '04-11-2021'
      })
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'lorem-ipsum-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'lorem-ipsum-post', 
            title: 'Lorem Ipsum Post', 
            content: '<p>Post excerpt</p>', 
            updatedAt: '11 de abril de 2021'
          }
        }
      })
    );

  });
})
