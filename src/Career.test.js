import { render, screen } from '@testing-library/react';
import Career from "./Career";
import Jobdatahandler from "./libs/jobdatahandler";
import JobDataHandler from "./libs/jobdatahandler";




test('Checks linear data', () => {
    let x = new JobDataHandler(jobsData).findLinearIncomeJobs();
    expect(x).toBeDefined();

    let y = new JobDataHandler(jobsDataWithSteppedEntry).findLinearIncomeJobs();
    expect(y).toBeUndefined();
});

test('Checks stepped data', () => {
    let x = new JobDataHandler(jobsData).findStepped();
    expect(x).toBeDefined();

    let y = new JobDataHandler(jobsDataWithLinearEntry).findStepped();
    expect(y).toBeUndefined();
});

test('Calculates salary raise per year from a linear-income job.', () => {
    let x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(jobsDataWithLinearEntry);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(7000);
    });

    let a = jobsDataWithLinearEntry;
    a[0].immediateIncome = 0;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(14000);
    });

    a = jobsDataWithLinearEntry;
    a[0].immediateIncome = 70000;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(0);
    });

    a = jobsDataWithLinearEntry;
    a[0].immediateIncome = 0;
    a[0].incomeCeiling = 13;

    x = new JobDataHandler().calculateLinearIncomeIncreaseEachYear(a);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(2);
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


var jobsData = [{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
},{
    immediateIncome: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearToIncomeCeiling: 10,
}];

var jobsDataWithLinearEntry = [{
    immediateIncome: 35000,
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
