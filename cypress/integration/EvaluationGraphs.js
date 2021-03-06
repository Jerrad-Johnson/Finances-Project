describe("Evaluate page checks", () => {
    it("Gets preset values", () => {
        cy.visit("localhost:3000");
        cy.get(".getSampleValues").click();
    });

    it("Checks that every graph will render with any combination of datasets", () => {
        cy.tryAllGraphTypes();
    });
});

Cypress.Commands.add("tryAllGraphTypes", () => {
    let graphOptions = ["Running Liquid Assets Sums vs. Yearly Expenses", "Total Assets", "Assets vs. Inflation",
        "Combined Investment Expenses", "Expenses by Group", "Income by Group", "Investment Income",
        "Same Year Expendable", "Taxes by Category", "Tax Percentage by Year"];

    for (let i = 0; i < graphOptions.length; i += 2){
        cy.tryAllDatasetOptions(".firstGraph", ".secondGraph", graphOptions[i], graphOptions[i+1]);
    }
});

Cypress.Commands.add("tryAllDatasetOptions", (graphOneClassName, graphTwoClassName,
                                                       graphOneName, graphTwoName) => {
    for (let i = 0; i < 2; i++){
        let dataChoice;
        i == 0 ? dataChoice = 0 : dataChoice = "No Data";
        cy.getSampleData();
        cy.setAndCheckOptions(graphOneClassName, graphTwoClassName, graphOneName, graphTwoName, dataChoice);

        for (let j = 0; j < 2; j++){
            let dataChoice;
            j == 0 ? dataChoice = 0 : dataChoice = "No Data";
            cy.getSampleData();
            cy.setAndCheckOptions(graphOneClassName, graphTwoClassName, graphOneName, graphTwoName, dataChoice);

            for (let k = 0; k < 2; k++){
                let dataChoice;
                k == 0 ? dataChoice = 0 : dataChoice = "No Data";
                cy.getSampleData();
                cy.setAndCheckOptions(graphOneClassName, graphTwoClassName, graphOneName, graphTwoName, dataChoice);
            }
        }
    }
});

Cypress.Commands.add("getSampleData", () => {
    cy.visit("localhost:3000");
    cy.get(".getSampleValues").click();
});

Cypress.Commands.add("setAndCheckOptions", (graphOneClassName, graphTwoClassName,
                                                     graphOneName, graphTwoName, dataChoice) => {
    cy.get(graphOneClassName).select(graphOneName);
    cy.get(graphTwoClassName).select(graphTwoName);
    cy.get(".incomeDataset").select(dataChoice);
    cy.get(".expensesDataset").select(dataChoice);
    cy.get(".investmentDataset").select(dataChoice);
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist");
})