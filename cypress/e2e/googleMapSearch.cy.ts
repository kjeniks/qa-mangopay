import { getGpsLocation } from '@pages/gps';
import * as map from '@pages/map';
import DmsCoordinates, { parseDms } from 'dms-conversion';

const cities = ['Paris', 'London', 'Munich', 'Prague', 'Boston'];
const nokEnterdata = 'sldjba-axxch';
let citiesCheck = [];

function enterToGoogleMap() {
  cy.intercept('GET', '**/maps/preview/**').as('mapLoaded');
  cy.visit('/');
  map.firstGoogleEnterCheck();
  cy.url().should('include', 'google.com/maps');
}

describe('Google Map tests', () => {
  it('AC1: Left panel should have searched City in headline', () => {
    enterToGoogleMap();
    map.search(cities[0]);
    map.checkHeadlineText(cities[0]);
  });

  it('AC2: Destination should contain searched city', () => {
    enterToGoogleMap();
    map.search(cities[1]);
    map.checkHeadlineText(cities[1]);
    map.checkDirection(cities[1]);
  });

  it('AC3: History of Search is shown', () => {
    enterToGoogleMap();
    map.search(cities[2]);
    map.checkHeadlineText(cities[2]);
    map.checkHistoryList(cities[2]);
    map.search(cities[3]);
    map.checkHeadlineText(cities[3]);
    map.checkHistoryList(cities[3]);
    map.checkHistoryList(cities[2]);
  });

  it('AC4: Destination should contain searched city', () => {
    enterToGoogleMap();
    map.search(cities[3]);
    map.checkHeadlineText(cities[3]);
    map.search(cities[4]);
    map.checkHeadlineText(cities[4]);
    map.search(cities[1]);
    map.checkHeadlineText(cities[1]);
    map.goToRecentList();
    map.checkHistoryList(cities[4]);
    map.checkHistoryList(cities[1]);
    map.checkHistoryList(cities[3]);
    map.checkHistoryPanel((citiesCheck = [cities[4], cities[3], cities[1]]));
  });

  it('AC5: Unexpected enter data shows error on search', () => {
    enterToGoogleMap();
    map.search(nokEnterdata);
    map.searchDidNotFind();
  });

  it('AC6: Search random GPS Location', () => {
    getGpsLocation().then((resp) => {
      expect(resp.status).equal(200);
      enterToGoogleMap();
      map.searchByGPS(
        resp.body.split('\n')[0].substring(0, 8) +
          ' ' +
          resp.body.split('\n')[1].substring(0, 8)
      );
      map.checkGPSResult(
        resp.body.split('\n')[0].substring(0, 8),
        resp.body.split('\n')[1].substring(0, 8)
      );
    });
  });

  it('AC7: Try to submit serach without data', () => {
    enterToGoogleMap();
    map.emptySearch();
  });
});
