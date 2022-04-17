// Career.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test



describe("Career page checks", () => {
    beforeEach(() => {
        cy.visit("/");
    });

   it("Linear form rendered", () => {
       cy.get(".formContainer").should("exist");
       cy.get("#incomeImmediate").should("exist");
       cy.get("#jobTitle").should("exist");
       cy.get("#incomeCeiling").should("exist");
       cy.get("#yearToIncomeCeiling").should("exist");
       cy.get("#yearIncomeBegins").should("exist");
       cy.get("#submitLinearJob").should("exist");
   });

   it("Enters a linear job", () => {
       cy.get("#jobTitle").type("Wally");
       cy.get("#incomeImmediate").type("500");
       cy.get("#incomeCeiling").type("800");
       cy.get("#yearToIncomeCeiling").select("5");
       cy.get("#yearIncomeBegins").select("2");
       cy.get("#submitLinearJob").click();
   });
});

