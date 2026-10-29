import { SeasonStats } from '@/types';
import { addSeasonsToDatabase } from './database';
import { scrapeLeagueTables } from './scraping';

const testDataTeams: string[] = ['Team A', 'Team B', 'Team C'];

const testDataSeasons: SeasonStats[] = [
    {
        goalDifference: '5',
        goalsAgainst: '40',
        goalsFor: '50',
        season: '2023-24',
        team: 'Team A',
    },
    {
        goalDifference: '7',
        goalsAgainst: '50',
        goalsFor: '60',
        season: '2003-04',
        team: 'Team B',
    },
    {
        goalDifference: '-10',
        goalsAgainst: '70',
        goalsFor: '20',
        season: '1997-98',
        team: 'Team C',
    },
];

async function runScraping() {
    const { seasons, names } = await scrapeLeagueTables();

    try {
        await addSeasonsToDatabase(names, seasons);
        // await addSeasonsToDatabase(testDataTeams, testDataSeasons);
    } catch (err) {
        console.error('Error adding seasons to database:', err);
    }
}

export default runScraping;
