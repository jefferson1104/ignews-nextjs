import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

// criando um array com um post fake
const posts = [
  { slug: 'lorem-ipsum-post', title: 'Lorem Ipsum Post', excerpt: 'Post excerpt', updatedAt: 'April, 11'}
];

// simulando a biblioteca prismic
jest.mock('../../services/prismic');

describe('Posts page', () => {
  // testando renderização da página Home
  it('renders correctly', () => {
    render(<Posts  posts={posts} />);

    expect(screen.getByText('Lorem Ipsum Post')).toBeInTheDocument();
  });

   // testando o getStaticProps da pagina de listagem de posts
   it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockReturnValueOnce({
        results: [
          {
            uid: 'lorem-ipsum-post',
            data: {
              title: [
                {type: 'heading', text: 'Lorem Ipsum Post'}
              ],
              content: [
                {type: 'paragraph', text: 'Post excerpt'}
              ],
            },
            last_publication_date: '04-11-2021',
          }
        ]
      })
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'lorem-ipsum-post',
            title: 'Lorem Ipsum Post',
            excerpt: 'Post excerpt',
            updatedAt: '11 de abril de 2021'
          }]
        }
      })
    );
  });
})