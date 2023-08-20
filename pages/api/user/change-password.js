// custom APIs: /api/user/change-password

import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { hashPassword, verifyPassword } from '@/lib/utils';
import { connectToDatabase, getCollectionName } from '@/lib/db';
import { isInputsInvalid } from '@/lib/utils';

async function handler(req, res) {
  console.log('changepw...');
  if (req.method !== 'PATCH') {
    res.status(401).json({ message: 'only PATCh is allowed' });
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  console.log('changepw...1');
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }
  console.log('changepw...2');
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  console.log(
    'changepw...userEmail"',
    userEmail,
    ', oldPassword:',
    oldPassword,
    ', newPassword:',
    newPassword
  );
  if (isInputsInvalid(userEmail, newPassword)) {
    res.status(401).json({ message: 'invalid input' });
    return;
  }
  const client = await connectToDatabase();
  const collectionName = getCollectionName();
  const usersCollection = client.db().collection(collectionName);

  const user = await usersCollection.findOne({ email: userEmail });
  console.log('changepw...5. user:', user);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  console.log('changepw...9');
  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Incorrect password.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  console.log('changepw... result:', result);
  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
