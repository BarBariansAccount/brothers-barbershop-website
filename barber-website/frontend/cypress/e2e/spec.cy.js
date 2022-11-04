describe('test cypress is working ', () => {
  it('test true equal true', () => {
    expect(true).to.equal(true);
  })

})

const LINK = 'localhost:8081';

describe('Test Links', () => {

  it('UC-20, Check Main Page Link and general info', () => {
    cy.visit(LINK);
    cy.get('.app-title').contains("Brothers' Barbershop");
    cy.get('.map').should('exist');
    cy.get('.barbershop-description').should('exist');
    cy.get('.description-paragraph').invoke('text')
      .then(text => expect(text.length).to.be.at.least(10));
  })




  //a testing admin account should already in the database before starting
  const TestAdminInfo = {
    Telephone: 1111111111,
    Password: "modifiedPass"
  }

  // a barber account don't have to be in the database in advance
  const TestBarberInfo = {
    Telephone: 1111111112,
    Password: "testBarberPass",
    email: 'e2ebarber490@gmail.com',
    FirstName: 'BarberFirst',
    LastName: 'BarberLast'
  }


  it('Login to admin account and log out', () => {
    cy.visit('/');

    cy.get('.v-toolbar__content > [role="button"]').click();
    cy.get('.row > .v-btn').click();
    cy.get('#input-93').type(TestAdminInfo.Telephone);
    cy.get('.v-text-field__slot>[type="password"]').type(TestAdminInfo.Password);
    cy.get('.mt-8').click();





  })


  // it('UC 27, 36 Create Barber account', () => {
  //   //cy.visit('/admin');
  // })


  // it('logout admin account', () => {
  //   //cy.visit('/');
  //   cy.get('.v-toolbar__content > [role="button"]').click();

  //   // cy.get('.v-list-item').contains("Log Out").click();
  // })


})