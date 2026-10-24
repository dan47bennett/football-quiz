import { MongoClient } from 'mongodb';

async function createDatabase(client: MongoClient) {
    const database = client.db('test-database');
    console.log('database: ', database);
}

export default createDatabase;
