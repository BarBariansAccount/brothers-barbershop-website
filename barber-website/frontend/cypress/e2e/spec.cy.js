describe('test cypress is working ', () => {
  it('test true equal true', () => {
    expect(true).to.equal(true);
  })

})

// link is set in config file which is 'localhost:8081' for now;

describe('Test UserStories', () => {
  const WAIT_TIME = 1000;
  const MODIFIED_PASS = 'modifiedPass';
  //a testing admin account should already in the database before starting
  const TestAdminInfo = {
    Telephone: 1111111111,
    Password: "modifiedPass"
  }

  // a barber account don't have to be in the database in advance
  const TestBarberInfo = {
    Telephone: 1111111112,
    Password: "testBarberPass",
    Email: 'e2ebarber490@gmail.com',
    FirstName: 'BarberFirst',
    LastName: 'BarberLast'
  }

  const TestUserInfo = {
    Telephone: 1111111113,
    Password: "testCustomerPass",
    Email: 'e2ecustomer490@gmail.com',
    FirstName: 'CustomerFirst',
    LastName: 'CustomerLast'
  }
  const clickIcon = () => {
    cy.get('.v-toolbar__content > [role="button"]').click();
  }

  // a function to click login
  const clickSignIn = () => {
    clickIcon();
    cy.get('.row > .v-btn').click();
  }
  // a function for login
  const loginAccount = (account) => {
    cy.visit('/');

    clickSignIn();
    cy.get(':nth-child(2) > .col > .v-input > .v-input__control > .v-input__slot').type(account.Telephone);
    cy.get('.v-text-field__slot>[type="password"]').type(account.Password);
    cy.get('.mt-8').click();
  }

  // a function to fill the form 
  const completeField = (nth, input) => {
    cy.get(`:nth-child(${nth}) > .col > .v-input > .v-input__control > .v-input__slot`)
      .last()
      .type(input);
  }
  const completeSignupData = (data) => {
    completeField(2, data.FirstName);
    completeField(3, data.LastName);
    completeField(4, data.Telephone);
    completeField(5, data.Email);
    completeField(6, data.Password);
    completeField(7, data.Password);
  }

  const logOut = () => {
    cy.wait(WAIT_TIME)

    cy.get('.v-toolbar__content > [role="button"]').click();


    cy.get('.v-list-item').contains("Log Out").click();
  }

  const clickButtonWith = (text) => {
    cy.contains(text, { matchCase: false }).click();
  }

  it('UC-20, 39, 71 Check Main Page Link and general info', () => {
    cy.visit('/');
    cy.get('.app-title').contains("Brothers' Barbershop");
    cy.get('.map').should('exist');
    cy.get('.barbershop-description').should('exist');
    cy.get('.description-paragraph').invoke('text')
      .then(text => expect(text.length).to.be.at.least(10));
    cy.get('.mt-4').contains('Current Status').should('exist');
  })



  it('Test Customer account creation', () => {
    cy.visit('/');
    clickSignIn();
    cy.contains('Sign UP', { matchCase: false }).click();

    completeSignupData(TestUserInfo);
    cy.get(':nth-child(8)>button').contains('sign up', { matchCase: false }).click();
    cy.visit('/');

  })

  it('UC-31 test customer login', () => {
    loginAccount(TestUserInfo);
    logOut();
  })

  it('UC-35 test change password', () => {
    cy.visit('/');
    loginAccount(TestUserInfo);
    cy.wait(WAIT_TIME);
    clickIcon();
    cy.get('.v-list-item').contains("User Profile").click();
    cy.get('[href="/panel/profile/change-password"]').click();

    cy.get(':nth-child(1) > .v-input > .v-input__control > .v-input__slot')
      .type(TestUserInfo.Password);

    cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot')
      .type(MODIFIED_PASS);

    TestUserInfo.Password = MODIFIED_PASS;
    clickButtonWith('save');


    cy.visit('/');
    logOut();

    loginAccount(TestUserInfo);
    logOut();



  })







  it('UC37, Login to admin account and log out', () => {

    loginAccount(TestAdminInfo);
    logOut();



  })

  // it('UC-72 Check admin toggle busy status',()=>{
  //   loginAccount(TestAdminInfo);
  //   cy.get('[href="/admin"] > .v-btn__content').click();


  // })


  it('UC 27, 36 Create Barber account', () => {

    loginAccount(TestAdminInfo);
    cy.get('[href="/admin"] > .v-btn__content').click();
    cy.get(':nth-child(2) > .d-flex > .row > .col-sm-12').click();
    cy.get('button>span').contains("Add Account").click();
    completeSignupData(TestBarberInfo);
    cy.get(':nth-child(8)>button').contains('Add Account').click();


  })




})