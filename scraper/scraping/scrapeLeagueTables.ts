import { delay } from '../utils';
import { Builder, Browser } from 'selenium-webdriver';
import getSeasonScores from './getSeasonScores';
import { TeamStats } from '@/types';

async function scrapeLeagueTables(): Promise<TeamStats[]> {
    console.log('Starting...');

    const seasons: string[] = [];

    for (let i = 1992; i <= 2025; i++) {
        const startYear = i;
        const endYearString = String(startYear + 1).slice(-2);
        seasons.push(`${startYear}-${endYearString}`);
    }

    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    const allTeams: TeamStats[] = [];

    try {
        await Promise.all(
            seasons.map(async (season, i) => {
                await delay(5000 * i);

                try {
                    const teams = await getSeasonScores(driver, season);
                    allTeams.push(...teams);
                } catch (err) {
                    console.error(
                        `Error occurred while scraping season ${season}:`,
                        err,
                    );
                }
            }),
        );
    } catch (err) {
        console.log('overall err: ', err);
    } finally {
        await driver.quit();
    }

    return allTeams;
}

export default scrapeLeagueTables;
