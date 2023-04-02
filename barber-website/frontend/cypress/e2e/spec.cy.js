


describe('test cypress is working ', () => {
  it('test true equal true', () => {
    expect(true).to.equal(true);
  })

})


describe('Test UserStories', () => {
  const WAIT_TIME = 1000;
  const MODIFIED_PASS = 'modifiedPass';
  const EDITED_NOTE = "edited note";
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
    Email: 'e2e490customer@gmail.com',
    FirstName: 'CustomerFirst',
    LastName: 'CustomerLast',
    Note: "Note for user"
  }
  const ModifiedBarberInfo = {
    Email: 'e2ebarberModified@gmail.com',
    FirstName: 'BarberFirstM',
    LastName: 'BarberLastM'
  }
  const TestCustomerWithoutAccountInfo = {
    Telephone: 1111111114,
    Email: 'e2e490NoAccount@gmail.com',
    FirstName: 'NoAccountFirst',
    LastName: 'NoAccountLast',
    Note: "Note for user without account"
  }
  const TestFaq = {
    question: "E2E question",
    answer: "E2E answer"
  }

  const ModifiedFaq = {
    question: "E2E Modified Question",
    answer: "E2E Modified Answer"
  }

  const TestProductInfo = {
    title: "E2E title 1",
    description: "E2E test description"
  }

  // initial empty variable used to store appointment url later
  const appointmentUrl = {
    appointmentWithAccount: "",
    appointmentWithoutAccount: ""
  }
  const slots = ["12:00 PM", "1:00 PM", "3:00 PM"]

  const clickTextWith = (text) => {
    cy.contains(text, { matchCase: false }).filter(':visible').last().click();
  }

  const clickIcon = () => {
    cy.get('.v-toolbar__content > [role="button"]').click();
  }
  const clickButtonWith = (text) => {
    cy.get('button').filter(':visible').contains(text, { matchCase: false }).click();
  }



  // a function to click login
  const clickSignIn = () => {
    clickIcon();
    clickTextWith("sign in");
  }
  // a function for login
  const loginAccount = (account) => {
    cy.visit('/');

    clickSignIn();
    completeFormWithPlaceHolder("Phone Number", account.Telephone);
    completeFormWithPlaceHolder("Password", account.Password);
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

  const completeFormWithPlaceHolder = (placeHolder, input) => {
    cy.get(`input[placeholder="${placeHolder}"]`)
      .last().type(input);

  }
  const completeTextAreaWithPlaceHolder = (placeHolder, input) => {
    cy.get(`textarea[placeholder="${placeHolder}"]`)
      .last().type(input);

  }
  const completeFormWithLabel = (label, input, inputType = "input") => {
    cy.get(`label`).contains(label, { matchCase: false })
      .parent().children(inputType)
      .type(input);
  }

  const completeSignupData = (data) => {
    completeFormWithPlaceHolder("First Name", data.FirstName);
    completeFormWithPlaceHolder("Last Name", data.LastName);
    completeFormWithPlaceHolder("Phone Number", data.Telephone);
    completeFormWithPlaceHolder("Email", data.Email);
    completeFormWithPlaceHolder("Password", data.Password);
    completeFormWithPlaceHolder("Confirm Password", data.Password);
  }




  const logOut = async () => {
    cy.wait(WAIT_TIME)

    cy.get('.v-toolbar__content > [role="button"]').click();



    cy.get('.v-list-item').contains("Log Out").click();
  }
  const clickUrl = (url) => {
    cy.get(`[href="${url}"]`).last().click();
  }

  const selectDate = () => {
    // select date to 2025-01-01
    cy.contains(/ 2023$/).click();
    cy.contains(/^2023$/).click();
    cy.get("li").contains('2025').click();
    clickTextWith("Jan");
    cy.get("td").contains(/^1$/).click();
  }

  const visitMainPage = () => {
    cy.get('.app-title').contains("Brothers' Barbershop").click();
  }
  const clickContinue = () => {
    cy.get('button').filter(':visible').contains('continue', { matchCase: false }).click();

  }

  const completeBookingInfo = (userInfo, service, slot, isGuest = false) => {
    clickUrl('/appointment');
    clickTextWith(service);
    clickContinue();

    clickTextWith(ModifiedBarberInfo.FirstName);
    clickContinue();
    //another wait to continue
    cy.get(':nth-child(5) > .v-stepper__step__step').click();
    selectDate();
    clickTextWith(slot);
    clickContinue();
    completeFormWithLabel("phone number", userInfo.Telephone);

    if (isGuest) {
      completeFormWithLabel("Email", userInfo.Email);
      completeFormWithLabel("First Name", userInfo.FirstName);
      completeFormWithLabel("Last Name", userInfo.LastName);
    } else {
      completeFormWithLabel("Email", "{backspace}".repeat(30) + userInfo.Email);
    }

    completeFormWithLabel("Note", userInfo.Note, "textarea");

  }

  const updateAndDeleteAppointment = () => {
    //test modify appointment
    clickTextWith('edit');
    completeFormWithLabel("Note", "{backspace}".repeat(50) + EDITED_NOTE, "textarea");
    clickTextWith("update");
    cy.get('.swal2-confirm').click();
    // check the modified info
    cy.contains(EDITED_NOTE).should("exist");

    //test delete appointment
    clickTextWith('cancel');
    clickTextWith('yes, delete it!');
    cy.get('.swal2-confirm').click();
  }

  const clickNthAdminPage = (nth) => {
    cy.get(`:nth-child(${nth}) > .d-flex > .row > .col-sm-12`).last().click();
  }

  const clickInputWithLabel = (label, inputType = 'div') => {
    cy.get(`label`).contains(label, { matchCase: false })
      .parent().children(inputType).first().click();
  }


  it("UC-120, 129, 176 test add, edit and view  FAQ", () => {
    loginAccount(TestAdminInfo);
    clickTextWith("editable info");

    // click add button
    cy.get('.text-end > .v-icon > .v-icon__svg').click();
    // enter faq
    completeFormWithPlaceHolder('Question', TestFaq.question);
    cy.get(`textarea[placeholder="Answer"]`)
      .last().type(TestFaq.answer);
    clickButtonWith('ok');
    clickButtonWith('ok');

    logOut();

    // check FAQ
    cy.contains(TestFaq.question).filter(':visible').last().click();
    cy.contains(TestFaq.answer).filter(':visible').should('exist');

    // edit
    loginAccount(TestAdminInfo);
    clickTextWith("editable info");
    // click first question
    cy.get('.v-expansion-panel-header').first().click();
    //  click edit
    cy.get(':nth-child(1) > .v-expansion-panel-header >div> div>.px-2>:nth-child(2)').click();
    completeFormWithPlaceHolder('Question', "{del}".repeat(50) + "{backspace}".repeat(50) + ModifiedFaq.question);
    completeFormWithPlaceHolder('Answer', "{del}".repeat(50) + "{backspace}".repeat(50) + ModifiedFaq.answer);
    //confirm edit
    cy.get('.swal2-confirm').filter(":visible").click();
    cy.get('.swal2-confirm').filter(":visible").click();

    logOut();

    // check FAQ after edit
    cy.contains(ModifiedFaq.question).last().click();
    cy.contains(ModifiedFaq.answer).should('exist');





  })


  it('UC-20, 39, 71, 124 Check Main Page Link and general info', () => {
    cy.visit('/');
    cy.get('.app-title').contains("Brothers' Barbershop");
    cy.get('.map').should('exist');
    cy.get('.barbershop-description').should('exist');
    cy.contains('Current Status').should('exist');
  })



  it('Test Customer account creation', () => {
    cy.visit('/');
    clickSignIn();
    cy.contains('Sign UP', { matchCase: false }).click();

    completeSignupData(TestUserInfo);
    cy.get('.mt-5').contains('sign up', { matchCase: false }).click();
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

  it('UC-130 test upload image and delete', () => {
    loginAccount(TestUserInfo);
    cy.get('.icon > .edit-icon').click({ force: true });

    //check avatar not there before uploading
    cy.get('.v-avatar>img').should("not.exist");

    //test upload image
    cy.get('.mt-3').click();
    cy.get('input[accept*="image/png"]').selectFile('./cypress/fixtures/testIcon.png', { force: true });

    //check avatar should be there
    cy.get('.v-avatar>img').should("not.exist");

    //delete image
    clickTextWith("delete current photo");
    clickTextWith("yes, delete it");

    cy.get('.v-avatar>img').should("not.exist");

    cy.visit('/');
    logOut();
  })

  it('UC-35 test change password', () => {
    cy.visit('/');
    loginAccount(TestUserInfo);
    cy.wait(WAIT_TIME);
    clickIcon();
    cy.get('.v-list-item').contains("User Profile").click();
    clickUrl("/panel/profile/change-password");

    cy.get(':nth-child(1) > .v-input > .v-input__control > .v-input__slot')
      .type(TestUserInfo.Password);

    cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot')
      .type(MODIFIED_PASS);

    TestUserInfo.Password = MODIFIED_PASS;
    clickTextWith('save');

    cy.wait(WAIT_TIME);

    cy.visit('/');
    logOut();

    loginAccount(TestUserInfo);
    logOut();



  })



  it('UC-37, Login to admin account and log out', () => {

    loginAccount(TestAdminInfo);
    logOut();



  })

  it('UC-72 Check admin toggle busy status', () => {
    cy.visit('/');
    cy.contains('empty', { matchCase: false }).should('exist');
    cy.contains('busy', { matchCase: false }).should('not.exist');
    loginAccount(TestAdminInfo);

    // change default empty to busy
    cy.get('.v-toolbar__content > .mt-n4 > .row > :nth-child(2) > .rounded-xl').click();
    cy.get('.app-title').click();
    cy.contains('busy', { matchCase: false }).should('exist');
    cy.contains('empty', { matchCase: false }).should('not.exist');

    clickUrl("/panel/admin");

    //clean up
    cy.get('.v-toolbar__content > .mt-n4 > .row > :nth-child(1) > .rounded-xl').click();
    logOut();


  })

  //add more admin related testing in case of needing it


  it('UC-27, 36, 313 Create Barber account, UC 120 barber-management', () => {

    loginAccount(TestAdminInfo);
    clickNthAdminPage(1);
    cy.get('button>span').contains("Add Account").click();
    completeSignupData(TestBarberInfo);
    cy.get('.mt-5').contains('sign up', { matchCase: false }).click();

    cy.get('body').click(0, 0);



    cy.visit('/');
    logOut();

  })


  it('UC-29,30 save and edit barber info, UC-73 barber-login/out', () => {
    loginAccount(TestBarberInfo);
    clickUrl("/panel/profile/edit_profile");

    completeUserInfo(1, ModifiedBarberInfo.FirstName)
    completeUserInfo(2, ModifiedBarberInfo.LastName)
    completeUserInfo(3, ModifiedBarberInfo.Email)
    clickTextWith('save')

    //click ok
    cy.get('.swal2-confirm').last().click()
    //check modified result
    cy.get('.menu-wrap > :nth-child(1) > :nth-child(2)')
      .contains(`${ModifiedBarberInfo.FirstName} ${ModifiedBarberInfo.LastName}`)

    logOut();
  })



  it("UC-224 add availability by barber", () => {


    loginAccount(TestBarberInfo);
    clickUrl("/panel/availabilities");


    clickTextWith("add");
    selectDate();

    // select time slots and confirm
    cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections')
      .click();

    slots.forEach(slot => {
      clickTextWith(slot);
    })
    cy.get('.v-card__title').click();
    cy.get('button[type="submit"]').contains("add", { matchCase: false }).click();
    cy.get('button').contains('ok', { matchCase: false }).click();

    //click date selector
    cy.get('input[role="button"]').last().click();
    selectDate();

    //check whether all three slots exists
    slots.forEach(slot => {
      cy.contains(slot).should('be.visible');
    })

    visitMainPage();

    logOut();


  })


  it('UC-59, 182, 249, 273 add appointment', () => {
    loginAccount({ ...TestUserInfo, Password: MODIFIED_PASS });
    completeBookingInfo(TestUserInfo, "Line up", "3:00 PM");
    clickTextWith("book ");
    cy.get('.swal2-confirm').click();
    cy.wait(WAIT_TIME + 1000);
    cy.location().then((loc) => {
      appointmentUrl.appointmentWithAccount = loc.href;
    })



    logOut();

  })

  it("UC-226 add appointment as guest", () => {
    cy.visit("/");
    completeBookingInfo(TestCustomerWithoutAccountInfo, "Line up", "1:00 PM", true);
    clickTextWith("book ");
    cy.get('.swal2-confirm').click();
    cy.wait(WAIT_TIME + 1000);
    cy.location().then((loc) => {
      appointmentUrl.appointmentWithoutAccount = loc.href;
    })

    cy.visit("/");
  })

  it("UC-267, 270 check availabilities and appointments by admin", () => {
    loginAccount(TestAdminInfo);
    //click appointment view
    clickNthAdminPage(3);
    //select the barber
    clickInputWithLabel("select barber");
    clickTextWith(TestBarberInfo.FirstName);

    //check the appointment
    cy.contains(TestUserInfo.FirstName).filter(":visible");
    cy.contains(TestCustomerWithoutAccountInfo.FirstName).filter(":visible");

    //click availability
    clickNthAdminPage(5);
    clickInputWithLabel("select barber");
    clickTextWith(TestBarberInfo.FirstName);
    clickInputWithLabel("select date", "input");
    selectDate();
    cy.contains(slots[0], { matchCase: false })
      .parent().get(`td>span>span`).contains('no', { matchCase: false });
    cy.contains(slots[1], { matchCase: false })
      .parent().get(`td>span>span`).contains('yes', { matchCase: false });
    logOut();



  })
  it("UC-275 check appointment by barber", () => {
    loginAccount(TestBarberInfo);

    clickTextWith("appointments");
    //check the appointment
    cy.contains(TestUserInfo.FirstName).filter(":visible");
    cy.contains(TestCustomerWithoutAccountInfo.FirstName).filter(":visible");


    logOut();
  })

  it("UC-223, 222, update and cancel appointment", () => {

    loginAccount({ ...TestUserInfo, Password: MODIFIED_PASS });
    cy.visit(appointmentUrl.appointmentWithAccount);
    updateAndDeleteAppointment();


    cy.visit(appointmentUrl.appointmentWithoutAccount);
    updateAndDeleteAppointment();


  })

  it("UC-224(con't) delete slots", () => {
    loginAccount(TestBarberInfo);
    clickUrl("/panel/availabilities");
    cy.get(`label`).contains('date', { matchCase: false })
      .parent().children("input").click();
    selectDate();

    cy.get('.v-data-table-header > tr > :nth-child(2) > .v-data-table__checkbox > .v-icon')
      .click();
    clickTextWith('delete');
    cy.get('.swal2-confirm').click();

    logOut();

  })

  // add more barber tests here in case of needing it


  it('UC-28 delete barber-account', () => {
    loginAccount(TestAdminInfo);
    clickNthAdminPage(1);
    //click 3 dot for delete menu
    cy.get('.v-responsive__content > .v-sheet > .v-toolbar__content > .v-btn > .v-btn__content > .v-icon').click()

    clickTextWith('Delete User');

    cy.visit('/');
    logOut();

  })
  it('UC-41, 80, 277, 278 test add and view the list of products', () => {
    loginAccount(TestAdminInfo);
    //click products
    clickNthAdminPage(4);
    //add product
    clickButtonWith('add product');
    clickButtonWith('upload photo');
    cy.get('input[accept*="image/*"]').selectFile('./cypress/fixtures/testIcon.png', { force: true });
    completeFormWithLabel('Product title', TestProductInfo.title);
    completeFormWithLabel('Product description', TestProductInfo.description, "textarea");
    clickButtonWith("save");

    logOut();
    //check added products
    cy.get('[href="/products"]').filter(":visible").click();
    cy.contains(TestProductInfo.title).should('exist');
    cy.contains(TestProductInfo.description).should("exist");

    //delete product
    loginAccount(TestAdminInfo);
    //click products
    clickNthAdminPage(4);
    clickButtonWith('delete');

    clickButtonWith('yes, delete it!');


    logOut();




  })


  it('UC-25 delete FAQs', () => {
    loginAccount(TestAdminInfo);
    clickTextWith("editable info");
    // click first question
    cy.get('.v-expansion-panel-header').first().click();
    //  click delete
    cy.get(':nth-child(1) > .v-expansion-panel-header >div> div>.px-2>:nth-child(1)').click();
    clickButtonWith('yes, delete it!');
    cy.get('.swal2-confirm').filter(":visible").click();


    cy.contains(ModifiedFaq.question).should('not.visible');

  })

  it("UC-269, 316, 318 check admin main page info", () => {
    // should be some text and data that is rare to see, so it will be easier to test
    const TestDescription = "E2E Test description for the website, should be at least 10 char long";
    const TestPrice = {
      price: "100 billion CAD",
      time: "1 year"
    }
    const TestWorkingHour = "All day";


    loginAccount(TestAdminInfo);
    clickUrl("/");
    // try to edit description
    cy.get('.description-paragraph').type("{del}{backspace}".repeat(100) + TestDescription);
    clickButtonWith('save');
    cy.get('.swal2-confirm').filter(":visible").click();

    //try to edit price  
    cy.contains('haircuts pricing', { matchCase: false }).parent().children(":nth-child(2)").children("button").click();
    cy.get(".act").filter(":visible").first().type("{del}{backspace}".repeat(20) + TestPrice.price);
    cy.wait(WAIT_TIME);
    cy.get(".act").filter(":visible").last().type("{del}{backspace}".repeat(20) + TestPrice.time);
    cy.get('.success--text').filter(":visible").click();

    //try to edit hours
    cy.contains('working hours', { matchCase: false }).parent().children(":nth-child(2)").children("button").click();
    cy.get(".act").filter(":visible").first().type("{del}{backspace}".repeat(100) + TestWorkingHour);
    cy.get('.success--text').filter(":visible").click();




    // log out to check
    cy.wait(5000);
    //check info
    logOut();
    cy.visit("/");
    cy.contains(TestDescription);
    //check pricing info
    cy.contains(TestPrice.price);
    cy.contains(TestPrice.time);
    //check working hours
    cy.contains(TestWorkingHour);




  })






  it('UC-33, Test delete customer account', () => {
    loginAccount(TestUserInfo);
    cy.wait(WAIT_TIME);
    clickIcon();
    cy.get('.v-list-item').contains("User Profile").click();
    clickUrl("/panel/profile/unsubscribe");
    clickButtonWith('delete account');
    clickButtonWith('yes, delete it');
  })




})