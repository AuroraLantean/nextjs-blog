import Head from 'next/head';
import { Fragment } from 'react';

import AllPosts from '../../components/posts/all-posts';
//import { getAllPosts } from '../../lib/posts-util';

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'getting-started-with-nextjs',
    image: 'getting-started-with-nextjs960.png',
    excerpt:
      'NextJs is a React Framework for production. It makes building fullstack React apps and sites a breeze and ships with built-in SSR. Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.',
    date: '2023-08-18',
  },
  {
    slug: 'mastering-javascript',
    title: 'mastering-javascript',
    image: 'mastering-javascript960.png',
    excerpt:
      'JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.',
    date: '2023-09-19',
  },
  {
    slug: 'nextjs-file-based-routing',
    title: 'nextjs-file-based-routing',
    image: 'nextjs-file-based-routing960.png',
    excerpt:
      'The Pages Router has a file-system based router built on concepts of pages. When a file is added to the pages directory it is automatically available as a route. Learn more about routing in the Pages Router:',
    date: '2023-10-20',
  },
];

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}

/*export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}*/

export default AllPostsPage;
