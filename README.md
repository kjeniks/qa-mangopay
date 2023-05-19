# QA-mangopay-by-kjeniks

## UI Tests of Google search component

You can find the test scenarios in `e2e/googleMapSearc.cy.ts` and its functions that are reusable in `pages/map.ts`
If there will be more of pages to test, every page would have separate support file to have its fucntions there.

### Installations

You need to have Node.js installed before using Cypress.

For rest of the installations move to project folder in command prompt and type

`npm install`

which will install Cypress and other supporting tools

### CI/CD

To run the test on Github Actions you can use the End-to-end workflow, where you can find results for each new public commit or you can run manually with avaliable to download artifacts when tests fails.

### Run Tests

To run series of tests in interactive mode use following command

`npm run cy:open`

To run series of tests in normal headless mode use following command

`npm run cy:run`
