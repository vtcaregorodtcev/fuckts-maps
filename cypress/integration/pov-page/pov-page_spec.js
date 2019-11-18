/* eslint-disable no-undef */
import po from './page-object';

describe('PovPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('should redirect to /fuckts/new after open', () => {
    cy.url().should('include', '/fuckts/new');
  });

  it('should contains 4 default fuckts', () => {
    cy.get(po.$fuckts).should('have.length', 4);
  });

  it('should add fuckt after filling input and press enter', () => {
    po.addFuckt('new fuckt');

    cy.get(po.$fuckts).should('have.length', 5);
  });

  it('should save map after filling name', () => {
    cy.get(po.$sidebarMenuItem).should('have.length', 0);

    po.saveMap('new map');

    cy.url().should('include', '/fuckts/new_map');
    cy.get(po.$sidebarMenuItem).should('have.length', 1);
  });

  it('should show correct count of fuckts', () => {
    po.addFuckt('new fuckt1');
    po.addFuckt('new fuckt2');
    po.addFuckt('new fuckt3');

    po.saveMap('new map');
    cy.get(po.$fuckts).should('have.length', 7);

    po.goToNew();
    cy.get(po.$fuckts).should('have.length', 4);
  });

  it('should remove map', () => {
    po.saveMap('new map');
    cy.get(po.$sidebarMenuItem).should('have.length', 1);

    po.removeMap();
    cy.get(po.$sidebarMenuItem).should('have.length', 0);
    cy.url().should('include', '/fuckts/new');
  });

  it('should allow copy fuckts', () => {
    cy.get(po.$fuckts).should('have.length', 4);

    cy.get(po.$fucktTextarea)
      .eq(0)
      .type('.', { force: true })
      .type('{cmd}C');

    cy.get(po.$fuckts).should('have.length', 5);
  });
});
