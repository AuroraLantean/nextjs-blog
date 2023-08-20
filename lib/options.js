import CredentialsProvider from 'next-auth/providers/credentials';

//import type { NextAuthOptions } from 'next-auth'

export const options = {
  pages: {
    signIn: '/signin',
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
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'signupUser failed');
        }
        console.log('successfull@ signupUser');
      },
    }),
  ],
};
