import { MongoClient, ServerApiVersion, MongoClientOptions } from 'mongodb';

// import secret uri
import { URI } from '../secret';

// create new MongoClient instance and export it
export const client: MongoClient = new MongoClient(URI);