# Selenium Demo with Javascript

## Prerequisites

- You need to install Chrome Driver ([See here](http://chromedriver.storage.googleapis.com/index.html)), then add the path to `environment variables`.
- Make sure you already have installed [Docker](https://www.docker.com/).
- Create an account on [LambdaTests](https://lambdatest.com).
- On the LambdaTests Dashboard, click on your avatar -> Account Settings -> Password & Security -> Copy the username and access key into the `capabilities.js` file.
- Next to your avatar, click on Configure Tunel -> Download Link (download the LT.exe file in order to be able to test with the domain localhost).

## How to run the app

1. Before jumping into examples, you need to run `docker compose up -d app reporter`.
2. Access [localhost:8080](http://localhost:8080) to visit the sample app
3. Access [localhost:8080](http://localhost:80) to visit the reporter after testing (the first time, you won't see anything since we have no test results).

### Example 1:

Demo how to test with Selenium.

Steps:

1. `yarn test:example1`

### Example 2:

Using mocha to refactor tests.

Steps:

1. `yarn test:example2`

### Example 3:

Using Selenium Grid to test on multiple browsers.

Steps:

1. Run `docker compose up -d selenium-hub chrome firefox` to simulate selenium grid.
2. `yarn test:example3`

### Example 4:

Using Lambdatests to test on multiple browsers.

Steps:

1. Open other terminal then cd to the directory where you downloaded the LT command.
2. Run LT --user <your-username> --key <your-access-key>
3. `yarn test:example4`

### License

MIT
