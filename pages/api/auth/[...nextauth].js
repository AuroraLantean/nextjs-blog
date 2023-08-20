import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase, getCollectionName } from '@/lib/db';
import { verifyPassword } from '@/lib/utils';
import { isInputsInvalid } from '@/lib/utils';
/**
Hit this API via `curl http://localhost:3000/api/auth/providers` to get NextAuth's signinURL and callbackURL

{"credentials":{"id":"credentials","name":"Credentials","type":"credentials","signinUrl":"http://localhost:3000/api/auth/signin/credentials","callbackUrl":"http://localhost:3000/api/auth/callback/credentials"}}%  
*/

//https://next-auth.js.org/configuration/nextjs
//https://next-auth.js.org/configuration/options

//import type { NextAuthOptions } from 'next-auth'

export const authOptions = {
  pages: {
    signIn: '/signin',
  },
  //https://next-auth.js.org/configuration/providers/credentials
  providers: [
    CredentialsProvider({
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
      },
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
        if (isInputsInvalid(email, password)) {
          throw new Error(data.message || 'invalid input');
        }
        console.log('authorize()...3');

        const client = await connectToDatabase();
        try {
          console.log('authorize()...4');
          const collectionName = getCollectionName();
          const usersCollection = client.db().collection(collectionName);

          const existingUser = await usersCollection.findOne({
            email: email,
          });
          console.log('authorize()...5:', existingUser);
          if (!existingUser) {
            client.close();
            throw new Error('No user found!');
          }
          const isValid = await verifyPassword(password, existingUser.password);
          console.log('authorize()...6 isValid', isValid);
          if (!isValid) {
            client.close();
            throw new Error('Incorrect password');
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
};

export default NextAuth(authOptions);
//const handler = NextAuth(authOptions);
//export { handler as GET, handler as POST };
