import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrape() {
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
                    await driver.get(
                        `https://www.premierleague.com/en/tables/premier-league/${season}/`,
                    );

                    const teams: Record<string, string>[] = [];

                    for (let i = 1; i < 25; i++) {
                        const xpath = `//*[@id="main-content"]/div[1]/div[2]/section/div[2]/table/tbody/tr[${i}]`;

                        try {
                            const element = await driver.findElement(
                                By.xpath(xpath),
                            );

                            if (element) {
                                const columns = await element.findElements(
                                    By.tagName('td'),
                                );

                                const teamName = (
                                    await columns[1].getText()
                                ).split('\n')[0];
                                const goalsFor = await columns[6].getText();
                                const goalsAgainst = await columns[7].getText();
                                const goalDifference =
                                    await columns[8].getText();

                                const teamValue = {
                                    teamName,
                                    goalDifference,
                                    goalsAgainst,
                                    goalsFor,
                                };

                                teams.push(teamValue);
                            }
                        } catch (err) {
                            continue;
                        }
                    }

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

async function main() {
    await scrape();
}

void main();
