export function getGpsLocation() {
  return cy.request({
    method: 'GET',
    url: 'https://www.random.org/decimal-fractions/?num=2&dec=10&col=1&format=plain&rnd=new',
  });
}
