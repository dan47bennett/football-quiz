import { delay } from '../utils';
import { Builder, Browser } from 'selenium-webdriver';
import getSeasonScores from './getSeasonScores';

async function scrapeLeagueTables() {
    console.log('Starting...');

    const seasons = Array.from({ length: 2025 - 1992 + 1 }, (_, index) => {
        const startYear = 1992 + index;
        const endYearString = String(startYear + 1).slice(-2);

        return `${startYear}-${endYearString}`;
    });

    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    let allTeams: (Record<string, string>[] | undefined)[] = [];

    try {
        allTeams = await Promise.all(
            seasons.map(async (season, i) => {
                await delay(5000 * i);

                try {
                    const teams = await getSeasonScores(driver, season);
                    return teams;
                } catch (err) {
                    console.error(
                        `Error occurred while scraping season ${season}:`,
                        err,
                    );
                }
            }),
        );

        console.log('allTeams: ', allTeams);
    } catch (err) {
        console.log('overall err: ', err);
    } finally {
        await driver.quit();
    }
}

export default scrapeLeagueTables;
