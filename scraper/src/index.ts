import { addTeamsToDatabase } from './database';
import { scrapeLeagueTables } from './scraping';

async function runScraping() {
    const { teams, names } = await scrapeLeagueTables();
    console.log('names: ', names);
    console.log('teams: ', teams);

    try {
        // await addTeamsToDatabase(teams);
        // await addTeamsToDatabase([]);
    } catch (err) {
        console.error('Error adding teams to database:', err);
    }
}

export default runScraping;
