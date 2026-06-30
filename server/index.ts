import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';

async function example() {
    console.log('Starting...');

    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    console.log('driver: ', driver);
    try {
        await driver.get(
            'https://www.premierleague.com/en/tables/premier-league/1993-94/',
        );
        const maybeAcceptButton = await driver.findElement(
            By.id('onetrust-accept-btn-handler'),
        );

        if (maybeAcceptButton) {
            maybeAcceptButton.click();
        }

        const found = await driver.findElement(
            By.xpath(
                '//*[@id="main-content"]/div[1]/div[2]/section/div[2]/table/tbody/tr[1]/td[2]/div[2]/span[1]',
            ),
        );

        const text = await found.getText();
        console.log('text: ', text);
    } finally {
        await driver.quit();
    }
}

async function main() {
    await example();
}
console.log('Starting...');

void main();
