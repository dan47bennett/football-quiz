import { delay } from '../utils';
import { Builder, Browser } from 'selenium-webdriver';
import getSeasonScores from './getSeasonScores';
import { SeasonStats } from '@/types';

async function scrapeLeagueTables(): Promise<{
    seasons: SeasonStats[];
    names: string[];
}> {
    console.log('Starting...');

    const seasons: string[] = [];

    for (let i = 1992; i <= 2025; i++) {
        const startYear = i;
        const endYearString = String(startYear + 1).slice(-2);
        seasons.push(`${startYear}-${endYearString}`);
    }

    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    const allSeasons: SeasonStats[] = [];

    let allNames: string[] = [];

    try {
        await Promise.all(
            seasons.map(async (season, i) => {
                await delay(5000 * i);

                try {
                    const { seasons, names } = await getSeasonScores(
                        driver,
                        season,
                    );
                    allSeasons.push(...seasons);

                    allNames = [...new Set([...allNames, ...names])];
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

    return { seasons: allSeasons, names: allNames };
}

export default scrapeLeagueTables;
