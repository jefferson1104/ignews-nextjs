import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
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

// simulando next/router
jest.mock('next/router');

// simulando a biblioteca prismic
jest.mock('../../services/prismic');

describe('Post preview page', () => {
  // testando renderização da página de Post
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText('Lorem Ipsum Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  // teste de redirecionamento para o post caso o usuario esteja autenticado e tenha uma inscricao ativa
  it('redirects user to full post when user is subscribed', async () => {   
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);


    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/lorem-ipsum-post');
  });

  // teste verifica os dados carregados do getStaticProps
  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

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

    const response = await getStaticProps({ params: { slug: 'lorem-ipsum-post' } });

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
