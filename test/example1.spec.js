const { expect } = require('chai');
const { Builder, By, logging } = require('selenium-webdriver');

logging.getLogger().setLevel();

(async () => {
	const driver = await new Builder().forBrowser('chrome').build();
	await driver.get('http://localhost:8080');

	const yearInput = driver.findElement(By.id('year-input'));
	const checkBtn = driver.findElement(By.id('check-btn'));
	const msgTag = driver.findElement(By.id('msg'));

	yearInput.sendKeys('2020');
	setTimeout(async () => {
		checkBtn.click();
		const msg = await msgTag.getText();
		expect(msg).equal('2020 is a leap year');

		driver.quit();
	}, 2000);
})();
