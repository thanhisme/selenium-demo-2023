const { expect } = require('chai');
const { Builder, By, logging } = require('selenium-webdriver');

logging.getLogger().setLevel();

describe('check leap year', () => {
	let driver, yearInput, checkBtn, msgTag;
	function simulateAction(input) {
		yearInput = driver.findElement(By.id('year-input'));
		yearInput.sendKeys(input);

		return new Promise((resolve) => {
			setTimeout(async () => {
				checkBtn = driver.findElement(By.id('check-btn'));
				checkBtn.click();

				msgTag = driver.findElement(By.id('msg'));
				const msg = await msgTag.getText();
				resolve(msg);
			}, 2000);
		});
	}

	beforeEach(async function () {
		driver = await new Builder().forBrowser('chrome').build();
		await driver.get('http://localhost:8080');
	});

	it('case 1: invalid-year (invalid year)', async () => {
		const msg = await simulateAction('invalid-year');
		expect(msg).equal('Please enter a valid year');
	});

	it('case 2: 2020 (leap year)', async () => {
		const msg = await simulateAction('2020');
		expect(msg).equal('2020 is a leap year');
	});
	it('case 3: 2100 (not a leap year)', async () => {
		const msg = await simulateAction('2100');
		expect(msg).equal('2100 is not a leap year');
	});

	afterEach(async function () {
		await driver.quit();
	});
});
