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
};

export function firstGoogleEnterCheck() {
  cy.url().then((url) => {
    if (url.includes('continue')) {
      cy.get(el.activeButtons).find('button').eq(1).click();
    }
  });
}

export function search(searchData) {
  cy.get(el.searchInput).clear().type(searchData).get(el.searchButton).click();
  cy.wait('@mapLoaded', { timeout: 30000 });
  cy.url().should('include', `${searchData}`);
}

export function checkHeadlineText(headline) {
  cy.get(el.leftPanel).within(() => {
    cy.get(el.headlineText).contains(headline).should('be.visible');
  });
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
