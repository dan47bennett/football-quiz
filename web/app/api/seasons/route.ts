import { NextResponse } from 'next/server';

import { MongoClient, WithId } from 'mongodb';
import getMongoDbClient from '@/lib/getMongoDbClient';

export async function GET() {
    let client: MongoClient | undefined;

    try {
        client = await getMongoDbClient;
        console.log('Connected to MongoDB');
        const database = client.db('test-database');
        console.log('Accessing database...');

        const seasonsData = await database
            .collection('test-seasons-data')
            .find({})
            .limit(5)
            .toArray();

        console.log('seasonsData: ', seasonsData);
        return NextResponse.json(seasonsData);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        await client?.close();
    }
}
