import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';

async function scrape() {
    console.log('Starting...');

    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get(
            'https://www.premierleague.com/en/tables/premier-league/1993-94/',
        );

        const teams: Record<string, string>[] = [];

        for (let i = 1; i < 25; i++) {
            const xpath = `//*[@id="main-content"]/div[1]/div[2]/section/div[2]/table/tbody/tr[${i}]`;

            try {
                const element = await driver.findElement(By.xpath(xpath));

                if (element) {
                    const columns = await element.findElements(
                        By.tagName('td'),
                    );

                    const teamName = await columns[1].getText();
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
                console.log('err: ', err);
            }
        }

        console.log('teams: ', teams);
    } finally {
        await driver.quit();
    }
}

async function main() {
    await scrape();
}

void main();
