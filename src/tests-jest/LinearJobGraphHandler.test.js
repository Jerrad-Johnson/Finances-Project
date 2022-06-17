import {runCalculationsOnLinearData, checkLinearJobData} from "../components/LinearJobGraphHandler";

test("Good in, Good out -- error checks from checkLinearJobData", () => {
    let jobData = {
        title: "Wal-Mart",
        incomeCeiling: 200,
        incomeImmediate: 100,
        yearToIncomeCeiling: 7 -1, // LinearJobComponent decrements by 1
        yearIncomeBegins: 1 -1,
    };
    let x = checkLinearJobData(jobData);

    expect(x.title).toBe("Wal-Mart");
    expect(x.incomeCeiling).toBe(+200);
    expect(x.incomeImmediate).toBe(+100);
    expect(x.yearToIncomeCeiling).toBe(+6);
    expect(x.yearIncomeBegins).toBe(+0);
});

test("Test error checks in checkLinearData.", () => {

    let jobDataErrorChecks = {
        title: "Wal-Mart",
        incomeCeiling: 200,
        incomeImmediate: 100,
        yearToIncomeCeiling: 7 -1,
        yearIncomeBegins: 1 -1,
    };

    expect(() => {
        jobDataErrorChecks.title = '';
        checkLinearJobData(jobDataErrorChecks)
    }).toThrow("Job Title not set.");

    expect(() => {
        jobDataErrorChecks.title = 'Wal-Mart';
        jobDataErrorChecks.incomeImmediate = "";
        checkLinearJobData(jobDataErrorChecks);
    }).toThrow("Set starting income to a number greater than 0.");

    expect(() => {
        jobDataErrorChecks.incomeImmediate = "500";
        jobDataErrorChecks.incomeCeiling = "";
        checkLinearJobData(jobDataErrorChecks);
    }).toThrow("Set ceiling income to a number greater than 0.");

    expect(() => {
        jobDataErrorChecks.incomeCeiling = "500";
        jobDataErrorChecks.yearToIncomeCeiling = undefined;
        checkLinearJobData(jobDataErrorChecks);
    }).toThrow("Year to income ceiling not set.");

    expect(() => {
        jobDataErrorChecks.yearToIncomeCeiling = 5;
        jobDataErrorChecks.yearIncomeBegins = undefined;
        checkLinearJobData(jobDataErrorChecks);
    }).toThrow("Year to beginning of income not set.");

    expect(() => {
        jobDataErrorChecks.yearToIncomeCeiling = 5;
        jobDataErrorChecks.yearIncomeBegins = 5;
        checkLinearJobData(jobDataErrorChecks);
    }).toThrow("Beginning income year is later than or equal to ceiling income year.");

    expect(() => {
        jobDataErrorChecks.yearIncomeBegins = 7;
        checkLinearJobData(jobDataErrorChecks);
    }).toThrow("Beginning income year is later than or equal to ceiling income year.");

});

test("Check for data match after running calculations.", () => {
    let jobData = {
        passed: true,
        title: "Wal-Mart",
        incomeCeiling: 200,
        incomeImmediate: 100,
        yearToIncomeCeiling: 14,
        yearIncomeBegins: 0,
        key: 0,
    };

    let calculatedJobData = {
        passed: true,
        incomeCeiling: 200,
        incomeImmediate: 100,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200],
        incomeIncreasePerYear: 7.14,
        title: "Wal-Mart",
        key: 0,
        sum: 2250,
        sumIncomeByYear: [100, 207, 321, 442, 571, 707, 850, 1000, 1157, 1321, 1492, 1671, 1857, 2050, 2250],
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    };

    expect(runCalculationsOnLinearData(jobData)).toEqual(calculatedJobData);
});
