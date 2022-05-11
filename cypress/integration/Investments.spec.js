describe("Tests the investment page", () => {

    it("Visits the investment page", () => {
        cy.visit("localhost:3000/Investments.js");
    });

    it("Adds and deletes sets of fields", () => {
        cy.get(".addInvestmentFields").click();
        cy.get(".addInvestmentFields").click();
        cy.get(".investmentForms").eq(2).should("exist");
        cy.get(".removeInvestmentField").eq(2).click();
        cy.get(".removeInvestmentField").eq(1).click();
        cy.get(".investmentForms").eq(1).should("not.exist");
    });

    it("Adds two sets of fields and fills them", () => {
        cy.get(".addInvestmentFields").click();
        cy.get(".addInvestmentFields").click();

        cy.get(".investmentstitle").type("Ultimate Riches!");
        cy.get(".label").eq(0).type("Franchise");
        cy.get(".amount").eq(0).type("500000");
        cy.get(".additionalinvestment ").eq(0).type("75000");
        cy.get(".yearBegin").eq(0).select("6");
        cy.get(".percentreturn").eq(0).type("55");

        cy.get(".label").eq(1).type("MFC");
        cy.get(".amount").eq(1).type("250000");
        cy.get(".yearBegin").eq(1).select("8");
        cy.get(".percentreturn").eq(1).type("11");

        cy.get(".label").eq(2).type("Mutual Funds");
        cy.get(".amount").eq(2).type("25000");
        cy.get(".yearBegin").eq(2).select("1");
        cy.get(".yearWithdraw").eq(2).select("6");
        cy.get(".percentreturn").eq(2).type("7");

        cy.get(".submitinvestment").click();

        cy.get(".apexcharts-canvas").should("exist");
    });

    it("Deletes the graph", () => {
        cy.get(".submitInvestments").click();
        cy.get(".apexcharts-canvas").should("not.exist");
    });

});