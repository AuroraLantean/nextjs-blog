import { MongoClient } from 'mongodb';

export function getCollectionName() {
  const mongodb_collectionname = process.env.MONGODB_COLLECTION;
  if (!mongodb_collectionname)
    return console.log('MONGODB_COLLECTION not found');
  return mongodb_collectionname;
}

export async function connectToDatabase() {
  console.log('connectToDatabase()...');
  let client;
  let isConnected = false;
  if (!process.env.MONGODB_USERNAME)
    return console.log('MONGODB_USERNAME not found');
  if (!process.env.MONGODB_PASSWORD)
    return console.log('MONGODB_PASSWORD not found');
  if (!process.env.MONGODB_CLUSTER)
    return console.log('MONGODB_CLUSTER not found');
  if (!process.env.MONGODB_URLX) return console.log('MONGODB_URLX not found');
  if (isConnected) return console.log('Already connected to MongoDB');

  try {
    const dbusername = encodeURIComponent(process.env.MONGODB_USERNAME);
    const dbpassword = encodeURIComponent(process.env.MONGODB_PASSWORD);

    const connStr = `mongodb+srv://${dbusername}:${dbpassword}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_URLX}`;
    //console.log('connStr:', connStr);

    client = await MongoClient.connect(connStr);
  } catch (error) {
    console.log('error@@MongoClient.connect(): ', error);
    res.status(500).json({ message: 'Could not connect to database.' });
    return;
  }
  console.log('successful@MongoClient.connect()');
  /*const client = await MongoClient.connect(
    'mongodb+srv://maximilian:ZbJcz3dJ88LSUMlM@cluster0.ntrwp.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );*/
  return client;
}
