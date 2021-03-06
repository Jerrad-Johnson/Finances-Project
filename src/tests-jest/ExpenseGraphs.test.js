import {checkSubmissionData, addKeyToSheet} from "../components/ExpensesGraphHandler";

var expenseData = {
    beginYears: [5, 10],
    endYears: [6, 15],
    expenseSheetTitle: "Coder",
    amount: [500, 700],
};

test("Check title, begin vs. end year ranges, and amounts entered.", () => {
    expect(() => {
        expenseData.title = '';
        checkSubmissionData(expenseData);
    }).toThrow("Please enter a title.");
    expenseData.title = "Coder"

    expect(() => {
       expenseData.beginYears = [15, 15];
       checkSubmissionData(expenseData);
    }).toThrow("End year must be later than or the same year as the begin year.");
   expenseData.beginYears = [5, 10];

   expect(() => {
       expenseData.amount = [500, ''];
       checkSubmissionData(expenseData);
   }).toThrow("Please enter a number in every value field.");
   expenseData.amount = [500, 700];

    expect(() => {
        expenseData.amount = [0];
        checkSubmissionData(expenseData);
    }).toThrow("Please enter a number greater than 0 in the \"Amount\" field.");
    expenseData.amount = [500, 700];

   expect(checkSubmissionData(expenseData)).toHaveProperty('amount');
});

test("Check that a key gets added to expenseData", () => {
    expect(addKeyToSheet(expenseData)).toHaveProperty('key');
});