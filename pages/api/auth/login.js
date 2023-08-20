import { verifyPassword } from '@/lib/utils';
import { connectToDatabase } from '../../../lib/db';

//Do not clash with NextAuth.js's signin REST API that is used by the NextAuth.js client.
async function handler(req, res) {
  console.log('login handler...');
  if (req.method !== 'POST') {
    return;
  }
  console.log('handler...1');
  const reqBody = req.body;

  const { email, password } = reqBody;
  console.log('handler... email:', email, ', password:', password);

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input',
    });
    return;
  }
  console.log('handler...3');

  const client = await connectToDatabase();
  try {
    console.log('handler...4');

    const usersCollection = client.db().collection('max_users');

    const existingUser = await usersCollection.findOne({
      email: email,
    });
    console.log('handler...5:', existingUser);
    if (!existingUser) {
      client.close();
      res.status(422).json({ message: 'User not found' });
      return;
    }
    const isValid = await verifyPassword(password, existingUser.password);
    console.log('handler...6');
    if (!isValid) {
      client.close();
      res.status(422).json({ message: 'could not sign in' });
      return;
    }
    client.close();
    res.status(201).json({ message: 'signed in successful', userId: 0 });
    console.log('successful@login handler');
  } catch (error) {
    console.log('error@ login(): ', error);
    client.close();
    res.status(500).json({ message: 'signing in failed!' });
    return;
  }
}
export default handler;
