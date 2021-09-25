import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>21 de abril de 2021</time>
            <strong>Creating monorepo application</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.</p>
          </a>
          <a href='#'>
            <time>21 de abril de 2021</time>
            <strong>Creating monorepo application</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.</p>
          </a>
          <a href='#'>
            <time>21 de abril de 2021</time>
            <strong>Creating monorepo application</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response =  await prismic.query([
    Prismic.predicates.at('document.type', 'pos')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  console.log('CONSOLANDO POSTS:', response)

  return {
    props: {

    }
  }
}

