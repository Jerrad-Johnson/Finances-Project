import { render, screen } from '@testing-library/react';
import Career from "./Career";
import Jobdatahandler from "./libs/jobdatahandler";
import JobDataHandler from "./libs/jobdatahandler";


var jobsData = [{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
},{
    immediateIncome: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearsToIncomeCeiling: 5,
}];

var jobsDataWithLinearEntry = [{
    immediateIncome: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearsToIncomeCeiling: 5,
    key: 5,
}];

var jobsDataWithSteppedEntry = [{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
}];


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

test('Checks whether linear income is calculated over more than an X-year period', () => {
    let x = new JobDataHandler().doesLinearIncomeTimeframeExceedGraphLimit(jobsDataWithLinearEntry);
    expect(x).toBeDefined();

    /*let z = new JobDataHandler().doesLinearIncomeTimeframeExceedGraphLimit(jobsDataWithSteppedEntry);
    expect(z).toThrow();*/
});

test('Calculates salary raise per year from a linear-income job.', () => {
    let x = new JobDataHandler().calculateLinearIncomeEachYear(jobsDataWithLinearEntry);

    x.forEach(job => {
        expect(job.incomeIncreasePerYear).toBe(7000);
    });
});
