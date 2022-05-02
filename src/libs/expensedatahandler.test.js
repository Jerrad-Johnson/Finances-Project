import ExpenseDataHandler from "./expensedatahandler";
import {getArrayAsString, getKey} from "../utilities/jest-supplements";

var expensehandler = new ExpenseDataHandler();
var sheet = {
    amount: [50, 1200, 800, 1500, 2000],
    frequency: ['mo', 'yr', 'mo', 'mo', 'yr'],
    numberOfEntries: 5,
    beginYears: [1, 1, 5, 5, 10],
    endYears: [5, 15, 10, 15, 11],
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






