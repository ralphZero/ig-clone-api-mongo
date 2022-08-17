import { Db, MongoClient } from 'mongodb';

import { URI } from '../../secret';

const client: MongoClient = new MongoClient(URI);

export const db = async () : Promise<Db> => {
    const mongo = await client.connect();
    return mongo.db('ig_clone');
}