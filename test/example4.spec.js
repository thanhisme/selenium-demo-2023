const { expect } = require('chai');
const { Builder, By, logging } = require('selenium-webdriver');

const { capabilities } = require('../capabilities');

logging.getLogger().setLevel();

const USERNAME = capabilities['LT:Options'].username;
const ACCESS_KEY = capabilities['LT:Options'].accessKey;
const GRID_HOST = 'hub.lambdatest.com/wd/hub';
const applicationUrl = 'http://localhost:8080';
const browsers = [
	{
		browserName: 'Safari',
		browserVersion: '16.0',
		platformName: 'macOS Ventura',
	},
	{
		browserName: 'Chrome',
		browserVersion: '117.0',
		platformName: 'Windows 11',
	},
	// {
	// 	browserName: 'Chrome',
	// 	browserVersion: '117.0',
	// 	platformName: 'macOS Ventura',
	// },
	// {
	// 	browserName: 'Firefox',
	// 	browserVersion: '117.0',
	// 	platformName: 'Windows 11',
	// },
	// {
	// 	browserName: 'Firefox',
	// 	browserVersion: '117.0',
	// 	platformName: 'macOS Ventura',
	// },
	// {
	// 	browserName: 'Firefox',
	// 	browserVersion: '117.0',
	// 	platformName: 'Linux',
	// },
];

describe('add todo tests', function () {
	const gridUrl = `https://${USERNAME}:${ACCESS_KEY}@${GRID_HOST}`;
	// const gridUrl = 'http://localhost:4444';

	browsers.forEach(({ browserName, browserVersion, platformName }) => {
		describe(`check leap year on ${browserName} (version: ${browserVersion}) in ${platformName}`, () => {
			let driver, yearInput, checkBtn, msgTag;
			async function simulateAction(input) {
				yearInput = driver.findElement(By.id('year-input'));
				checkBtn = driver.findElement(By.id('check-btn'));

				yearInput.sendKeys(input);

				return new Promise((resolve) => {
					setTimeout(async () => {
						checkBtn.click();

						msgTag = driver.findElement(By.id('msg'));
						const msg = await msgTag.getText();
						resolve(msg);
					}, 2000);
				});
			}

			beforeEach(async function () {
				capabilities.browserName = browserName;
				capabilities.browserVersion = browserVersion;
				capabilities['LT:Options'].platformName = platformName;
				capabilities['LT:Options'].buildName = `${this.currentTest.title}`;

				driver = await new Builder()
					.usingServer(gridUrl)
					.withCapabilities(capabilities)
					.build();

				await driver.get(applicationUrl);
			});

			afterEach(async () => {
				await driver.quit();
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
		});
	});
});
