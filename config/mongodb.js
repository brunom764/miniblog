import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI || "" // trick ts :(
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function insertComment(comment) {
  const { client, db } = await connectToDatabase();

  await db.collection('comments').insertOne({
    ...comment,
    createdAt: new Date(),
  });

  client.close();
}

export async function getComments(postId) {
  const { client, db } = await connectToDatabase();

  const comments = await db
    .collection('comments')
    .find({ postId })
    .sort({ createdAt: -1 })
    .toArray();

  client.close();

  return comments;
}
