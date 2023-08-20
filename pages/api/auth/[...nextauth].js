import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import { verifyPassword } from '@/lib/utils';
/**
Hit this API via `curl http://localhost:3000/api/auth/providers` to get NextAuth's signinURL and callbackURL

{"credentials":{"id":"credentials","name":"Credentials","type":"credentials","signinUrl":"http://localhost:3000/api/auth/signin/credentials","callbackUrl":"http://localhost:3000/api/auth/callback/credentials"}}%  
*/

//https://next-auth.js.org/configuration/options
export default NextAuth({
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  //https://next-auth.js.org/configuration/providers/credentials
  providers: [
    CredentialsProvider({
      //we use our own form
      // name: 'Credentials',
      // credentials: {
      //   username: {
      //     label: 'Username',
      //     type: 'text',
      //     placeholder: 'your-username',
      //   },
      //   password: {
      //     label: 'Password',
      //     type: 'password',
      //     placeholder: 'your-password',
      //   },
      // },
      async authorize(credentials, req) {
        console.log('authorize()...');
        //use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        //DO NOT BRING backend validation code into frontend!!! => Use API to validate!
        const email = credentials.email;
        const password = credentials.password;
        if (
          !email ||
          !email.includes('@') ||
          !password ||
          password.trim().length < 7
        ) {
          throw new Error(data.message || 'invalid input');
        }
        console.log('authorize()...3');

        const client = await connectToDatabase();
        try {
          console.log('authorize()...4');

          const usersCollection = client.db().collection('max_users');

          const existingUser = await usersCollection.findOne({
            email: email,
          });
          console.log('authorize()...5:', existingUser);
          if (!existingUser) {
            client.close();
            throw new Error('No user found!');
          }
          const isValid = await verifyPassword(password, existingUser.password);
          console.log('authorize()...6');
          if (!isValid) {
            client.close();
            throw new Error('Could not log you in!');
          }
          client.close();
          return { email: existingUser.email }; //will be encocded into a JWT !!!
        } catch (error) {
          console.log('error@ login(): ', error);
          client.close();
          throw new Error('auth failed...');
        }
      },
    }),
  ],
});
//const handler = NextAuth(options);
//export { handler as GET, handler as POST };
