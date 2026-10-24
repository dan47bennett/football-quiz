import { TeamStats } from '@/types';
import { connectToMongoDb, disconnectFromMongoDb } from './mongoDbConnect';
import { MongoClient } from 'mongodb';
import createDatabase from './createDatabase';

async function addTeamsToDatabase(teams: TeamStats[]) {
    let client: MongoClient | undefined;

    try {
        client = await connectToMongoDb();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        await disconnectFromMongoDb();
    }

    try {
        if (client) {
            await createDatabase(client);
        } else {
            throw 'No database connection';
        }
    } catch (err) {
        console.error('Error adding teams to database:', err);
    }
}

export default addTeamsToDatabase;
