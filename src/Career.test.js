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

var jobsDataWithoutSteppedEntry = [{
    immediateIncome: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearsToIncomeCeiling: 5,
}];

var jobsDataWithoutLinearEntry = [{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
}];


test('Checks linear data', () => {
    let x = new JobDataHandler(jobsData).findLinear();
    expect(x).toBeDefined();

    let y = new JobDataHandler(jobsDataWithoutLinearEntry).findLinear();
    expect(y).toBeUndefined();
});

test('Checks stepped data', () => {
    let x = new JobDataHandler(jobsData).findStepped();
    expect(x).toBeDefined();

    let y = new JobDataHandler(jobsDataWithoutSteppedEntry).findStepped();
    expect(y).toBeUndefined();
});
