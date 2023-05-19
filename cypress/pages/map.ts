const el = {
  activeButtons: 'form[method="POST"]',
  searchInput: 'input#searchboxinput',
  searchButton: 'button#searchbox-searchbutton',
  leftPanel: '[role="main"]',
  headlineText: 'h1.fontHeadlineLarge',
  directionButton:
    'button[jsaction="pane.placeActions.directions;keydown:pane.placeActions.directions"]',
  directionComp: 'div#directions-searchbox-1',
  directionInput: 'input.tactile-searchbox-input',
  recentButtonNav: 'button[jsaction="navigationrail.recent"]',
  leftList: 'ul[role="list"]',
  historyTitle: '.fontHeadlineSmall',
  gpsSearchResult: '#omnibox-container',
  savedButton: 'button[jsaction="navigationrail.saved"]',
};

export function firstGoogleEnterCheck() {
  cy.url().then((url) => {
    if (url.includes('continue')) {
      cy.get(el.activeButtons).find('button').eq(1).click();
    }
  });
}

export function search(searchData) {
  searchByGPS(searchData);
  cy.url().should('include', `${searchData}`);
}

export function searchByGPS(searchData) {
  cy.get(el.savedButton).should('be.visible');
  cy.get(el.searchInput).clear().type(searchData).get(el.searchButton).click();
  cy.wait('@mapLoaded', { timeout: 30000 });
}

export function emptySearch() {
  cy.get(el.searchInput).clear().get(el.searchButton).click();
  cy.url().should('include', '/maps/');
  cy.get(el.leftPanel).should('not.exist');
  cy.get(el.leftList).find('button').should('be.disabled');
}

export function checkHeadlineText(headline) {
  cy.get(el.leftPanel).within(() => {
    cy.get(el.headlineText).contains(headline).should('be.visible');
  });
}

export function checkGPSResult(long, latt) {
  cy.get('h2').contains(long).should('be.visible');
  cy.get('h2').contains(latt).should('be.visible');
}

export function checkDirection(searchData) {
  cy.get(el.directionButton).click({ force: true });
  cy.url().should('include', `maps/dir//${searchData}`);
  cy.get(el.directionComp)
    .find(el.directionInput)
    .invoke('attr', 'aria-label')
    .should('include', searchData);
}

export function checkHistoryList(searchData) {
  cy.get(el.leftList).contains(searchData).should('be.visible');
}

export function goToRecentList() {
  cy.get(el.recentButtonNav).click();
}

export function checkHistoryPanel(searchData) {
  cy.get(el.leftPanel).within(() => {
    searchData.forEach((element) => {
      cy.get(el.historyTitle).contains(element).should('be.visible');
    });
  });
}

export function searchDidNotFind() {
  cy.get(el.leftPanel).within(() => {
    cy.get(el.headlineText).should('not.exist');
  });
}
