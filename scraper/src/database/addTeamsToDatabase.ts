import { TeamStats } from '@/types';
import { connectToMongoDb, disconnectFromMongoDb } from './mongoDbConnect';

async function addTeamsToDatabase(teams: TeamStats[]) {
    try {
        const client = await connectToMongoDb();

        if (client) {
            const database = client.db('test-database');

            const collection = database.collection('test-team-data');

            const result = await collection.insertMany(teams);

            const ids = result.insertedIds;

            for (let id of Object.values(ids)) {
                console.log(`Inserted a document with id ${id}`);
            }
        } else {
            throw 'No database connection';
        }
    } catch (err) {
        console.error('Error addding teams to database:', err);
    } finally {
        await disconnectFromMongoDb();
    }
}

export default addTeamsToDatabase;
