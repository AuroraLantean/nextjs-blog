import { hashPassword } from '../../../lib/utils';
import { connectToDatabase } from '../../../lib/db';

//Do not clash with NextAuth.js's signin REST API that is used by the NextAuth.js client.
async function handler(req, res) {
  console.log('signup handler...');
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

    const existingUser = await usersCollection.findOne({ email: email });
    console.log('handler...5');

    if (existingUser) {
      client.close();
      res.status(422).json({ message: 'User exists already!' });
      return;
    }
    console.log('handler...6');
    const hashedPassword = await hashPassword(password);

    console.log('handler...7');
    const result = await usersCollection.insertOne({
      email: email,
      password: hashedPassword,
    });
    const newUserId = result.insertedId;
    console.log('handler...8, newUserId:', newUserId);

    client.close();
    res.status(201).json({ message: 'registered user', userId: newUserId });
    console.log('successful@registerUser handler');
  } catch (error) {
    console.log('error@ register(): ', error);
    client.close();
    res.status(500).json({ message: 'registerUser handler failed!' });
    return;
  }
}

export default handler;
