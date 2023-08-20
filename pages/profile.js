import { useRouter } from 'next/router';
//import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { options } from '@/lib/options';

//https://www.youtube.com/watch?v=w2h54xz6Ndw&t=65s
function ProfilePage() {
  console.log('ProfilePage...');

  //return <h1>profile</h1>;
  getServerSession(options).then((session) => {
    console.log('session', session);
    //return <h1>profile</h1>;
    //if(!session) redirect('/api/auth/signin?callbackUrl=/server');
    return <>{session ? <h1>Logged in</h1> : <h1>Not logged in</h1>}</>;
  });

  //<User user={session?.user} />
}
export default ProfilePage;
