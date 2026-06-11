import { MongoClient, Db } from 'mongodb';

export function resolveMongoConfig(env: NodeJS.ProcessEnv = process.env) {
  const uri = env.MONGODB_URI || env.MONGODB_URI_ALT || env.MONGODB_URI_SECONDARY;
  const dbName = env.MONGODB_DB || 'cdrc';

  return { uri, dbName };
}

const { uri, dbName } = resolveMongoConfig();

const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('No MongoDB URI environment variable is set. Please set MONGODB_URI or MONGODB_URI_ALT.');
  }

  if (clientPromise) return clientPromise;

  if (process.env.NODE_ENV === 'development') {
    // Reuse connection in dev to avoid exhausting connections on HMR
    const g = global as typeof global & { _mongoClientPromise?: Promise<MongoClient> };
    if (!g._mongoClientPromise) {
      g._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    clientPromise = g._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri, options).connect();
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

export default getClientPromise;
