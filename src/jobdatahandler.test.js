import { render, screen } from '@testing-library/react';
import Career from "./Career";
import JobDataHandler from "./libs/jobdatahandler";




test('Checks linear data', () => {
    let x = new JobDataHandler(jobsData).findLinearIncomeJobs();
    expect(x).toBeDefined();

    let y = new JobDataHandler(jobsDataWithSteppedEntry).findLinearIncomeJobs();
    expect(y).toBeUndefined();
});

/*test('Checks stepped data', () => {
    let x = new JobDataHandler(jobsData).findStepped();
    expect(x).toBeDefined();

    let y = new JobDataHandler(jobsDataWithLinearEntry).findStepped();
    expect(y).toBeUndefined();
});*/


test('Calculates salary raise per year from a linear-income job.', () => {
    let x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(jobsDataWithLinearEntry);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(7000);
    });

    let a = jobsDataWithLinearEntry;
    a[0].incomeImmediate = 0;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(14000);
    });

    a = jobsDataWithLinearEntry;
    a[0].incomeImmediate = 70000;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(0);
    });

    a = jobsDataWithLinearEntry;
    a[0].incomeImmediate = 0;
    a[0].incomeCeiling = 13;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(2.60);
    });

    a = jobsDataWithLinearEntry;
    a[0].yearToIncomeCeiling = 5;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(0);
    });

    a = jobsDataWithLinearEntry;
    a[0].yearToIncomeCeiling = 2;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(0);
    });

});


test(`Creation of array with number of steps (years) in graph, each step showing the user's salary for that year.`, () => {
    let incomeSteps = [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200]
    let job1DataForGraphingSteps = [{
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
    }]
    let x = new JobDataHandler().createIncomeArrayWithGraphYearsNumberOfSteps(jobsDataWithLinearEntry);
    let y = new JobDataHandler().createIncomeArrayWithGraphYearsNumberOfSteps(job1DataForGraphingSteps);
    let graphYears = new JobDataHandler().graphMaxNumberOfYears;





    x.forEach(job => {
        expect(job.incomeInGraphYearsNumberOfSteps).toBeDefined();
    });

    x.forEach(job => {
        expect(job.incomeInGraphYearsNumberOfSteps).toHaveLength(graphYears)
    });

    expect(y[0].incomeInGraphYearsNumberOfSteps).toEqual(incomeSteps);

});

test("Returns the sum of the user's income over the years", () => {
    let job = [{
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200]
    }]

    let x = new JobDataHandler().sumIncomeFromLinearJob(job);
    expect(x[0].linearIncomeSum).toEqual(2250);
});



test("Returns the sum of the user's income over the years", () => {
    let job = [{
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200],
        linearIncomeSum: 2250,
    }];
    let incomeSumByYear = [100, 207, 321, 442, 571, 707, 850, 1000, 1157, 1321, 1492, 1671, 1857, 2050, 2250]
    let x = new JobDataHandler().sumIncomeFromLinearJobByYear(job);

    expect(x[0].sumIncomeByYear).toEqual(incomeSumByYear);
});

test("Add an array of named years (as a string) for printing to graphs.", () => {
    let job = [{
        incomeImmediate: 100,
        incomeCeiling: 200,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeIncreasePerYear: 7.14,
        incomeInGraphYearsNumberOfSteps: [100, 107, 114, 121, 129, 136, 143, 150, 157, 164, 171, 179, 186, 193, 200],
        linearIncomeSum: 2250,
        sumIncomeByYear: [100, 207, 321, 442, 571, 707, 850, 1000, 1157, 1321, 1492, 1671, 1857, 2050, 2250]
    }];
    let x = new JobDataHandler().addArrayOfNumberedYears(job);
    let graphYears = new JobDataHandler().graphMaxNumberOfYears;

    for (let i = 0; i <= graphYears; i++){
        expect(x[0].yearsNumbered[i]).toEqual("Year " + [++i]);
    }
});


var jobsData = [{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
},{
    incomeImmediate: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearToIncomeCeiling: 10,
}];

var jobsDataWithLinearEntry = [{
    incomeImmediate: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearToIncomeCeiling: 10,
    key: 5,
}];

var jobsDataWithSteppedEntry = [{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
}];


