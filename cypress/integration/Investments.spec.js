describe("Tests the investment page", () => {
    it("Visits the investment page", () => {
        cy.visit("localhost:3000/Investments.js");
    });

    it("Adds and deletes fields", () => {
        cy.get(".addInvestmentFields").click();
        cy.get(".addInvestmentFields").click();
        cy.get(".investmentForms").eq(2).should("exist");
        //cy.get(".removeInvestmentField").click();

    });
});