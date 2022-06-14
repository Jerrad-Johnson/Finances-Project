Cypress.Commands.add("getSampleData", () => {
    cy.visit("localhost:3000");
    cy.get(".getSampleValues").click();
});

Cypress.Commands.add("tryAllGraphTypes", () => {

    let graphOptions = ["Running Liquid Assets Sums vs. Yearly Expenses", "Total Assets", "Assets vs. Inflation",
        "Combined Investment Expenses", "Expenses by Group", "Income by Group", "Investment Income",
        "Same Year Expendable", "Taxes by Category", "Tax Percentage by Year"];

    for (let i = 0; i <= graphOptions.length;){
        cy.tryAllDatasetOptions(".firstGraph", ".secondGraph", graphOptions[i], graphOptions[i+1])
        i += 2;
    }
});

Cypress.Commands.add("tryAllDatasetOptions", (graphOneClassName, graphTwoClassName, graphOneName, graphTwoName) => {

    console.log(5)

    for (let i = 0; i < 2; i++){
        cy.getSampleData();
        let dataChoice;
        i == 0 ? dataChoice = 0 : dataChoice = "No Data";
        cy.get(graphOneClassName).select(graphOneName);
        cy.get(graphTwoClassName).select(graphTwoName);
        cy.get(".incomeDataset").select(dataChoice);
        cy.get(".expensesDataset").select(dataChoice);
        cy.get(".investmentDataset").select(dataChoice);
        cy.get(".apexcharts-canvas").eq(0).should("exist");
        cy.get(".apexcharts-canvas").eq(1).should("exist");

        for (let j = 0; j < 2; j++){
            cy.getSampleData();
            let dataChoice;
            cy.get(graphOneClassName).select(graphOneName);
            cy.get(graphTwoClassName).select(graphTwoName);
            j == 0 ? dataChoice = 0 : dataChoice = "No Data";
            cy.get(".incomeDataset").select(dataChoice);
            cy.get(".expensesDataset").select(dataChoice);
            cy.get(".investmentDataset").select(dataChoice);
            cy.get(".apexcharts-canvas").eq(0).should("exist");
            cy.get(".apexcharts-canvas").eq(1).should("exist");

            for (let k = 0; k < 2; k++){
                cy.getSampleData();
                let dataChoice;
                cy.get(graphOneClassName).select(graphOneName);
                cy.get(graphTwoClassName).select(graphTwoName);
                k == 0 ? dataChoice = 0 : dataChoice = "No Data";
                cy.get(".incomeDataset").select(dataChoice);
                cy.get(".expensesDataset").select(dataChoice);
                cy.get(".investmentDataset").select(dataChoice);
                cy.get(".apexcharts-canvas").eq(0).should("exist");
                cy.get(".apexcharts-canvas").eq(1).should("exist");
            }
        }
    }

/*
    cy.getSampleData();
    cy.get(".incomeDataset").select("No Data");
    cy.get(".expensesDataset").select(0);
    cy.get(".investmentDataset").select(0);
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist");
    //011

    cy.getSampleData();
    cy.get(".incomeDataset").select("No Data");
    cy.get(".expensesDataset").select("No Data");
    cy.get(".investmentDataset").select(0);
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist");
    //001

    cy.getSampleData();
    cy.get(".incomeDataset").select("No Data");
    cy.get(".expensesDataset").select("No Data");
    cy.get(".investmentDataset").select("No Data");
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist");
    //000

    cy.getSampleData();
    cy.get(".incomeDataset").select("No Data");
    cy.get(".expensesDataset").select(0);
    cy.get(".investmentDataset").select(0);
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist");
    //011

    cy.getSampleData();
    cy.get(".incomeDataset").select("No Data");
    cy.get(".expensesDataset").select(0);
    cy.get(".investmentDataset").select("No Data");
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist");
    //010

    cy.getSampleData();
    cy.get(".incomeDataset").select(0);
    cy.get(".expensesDataset").select("No Data");
    cy.get(".investmentDataset").select(0);
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist")
    //101

    cy.getSampleData();
    cy.get(".incomeDataset").select(0);
    cy.get(".expensesDataset").select("No Data");
    cy.get(".investmentDataset").select("No Data");
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist")
    //100

    cy.getSampleData();
    cy.get(".incomeDataset").select(0);
    cy.get(".expensesDataset").select(0);
    cy.get(".investmentDataset").select("No Data");
    cy.get(".apexcharts-canvas").eq(0).should("exist");
    cy.get(".apexcharts-canvas").eq(1).should("exist")
    //110*/
});

describe("Evaluate page checks", () => {
    it("Gets preset values", () => {
        cy.visit("localhost:3000");
        cy.get(".getSampleValues").click();
    });

    it("Checks that every graph will render with any combination of datasets", () => {
        cy.tryAllGraphTypes();
    });
});