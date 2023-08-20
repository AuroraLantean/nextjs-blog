import Link from 'next/link';
import Logo from './logo';
import { useSession, signOut } from 'next-auth/react';
import classes from './main-navigation.module.css';

function MainNavigation() {
  //https://next-auth.js.org/getting-started/client#usesession
  const { data: session, status } = useSession();
  /* data = undefined initially, null if it failed to retrieve the session, Session if successful.
  # status = "loading" | "authenticated" | "unauthenticated"
  */
  console.log('MainNavigation... session', session, ', status:', status);
  function logoutHandler() {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
          <li>
            <Link href="/restricted">Restricted</Link>
          </li>
          {status !== 'authenticated' && (
            <li>
              <Link href="/authpage">Login</Link>
            </li>
          )}
          {status === 'authenticated' && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {status === 'authenticated' && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
