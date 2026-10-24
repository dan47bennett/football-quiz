import { MongoClient, ServerApiVersion } from 'mongodb';

require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const connectToMongoDb = async () => {
    console.log('here');
    try {
        await client.connect();
        console.log('You successfully connected to MongoDB!');

        await client.db('admin').command({ ping: 1 });
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!',
        );

        return client;
    } catch (err) {
        console.dir(err);
    }
};

export const disconnectFromMongoDb = async () => {
    try {
        await client.close();
        console.log('You successfully disconnected from MongoDB!');
    } catch (err) {
        console.dir(err);
    }
};
