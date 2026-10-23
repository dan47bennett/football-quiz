import { TeamStats } from '@/types';
import { By, WebDriver } from 'selenium-webdriver';

async function getSeasonScores(
    driver: WebDriver,
    season: string,
): Promise<TeamStats[]> {
    await driver.get(
        `https://www.premierleague.com/en/tables/premier-league/${season}/`,
    );

    const teams: TeamStats[] = [];

    for (let i = 1; i < 25; i++) {
        const xpath = `//*[@id="main-content"]/div[1]/div[2]/section/div[2]/table/tbody/tr[${i}]`;

        try {
            const element = await driver.findElement(By.xpath(xpath));

            if (element) {
                const columns = await element.findElements(By.tagName('td'));

                const teamName = (await columns[1].getText()).split('\n')[0];
                const goalsFor = await columns[6].getText();
                const goalsAgainst = await columns[7].getText();
                const goalDifference = await columns[8].getText();

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
}

export default getSeasonScores;
