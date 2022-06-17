import { render, screen } from '@testing-library/react';
import CareerDataHandler from "../libs/CareerDataHandler";


test('Linear data end-to-end test', () => {
    let x = new CareerDataHandler(jobsData).beginLinear();
    expect(x).toBeDefined();

    let y = new CareerDataHandler(jobsDataWithSteppedEntry).beginStepped();
    expect(y).toBeUndefined();
});


test('Calculates salary raise per year from a linear-income job.', () => {
    let x = new CareerDataHandler().calculateLinearIncomeIncreaseEachYear(jobsDataWithLinearEntry);
    expect(x.incomeIncreasePerYear).toBe(7000);

    let a = jobsDataWithLinearEntry;
    a.incomeImmediate = 0;

    x = new CareerDataHandler().calculateLinearIncomeIncreaseEachYear(a);
    expect(x.incomeIncreasePerYear).toBe(14000);

    a = jobsDataWithLinearEntry;
    a.incomeImmediate = 70000;

    x = new CareerDataHandler().calculateLinearIncomeIncreaseEachYear(a);
    expect(x.incomeIncreasePerYear).toBe(0);

    a = jobsDataWithLinearEntry;
    a.incomeImmediate = 0;
    a.incomeCeiling = 13;

    x = new CareerDataHandler().calculateLinearIncomeIncreaseEachYear(a);
    expect(x.incomeIncreasePerYear).toBe(2.60);

    a = jobsDataWithLinearEntry;
    a.yearToIncomeCeiling = 5;

    x = new CareerDataHandler().calculateLinearIncomeIncreaseEachYear(a);
    expect(x.incomeIncreasePerYear).toBe(0);

    a = jobsDataWithLinearEntry;
    a.yearToIncomeCeiling = 2;

    x = new CareerDataHandler().calculateLinearIncomeIncreaseEachYear(a);
    expect(x.incomeIncreasePerYear).toBe(0);
});

test(`Creation of array with number of steps (years) in graph, each step showing the user's salary for that year.`, () => {
    let incomeSteps = [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200]
    let job1DataForGraphingSteps = {
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
    }
    let x = new CareerDataHandler().createLinearIncomeArrayWithGraphYearsNumberOfSteps(jobsDataWithLinearEntry);
    let y = new CareerDataHandler().createLinearIncomeArrayWithGraphYearsNumberOfSteps(job1DataForGraphingSteps);
    let graphYears = new CareerDataHandler().graphMaxNumberOfYears;

    expect(x.incomeInGraphYearsNumberOfSteps).toBeDefined();
    expect(x.incomeInGraphYearsNumberOfSteps).toHaveLength(graphYears)
    expect(y.incomeInGraphYearsNumberOfSteps).toEqual(incomeSteps);

});

test("Returns the sum of the user's income over the years", () => {
    let job = {
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200]
    }

    let x = new CareerDataHandler().sumIncomeFromLinearJob(job);
    expect(x.sum).toEqual(2250);
});

test("Returns the sum of the user's income over the years", () => {
    let job = {
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200],
        linearIncomeSum: 2250,
    };
    let incomeSumByYear = [100, 207, 321, 442, 571, 707, 850, 1000, 1157, 1321, 1492, 1671, 1857, 2050, 2250]
    let x = new CareerDataHandler().sumIncomeFromLinearJobByYear(job);

    expect(x.sumIncomeByYear).toEqual(incomeSumByYear);
});

test("Add an array of named years (as a string) for printing to graphs.", () => {
    let job = {
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200],
        linearIncomeSum: 2250,
        sumIncomeByYear: [100, 207, 321, 442, 571, 707, 850, 1000, 1157, 1321, 1492, 1671, 1857, 2050, 2250]
    };
    let x = new CareerDataHandler().addArrayOfNumberedYears(job);
    let graphYears = new CareerDataHandler().graphMaxNumberOfYears;

    for (let i = 0; i <= graphYears; i++){
        expect(x.yearsNumbered[i]).toEqual("Year " + [++i]);
    }
});

test('Stepped data end-to-end test', () => {
    let x = new CareerDataHandler(steppedJobData).beginStepped();
    expect(x).toBeDefined();
    //expect(x.yearsNumbered.length).tobe(15);
});

var jobsData = {
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
    incomeImmediate: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearToIncomeCeiling: 10,
    passed: true,
};

var jobsDataWithLinearEntry = {
    incomeImmediate: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearToIncomeCeiling: 10,
    key: 5,
};

var jobsDataWithSteppedEntry = {
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
};

var steppedJobData = {
    salaryYears: [2, 5, 8],
    salaryAmounts: [50000, 80000, 85000],
    title: "Salesman",
    key: 0,
    passed: true,
};

