import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

//https://next-auth.js.org/configuration/nextjs
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log('getServerSideProps session:', session);
  if (!session) {
    return {
      redirect: {
        destination: '/authpage',
        permanent: false,
      },
    };
  }
  session.user.name = '';
  session.user.image = '';
  console.log('profile/getServerSideProps: ', session.user.email);
  return {
    props: { session },
  };
}

export default ProfilePage;
