import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    console.log('req.body: ' + JSON.stringify(req.body));

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };
    console.log('New message: ' + JSON.stringify(newMessage));

    let client;
    let isConnected = false;
    if (!process.env.MONGODB_USERNAME)
      return console.log('MONGODB_USERNAME not found');
    if (!process.env.MONGODB_PASSWORD)
      return console.log('MONGODB_PASSWORD not found');
    if (!process.env.MONGODB_URLX) return console.log('MONGODB_URLX not found');
    if (isConnected) return console.log('Already connected to MongoDB');

    try {
      const dbusername = encodeURIComponent(process.env.MONGODB_USERNAME);
      const dbpassword = encodeURIComponent(process.env.MONGODB_PASSWORD);

      const connStr = `mongodb+srv://${dbusername}:${dbpassword}@${process.env.MONGODB_URLX}`;
      console.log('connStr:', connStr);

      client = await MongoClient.connect(connStr);
    } catch (error) {
      console.log('error@@MongoClient.connect(): ', error);
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }
    console.log('successful@MongoClient.connect()');
    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage); //this collection will be generated if it does not exist
      newMessage.id = result.insertedId;
    } catch (error) {
      console.log('error@db.collection(): ', error);
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    } finally {
      client.close();
    }
    console.log('successful@db.collection()');

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
