describe('test cypress is working ', () => {
  it('test true equal true', () => {
    expect(true).to.equal(true);
  })

})

const LINK = 'localhost:8081';

describe('Test Links', () => {
  beforeEach(() => {
    cy.visit(LINK);
  })
  it('UC-20 Check Main Page Link and general info', () => {
    cy.get('.app-title').contains("Brothers' Barbershop");
    cy.get('.map').should('exist');
    cy.get('.barbershop-description').should('exist');
    cy.get('.description-paragraph').invoke('text')
      .then(text => expect(text.length).to.be.at.least(10));
  })

})