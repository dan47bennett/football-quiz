import { SeasonStats } from '@/types';
import { connectToMongoDb, disconnectFromMongoDb } from './mongoDbConnect';
import { ObjectId } from 'mongodb';

async function addSeasonsToDatabase(teams: string[], seasons: SeasonStats[]) {
    try {
        const client = await connectToMongoDb();

        if (client) {
            const database = client.db('test-database');

            const teamsCollection = database.collection('test-team-data');

            await teamsCollection.drop();

            const numberOfDocuments = await teamsCollection.countDocuments({});

            if (numberOfDocuments === 0) {
                const result = await teamsCollection.insertMany(
                    teams.map((team) => ({ name: team })),
                );

                const ids = result.insertedIds;

                for (let id of Object.values(ids)) {
                    console.log(`Inserted a team document with id ${id}`);
                }
            }

            const seasonsCollection = await database.createCollection(
                'test-seasons-data',
                {
                    validator: {
                        $jsonSchema: {
                            bsonType: 'object',
                            title: 'Season Validation',
                            properties: {
                                team: {
                                    type: ObjectId,
                                    description: 'Must be ObjectId of team',
                                },
                            },
                        },
                    },
                },
            );

            const results = await Promise.all(
                seasons.map(async (season) => {
                    const teamId = await teamsCollection.findOne({
                        name: season.team,
                    });

                    const newSeason = {
                        ...season,
                        team: teamId?._id,
                    };

                    return seasonsCollection.insertOne(newSeason);
                }),
            );

            const ids = results.map((r) => r.insertedId);

            for (let id of Object.values(ids)) {
                console.log(`Inserted a season document with id ${id}`);
            }
        } else {
            throw 'No database connection';
        }
    } catch (err) {
        console.error('Error addding seasons to database:', err);
    } finally {
        await disconnectFromMongoDb();
    }
}

export default addSeasonsToDatabase;
