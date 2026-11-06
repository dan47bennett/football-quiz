import { NextResponse } from 'next/server';

import getMongoDbClient from '@/lib/getMongoDbClient';

export async function GET() {
    try {
        const client = await getMongoDbClient;

        console.log('Connected to MongoDB');
        const database = client.db('test-database');
        console.log('Accessing database...');

        const databaseCollection = database.collection('test-seasons-data');

        const seasonsData = await databaseCollection
            .aggregate([{ $sample: { size: 1 } }])
            .toArray();

        return NextResponse.json(seasonsData);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
