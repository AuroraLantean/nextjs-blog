import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession } from 'next-auth/react';
//import { getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';

function UserProfile() {
  console.log('UserProfile...');
  //https://next-auth.js.org/getting-started/client#usesession
  const { data: session, status } = useSession();
  /* data = undefined initially, null if it failed to retrieve the session, Session if successful.
  # status = "loading" | "authenticated" | "unauthenticated"
  */
  const router = useRouter();
  if (status === 'loading') {
    return <p className={classes.profile}>Loading...</p>;
  } else if (status === 'unauthenticated') {
    router.replace('/');
  }

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('changePasswordHandler => data:', data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm changePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
