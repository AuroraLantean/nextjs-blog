import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // `session` comes from `getServerSideProps` or `getInitialProps`.
  // Avoids flickering/session loading on first load.
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
