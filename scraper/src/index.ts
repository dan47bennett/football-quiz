import { addTeamsToDatabase } from './database';
import { scrapeLeagueTables } from './scraping';

async function runScraping() {
    const allTeams = await scrapeLeagueTables();

    try {
        await addTeamsToDatabase(allTeams);
        // await addTeamsToDatabase([]);
    } catch (err) {
        console.error('Error adding teams to database:', err);
    }
}

export default runScraping;
