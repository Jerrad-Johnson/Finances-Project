import ExpenseDataHandler from "../libs/ExpenseDataHandler";
import {getArrayAsString, getKey} from "../utilities/jest-supplements";


var expensehandler = new ExpenseDataHandler();
var sheet = {
    amount: [50, 1200, 800, 1500, 2000],
    frequency: ['mo', 'yr', 'mo', 'mo', 'yr'],
    numberOfEntries: 5,
    beginYears: [1, 1, 5, 5, 10],
    endYears: [5, 15, 10, 15, 11],
    label: ['Util', 'Food', 'Rent', 'Car', 'Insurance'],
};


test("Check convertMonthlyExpenseToYearly", () => {
    let expected = [600, 1200, 9600, 18000, 2000];

    expect(getKey(expensehandler.convertMonthlyExpenseToYearly(sheet), "calculatedAmount")).toEqual(expected);
});

test("Check addArrayOfNumberedYearsForGraph", () => {
    let expected = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12", "Year 13", "Year 14",  "Year 15"];

    expect(getKey(expensehandler.addArrayOfNumberedYearsForGraph(sheet), "yearsNumbered")).toEqual(expected);
});

test("Check runningSumEachEntry", () => {
    let expected = [
        [600, 1200, 1800, 2400, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
        [1200, 2400, 3600, 4800, 6000, 7200, 8400, 9600, 10800, 12000, 13200, 14400, 15600, 16800, 18000],
        [0, 0, 0, 0, 9600, 19200, 28800, 38400, 48000, 57600, 57600, 57600,  57600,  57600,  57600],
        [0, 0, 0, 0, 18000, 36000, 54000, 72000, 90000, 108000, 126000, 144000, 162000, 180000, 198000],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 4000, 4000, 4000, 4000, 4000]
    ];

    expect(getKey(expensehandler.runningSumEachEntry(sheet), "runningSumsByYear")).toEqual(expected);
});

test("Check finalSumEachEntry", () => {
   let expected = [3000, 18000, 57600, 198000, 4000];
   expect(getKey(expensehandler.finalSumEachEntry(sheet), "sum")).toEqual(expected);
});

test('Check createRunningSumObjectForGraph', () => {
    let expected = [{
        data: [600, 1200, 1800, 2400, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
        name: 'Util'
    }, {
        data: [1200, 2400, 3600, 4800, 6000, 7200, 8400, 9600, 10800, 12000, 13200, 14400, 15600, 16800, 18000],
        name: 'Food',
    }, {
        data: [0, 0, 0, 0, 9600, 19200, 28800, 38400, 48000, 57600, 57600, 57600, 57600, 57600, 57600],
        name: 'Rent',
    }, {
        data: [0, 0, 0, 0, 18000, 36000, 54000, 72000, 90000, 108000, 126000, 144000, 162000, 180000, 198000],
        name: 'Car',
    }, {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 4000, 4000, 4000, 4000, 4000],
        name: 'Insurance',
    }];

    expect(getKey(expensehandler.createRunningSumObjectForGraph(sheet), "graphRunningSumObject")).toEqual(expected);
});

test('Check createSumObjectForGraph', () => {
   let expected = [{
       name: 'Util',
   }, {
       name: 'Food',
   }, {
       name: 'Rent',
   }, {
       name: 'Car',
   }, {
       name: 'Insurance',
   }];

   expect(getKey(expensehandler.createSumObjectForGraph(sheet), "graphSumObject")).toEqual(expected);
});

test("Check createYearsForSumEachEntry", () => {
    let expected = [{
        data: [600, 600, 600, 600, 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        name: 'Util'
    }, {
        data: [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200],
        name: 'Food',
    }, {
        data: [0, 0, 0, 0, 9600, 9600, 9600, 9600, 9600, 9600, 0, 0, 0, 0, 0],
        name: 'Rent',
    }, {
        data: [0, 0, 0, 0, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000],
        name: 'Car',
    }, {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 2000, 0, 0, 0, 0],
        name: 'Insurance',
    }];
    expect(getKey(expensehandler.createYearsForSumEachEntry(sheet), "graphSumObject")).toEqual(expected);
});

test("Check finalSumPerExpense", () => {
    let expected = [{
        name: ['Util', 'Food', 'Rent', 'Car', 'Insurance'],
        data: [3000, 18000, 57600, 198000, 4000],
}];
    expect(getKey(expensehandler.finalSumPerExpense(sheet), "graphSumEachExpenseObjectForDonut")).toEqual(expected);
});