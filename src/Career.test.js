import { render, screen } from '@testing-library/react';
import Career, {checkLinearData} from "./Career";

test("Test error checks in checkLinearData.", () => {
    let jobTitle = "Wal-Mart";
    let incomeCeiling = 200;
    let incomeImmediate = 100;
    let yearToIncomeCeiling = 7;
    let yearIncomeBegins = 1;

   let x = checkLinearData(jobTitle, incomeCeiling, incomeImmediate, yearToIncomeCeiling, yearIncomeBegins);
   let errorCheckJobTitle = checkLinearData("", incomeCeiling, incomeImmediate, yearToIncomeCeiling, yearIncomeBegins);

    expect(x[0].jobTitle).toBe("Wal-Mart");
    expect(x[0].incomeCeiling).toBe(+200);
    expect(x[0].incomeImmediate).toBe(+100);
    expect(x[0].yearToIncomeCeiling).toBe(+6);
    expect(x[0].yearIncomeBegins).toBe(+0);

    expect(errorCheckJobTitle.fn).toThrow("Job Title not set");

})


let job = [{
    incomeCeiling: 200,
    incomeImmediate: 100,
    incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200],
    incomeIncreasePerYear: 7.14,
    jobTitle: "Wally",
    key: 0,
    linearIncomeSum: 2250,
    sumIncomeByYear: [100, 207, 321, 442, 571, 707, 850, 1000, 1157, 1321, 1492, 1671, 1857, 2050, 2250],
    yearIncomeBegins: 0,
    yearToIncomeCeiling: 14,
    yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
}];