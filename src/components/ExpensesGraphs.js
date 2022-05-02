import ExpenseDataHandler from "../libs/expensedatahandler";
import {expenseGraphContainerKey} from "../Expenses";

var expenseSheetKey = 0;


export function SubmitButton({expensesState, setExpensesState}){


    return (
        <button className={"submit"} onClick={(e) => {
            e.preventDefault();
            handleExpensesSubmission(expensesState, setExpensesState);
            expenseGraphContainerKey++;
        }}>Submit</button>
    );
}

function handleExpensesSubmission(expensesState, setExpensesState){
    let expenseData = getExpenseDataFromFields();
    // error check fn
    expenseData = runCalculationsOnExpenseData(expenseData);
    expenseData = addKeyToSheet(expenseData);
    updateExpensesState(expenseData, expensesState, setExpensesState);
}

function getExpenseDataFromFields(){
    let expenseTitle = document.querySelector(".expenseTitle");
    let beginYears = document.querySelectorAll(".beginYear");
    let endYears = document.querySelectorAll(".endYear");
    let paymentFrequency = document.querySelectorAll(".frequency");
    let paymentAmount = document.querySelectorAll(".payment");
    let expenseLabel = document.querySelectorAll(".label");
    let expenseData = {
        expenseSheetTitle: [expenseTitle.value],
        beginYears: [],
        endYears: [],
        frequency: [],
        amount: [],
        label: [],
    };

    beginYears.forEach(e => {
        expenseData.beginYears.push(+e.value)
    });
    endYears.forEach(e => {
        expenseData.endYears.push(+e.value)
    });
    paymentFrequency.forEach(e => {
        expenseData.frequency.push(e.value)
    });
    paymentAmount.forEach(e => {
        expenseData.amount.push(+e.value)
    });
    expenseLabel.forEach(e => {
        expenseData.label.push(e.value)
    });
    return expenseData;
}

function runCalculationsOnExpenseData(expenseData){
    let dataToBeReturned = new ExpenseDataHandler(expenseData);
    return dataToBeReturned.beginCalculations();
}

function addKeyToSheet(expenseData){
    expenseData.key = expenseSheetKey;
    expenseSheetKey++;
    return expenseData;
}

function updateExpensesState(expenseData, expensesState, setExpensesState){
    let combinedExpenseSheets;
    if (expensesState.length !== 0){
        combinedExpenseSheets = [...[expenseData], ...expensesState];
        setExpensesState(combinedExpenseSheets);
        return true;
    } else {
        setExpensesState([expenseData]);
        return true;
    }
}

export function DeleteSheetButton({expenseSheet, expensesState, setExpensesState}) {
    return (
        <button className={"deleteSheet"} onClick={((e) => {
            e.preventDefault();
            deleteSelectedSheet(expenseSheet.key, expensesState, setExpensesState);
        })}>Delete Sheet {expenseSheet.key}</button>
    );
}

function deleteSelectedSheet(key, expensesState, setExpensesState){
    let combinedExpenseSheets = [];
    combinedExpenseSheets = [...expensesState];

    let keyPositionInArray = combinedExpenseSheets.findIndex(o => o.key === key);
    combinedExpenseSheets.splice(keyPositionInArray, 1);

    setExpensesState(combinedExpenseSheets);
}
