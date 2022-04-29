describe("Career page checks", () => {
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
       cy.wait(700);
   });

   it("Deletes the previously-created linear job.", () => {
        cy.get(".deleteLinearJobKey0").click();
        cy.wait(300);
        cy.get(".linearJobKey0").should("not.exist");
   });

   it("Creates and deletes income form(s) for stepped-income jobs.", () => {
       cy.get("#addSteppedIncome").should("exist");
       cy.get("#addSteppedIncome").click();
       cy.get(".incomeSteppedJob").should('have.length', 2);
       cy.wait(200)
       cy.get("#deleteSteppedIncome").should("exist");
       cy.wait(200)
       cy.get("#deleteSteppedIncome").click();
   });

   it("Creates a stepped-income job and then deletes it.", () => {
       cy.get("#addSteppedIncome").click();
       cy.get("#addSteppedIncome").click();
       cy.get("#steppedJobTitle").type("Salesman")
       cy.get(".incomeSteppedJob").should('have.length', 3);
       cy.get(".incomeSteppedJob").eq(0).type("50000");
       cy.get(".incomeSteppedJob").eq(1).type("60000");
       cy.get(".incomeSteppedJob").eq(2).type("95000");
       cy.get("form select.yearThisSteppedIncomeBegins").eq(0).select("1");
       cy.get("form select.yearThisSteppedIncomeBegins").eq(1).select("3");
       cy.get("form select.yearThisSteppedIncomeBegins").eq(2).select("8");
       cy.get("#submitSteppedJob").click();
       cy.get(".steppedJobKey0").should("exist");
       cy.wait(700);
       cy.get(".deleteSteppedJobKey0").click();
       cy.get(".steppedJobKey0").should("not.exist");
   });
});

