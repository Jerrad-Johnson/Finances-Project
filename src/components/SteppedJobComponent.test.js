import { render, screen } from '@testing-library/react';
import {runCalculationsOnSteppedData, checkSteppedData} from "./SteppedJobComponent";

let jobData = {
    jobTitle: "Wally",
    salaryYears: [2, 5],
    salaryAmounts: [50000, 100000],
};

let checkedJobData = [{
    jobTitle: "Wally",
    key: 0,
    salaryYears: [2, 5],
    salaryAmounts: [50000, 100000],
    pass: true,
}];

test("Good in, Good out -- error checks for checkSteppedJobData", () => {
    expect(checkSteppedData(jobData)).toEqual(checkedJobData);
});

test("Error checks in checkSteppedJobData", () => {
    expect(() => {
        jobData.jobTitle = '';
        checkSteppedData(jobData);
    }).toThrow("Job Title not set.");

    expect(() => {
        jobData.jobTitle = "Wally";
        jobData.salaryAmounts = [5, "lol"];
        checkSteppedData(jobData);
    }).toThrow("Salary fields must be filled, and contain only numbers.");

    expect(() => {
        jobData.salaryAmounts = [50000, 100000];
        jobData.salaryYears = [2, 2];
        checkSteppedData(jobData);
    }).toThrow("Year in field 1 is less than or equal to the year in the previous field.");

    jobData.salaryYears = [2, 5];

});

test("Good in, Good out; runCalculationsOnCheckedData", () => {
    let jobDataReturned = [{
        jobTitle: "Wally",
        key: 0,
        pass: true,
        salaryAmounts: [0, 50000, 50000, 50000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000],
        salarySumByYear: [0, 50000, 100000, 150000, 250000, 350000, 450000, 550000, 650000, 750000, 850000, 950000, 1050000, 1150000, 1250000],
        salaryYears: [2, 5],
        sum: 1250000,
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }];

    expect(runCalculationsOnSteppedData(checkedJobData)).toEqual(jobDataReturned);
});