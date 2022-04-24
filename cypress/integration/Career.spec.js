// Career.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test



describe("Career page checks", () => {
    /*beforeEach(() => {

    });*/

    it("Page rendered", () => {
        cy.visit("/");
        cy.get("body").should("exist");
    });

   it("Linear form rendered", () => {
       cy.get("#formContainer").should("exist");
       cy.get("#incomeImmediate").should("exist");
       cy.get("#linearJobTitle").should("exist");
       cy.get("#incomeCeiling").should("exist");
       cy.get("#yearToIncomeCeiling").should("exist");
       cy.get("#yearIncomeBegins").should("exist");
       cy.get("#submitLinearJob").should("exist");
   });

   it("Creates a linear job", () => {
       cy.get("#linearJobTitle").type("Wally");
       cy.get("#incomeImmediate").type("500");
       cy.get("#incomeCeiling").type("800");
       cy.get("#yearToIncomeCeiling").select("5");
       cy.get("#yearIncomeBegins").select("2");
       cy.get("#submitLinearJob").click();
       cy.get(".linearJobKey0").should("exist");
       cy.wait(500);
   });

   it("Deletes the previously-created linear job.", () => {
        cy.get(".deleteLinearJobKey0").click();
        cy.wait(500);
        cy.get(".linearJobKey0").should("not.exist");
   });

   it("Creates and deletes income form(s) for stepped-income jobs.", () => {
       cy.get("#addSteppedIncome").should("exist");
       cy.get("#addSteppedIncome").click();
       cy.get(".incomeSteppedJob").should('have.length', 2);
       cy.wait(300)
       cy.get("#deleteSteppedIncome").should("exist");
       cy.get("#deleteSteppedIncome").click();
       cy.get(".incomeSteppedJob").should('have.length', 1);
   })
});


//TODO Add error checking for stepped job submissions.
