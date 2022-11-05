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
  const loginAccount = (account) => {
    cy.visit('/');

    cy.get('.v-toolbar__content > [role="button"]').click();
    cy.get('.row > .v-btn').click();
    cy.get(':nth-child(2) > .col > .v-input > .v-input__control > .v-input__slot').type(account.Telephone);
    cy.get('.v-text-field__slot>[type="password"]').type(account.Password);
    cy.get('.mt-8').click();
  }

  // a function to fill the form 
  const completeField = (nth, input) => {
    cy.get(`:nth-child(${nth}) > .col > .v-input > .v-input__control > .v-input__slot`)
      .type(input);
  }


  it('Login to admin account and log out', () => {

    loginAccount(TestAdminInfo);
    cy.wait(1000)

    cy.get('.v-toolbar__content > [role="button"]').click();


    cy.get('.v-list-item').contains("Log Out").click();



  })


  it('UC 27, 36 Create Barber account', () => {

    loginAccount(TestAdminInfo);
    cy.get('[href="/admin"] > .v-btn__content').click();
    cy.get(':nth-child(2) > .d-flex > .row > .col-sm-12').click();
    cy.get('button>span').contains("Add Account").click();
    completeField(2, TestBarberInfo.FirstName);
    completeField(3, TestBarberInfo.LastName);
    completeField(4, TestBarberInfo.Telephone);
    completeField(5, TestBarberInfo.email);
    completeField(6, TestBarberInfo.Password);
    completeField(7, TestBarberInfo.Password);
    cy.get(':nth-child(8)>button').contains('Add Account').click();


  })




})