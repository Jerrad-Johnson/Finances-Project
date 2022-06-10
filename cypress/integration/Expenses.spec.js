describe("Tests the expenses page", () => {
    it("Visits the page", () => {
        cy.visit("/Expenses");
    });

    it("Checks that entry fields can be deleted and added.", () => {
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".inputSelectorsCard").eq(2).should("exist");
        cy.get(".delete-entry-field").click();
        cy.get(".delete-entry-field").click();
        cy.get(".delete-entry-field").eq(1).should("not.exist");
    });

    it("Creates six more entry forms", () => {
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".add-entry-field").click();
        cy.wait(100);
        cy.get(".add-entry-field").click();
        cy.wait(100);
    });

    it("Fills all seven entry forms", () => {
        cy.get(".expenseTitle").type("Franchises");

        cy.get(".label").eq(0).type("Utilities");
        cy.get(".label").eq(1).type("Food");
        cy.get(".label").eq(2).type("Car");
        cy.get(".label").eq(3).type("Tuition");
        cy.get(".label").eq(4).type("Gym");
        cy.get(".label").eq(5).type("Misc");
        cy.get(".label").eq(6).type("Rent");

        cy.get(".payment").eq(0).type("200");
        cy.get(".payment").eq(1).type("300");
        cy.get(".payment").eq(2).type("700");
        cy.get(".payment").eq(3).type("3200");
        cy.get(".payment").eq(4).type("25");
        cy.get(".payment").eq(5).type("200");
        cy.get(".payment").eq(6).type("1300");

        cy.get(".frequency").eq(3).select("yr");

        cy.get(".beginYear").eq(2).select("4");

        cy.get(".endYear").eq(0).select("15");
        cy.get(".endYear").eq(1).select("15");
        cy.get(".endYear").eq(2).select("15");
        cy.get(".endYear").eq(3).select("3");
        cy.get(".endYear").eq(4).select("15");
        cy.get(".endYear").eq(5).select("15");
        cy.get(".endYear").eq(6).select("15");
    });

    it("Submits the form and checks if they render.", () => {
        cy.get(".submit").click();
        cy.get(".apexcharts-canvas").eq(0).should("exist");
        cy.get(".apexcharts-canvas").eq(1).should("exist");
        cy.get(".apexcharts-canvas").eq(2).should("exist");
    });

    it("Deletes the graph and checks that it's gone.", () => {
        cy.wait(1200);
        cy.get(".deleteSheet").click();
        cy.get(".apexcharts-canvas").should("not.exist");
    });

    it("Resets the forms and checks that the extra expense inputs are deleted.", () => {
        cy.get(".reset").click();
        cy.get(".label").eq(1).should("not.exist");
    });

});
