cy.on('uncaught:exception', (err, runnable) => {
  expect(err.message).to.include('Network Error')
  // return false to prevent the error from
  // failing this test
  return false
})

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
  const ModifiedBarberInfo = {
    Email: 'e2ebarberModified@gmail.com',
    FirstName: 'BarberFirstM',
    LastName: 'BarberLastM'
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
    cy.get('.mt-8').last().click();
  }

  // a function to fill the form 
  const completeField = (nth, input) => {
    cy.get(`:nth-child(${nth}) > .col > .v-input > .v-input__control > .v-input__slot`)
      .last()
      .type(input);
  }
  const completeUserInfo = (nth, input) => {
    cy.get(`:nth-child(${nth}) > :nth-child(1) > .v-input > .v-input__control > .v-input__slot`)
      .last()
      .type("{backspace}".repeat(50) + input)
  }
  const completeSignupData = (data) => {
    completeField(2, data.FirstName);
    completeField(3, data.LastName);
    completeField(4, data.Telephone);
    completeField(5, data.Email);
    completeField(6, data.Password);
    completeField(7, data.Password);
  }



  const clickButtonWith = (text) => {
    cy.contains(text, { matchCase: false }).click();
  }
  const logOut = async () => {
    cy.wait(WAIT_TIME)

    cy.get('.v-toolbar__content > [role="button"]').click();



    // clickButtonWith('log out');
    cy.get('.v-list-item').contains("Log Out").click();
  }

  it('UC-20, 39, 71 Check Main Page Link and general info', () => {
    cy.visit('/');
    cy.get('.app-title').contains("Brothers' Barbershop");
    cy.get('.map').should('exist');
    cy.get('.barbershop-description').should('exist');
    cy.get('.description-paragraph').invoke('text')
      .then(text => expect(text.length).to.be.at.least(10));
    cy.contains('Current Status').should('exist');
  })



  it('Test Customer account creation', () => {
    cy.visit('/');
    clickSignIn();
    cy.contains('Sign UP', { matchCase: false }).click();

    completeSignupData(TestUserInfo);
    cy.get(':nth-child(8)>button').contains('sign up', { matchCase: false }).click();
    cy.wait(WAIT_TIME);
    cy.wait(WAIT_TIME);
    cy.visit('/');
    cy.wait(WAIT_TIME);

    logOut();

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

    cy.wait(WAIT_TIME);

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


  it('UC 27, 36 Create Barber account, UC 120 barber-management', () => {

    loginAccount(TestAdminInfo);
    cy.get(':nth-child(2) > .d-flex > .row > .col-sm-12').click();
    cy.get('button>span').contains("Add Account").click();
    completeSignupData(TestBarberInfo);
    cy.get(':nth-child(8)>button').contains('Add Account').click();

    cy.get('body').click(0, 0);



    cy.visit('/');
    logOut();

  })


  it('UC-29,30 save and edit barber info, UC-73 barber-login/out', () => {
    loginAccount(TestBarberInfo);
    //cy.contains("edit profile").click();
    cy.get('[href="/panel/profile/edit_profile"]').click();

    completeUserInfo(1, ModifiedBarberInfo.FirstName)
    completeUserInfo(2, ModifiedBarberInfo.LastName)
    completeUserInfo(3, ModifiedBarberInfo.Email)
    clickButtonWith('save')

    //click ok
    cy.get('.swal2-confirm').last().click()
    //check modified result
    cy.get('.menu-wrap > :nth-child(1) > :nth-child(2)')
      .contains(`${ModifiedBarberInfo.FirstName} ${ModifiedBarberInfo.LastName}`)

    logOut();
  })


  it('UC-28 delete barber-account', () => {
    loginAccount(TestAdminInfo);
    cy.get(':nth-child(2) > .d-flex > .row > .col-sm-12').click();
    //click 3 dot for delete menu
    cy.get('.v-responsive__content > .v-sheet > .v-toolbar__content > .v-btn > .v-btn__content > .v-icon').click()

    clickButtonWith('Delete User');

    cy.visit('/');
    logOut();

  })




  //temp removed it for now since backend part for this is not there yet

  // it('Test delete customer account', () => {
  //   loginAccount(TestUserInfo);
  //   cy.wait(WAIT_TIME);
  //   clickIcon();
  //   cy.get('.v-list-item').contains("User Profile").click();
  //   cy.get('[href="/panel/profile/unsubscribe"]').click();
  //   clickButtonWith('delete account');
  //   clickButtonWith('yes, delete it');
  // })




})
