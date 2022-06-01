import ExpenseDataHandler from "../libs/expensedatahandler";
import {isNumeric} from "./jobssharedfunctions";
import {useLocalStorage} from "../hooks/useLocalStorage";


let cc = console.log;

export function SubmitButton({expensesState, setExpensesState}){
    const [sheetObjectKeyState, setSheetObjectKeyState] = useLocalStorage("expenseSheetKey", localStorage.getItem("expenseSheetKey") || 0)

    return (
        <button className={"submit"} onClick={(e) => {
            e.preventDefault();

            handleExpensesSubmission(expensesState, setExpensesState, sheetObjectKeyState);
            setSheetObjectKeyState(sheetObjectKeyState + 1);
        }}>Submit</button>
    );
}

export function handleExpensesSubmission(expensesState, setExpensesState, sheetObjectKeyState){

    try {
        let expenseData = getExpenseDataFromFields();

        if (expenseData.pass == true) {
            expenseData = checkSubmissionData(expenseData);
        }

        if (expenseData.pass == true) {
            expenseData = runCalculationsOnExpenseData(expenseData);
        }

        expenseData = addKeyToSheet(expenseData, sheetObjectKeyState);
        updateExpensesState(expenseData, expensesState, setExpensesState);
    } catch (err) {
        console.log(err);
        return;
    }
}

function getExpenseDataFromFields(){
    //TODO Error checking
    let expenseTitle = document.querySelector(".expenseTitle");
    let beginYears = document.querySelectorAll(".beginYear");
    let endYears = document.querySelectorAll(".endYear");
    let paymentFrequency = document.querySelectorAll(".frequency");
    let paymentAmount = document.querySelectorAll(".payment");
    let expenseLabel = document.querySelectorAll(".label");
    let expenseData = {
        title: expenseTitle.value,
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
        if (e.value === (undefined || "")){
            throw new Error("Please enter a label for every expense.");
        } else {
            expenseData.label.push(e.value)
        }
    });

    expenseData.pass = true;
    return expenseData;
}

export function checkSubmissionData(expenseData){
    let length = expenseData.beginYears.length;

    if (expenseData.title == (undefined || '')){
        expenseData.pass = false;
        throw new Error("Please enter a title.");
    }

    for (let i = 0; i < length; i++){
        if (expenseData.beginYears[i] > expenseData.endYears[i]) {
            throw new Error("End year must be later than or the same year as the begin year.");
        }
        if (!isNumeric(expenseData.amount[i])){
            throw new Error("Please enter a number in every expense amount/value field.");
        }
    }

    return expenseData;
}

function runCalculationsOnExpenseData(expenseData){
    let dataToBeReturned = new ExpenseDataHandler(expenseData);
    return dataToBeReturned.beginCalculations();
}

export function addKeyToSheet(expenseData, sheetObjectKeyState){
    expenseData.key = sheetObjectKeyState;
    return expenseData;
}

function updateExpensesState(expenseData, expensesState, setExpensesState){
    let combinedExpenseSheets;

    cc(expenseData)
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
        })}>Delete Sheet</button>
    );
}

function deleteSelectedSheet(key, expensesState, setExpensesState){
    let combinedExpenseSheets = [];
    combinedExpenseSheets = [...expensesState];

    let keyPositionInArray = combinedExpenseSheets.findIndex(o => o.key === key);
    combinedExpenseSheets.splice(keyPositionInArray, 1);

    setExpensesState(combinedExpenseSheets);
}