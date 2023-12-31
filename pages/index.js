import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Blog Site</title>
        <meta
          name="description"
          content="I post about Web3 programming, blockchain, and cryptocurrency"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  //console.log('Mainpage: getStaticProps(): featuredPosts:', featuredPosts);

  return {
    props: {
      posts: featuredPosts,
    },
    //revalidate: 60
  };
}

export default HomePage;
