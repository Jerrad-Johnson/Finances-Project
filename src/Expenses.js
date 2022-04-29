import {useState} from "react";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";
import ExpenseDataHandler from "./libs/expensedatahandler";

var fieldsStateKey = 0;
let cc = console.log;

function ExpensesContainer(){

    const [expenseFieldsState, setExpenseFieldsState] = useState([fieldsStateKey]);

    return (
        <>
            <ExpenseForms
                expenseFieldsState = {expenseFieldsState}
            />
            <span className={"mb-2 block"}></span>
            <DeleteFieldButton
                expenseFieldsState = {expenseFieldsState}
                setExpenseFieldState = {setExpenseFieldsState}
            />
            &nbsp;
            <AddFieldButton
                expenseFieldsState = {expenseFieldsState}
                setExpenseFieldState = {setExpenseFieldsState}
                fieldsStateKey = {fieldsStateKey}
            />
            <br />
            <SubmitButton />
            <ResetFieldsButton
                expenseFieldsState = {expenseFieldsState}
                setExpenseFieldsState = {setExpenseFieldsState}
            />
        </>
    );
}


function ExpenseForms({expenseFieldsState}){
    let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

    let optionElements = lengthOfGraphInYears.map(entry => {
       return(
         <option value={entry} key={entry}>{entry}</option>
       );
    });

    let printFormsToDom = expenseFieldsState.map(entry => {
        return (
            <div key={entry}>
                <input type="text" className={"inputField label text-black mb-2 ml-2 w-40"} defaultValue={""}></input>
                <span className={"ml-2"}> Label</span>
                <input type="text" className={"inputField expenses payment text-black mb-2 ml-2 w-14"} defaultValue={""}></input>
                <span className={"ml-2"}>Amount</span>
                <select className={"frequency ml-2 text-black"}>
                    <option value={"mo"}>Monthly</option>
                    <option value={"yr"}>Yearly</option>
                </select>
                <br />
                <select className={"beginYear ml-2 text-black"}>{optionElements}</select>
                <select className={"endYear ml-2 text-black mb-10"} >{optionElements}</select>
                <span className={"ml-2"}>Begin and End Years</span>
            </div>
       );
    });

    return (
        <>
            <form>
                <input type="text" className={"inputField jobtitle text-black mb-5 ml-2"} defaultValue={""}></input>
                <span className={"ml-2"}>Title</span>
                {printFormsToDom}
            </form>
        </>
    );
}

function DeleteFieldButton({expenseFieldsState, setExpenseFieldState}){

    return(
        <>
            <button onClick={(e) => {
                e.preventDefault();
                deleteField(expenseFieldsState, setExpenseFieldState);
            }}>Delete Entry</button>
        </>
    );
}

function deleteField(expenseFieldsState, setExpenseFieldState){
    let newFieldCount = [...expenseFieldsState];
    newFieldCount.pop();

    setExpenseFieldState(newFieldCount);
}

function AddFieldButton({expenseFieldsState, setExpenseFieldState}){

    return(
        <>
            <button onClick={(e) => {
                e.preventDefault();
                addField(expenseFieldsState, setExpenseFieldState);
            }}>Add Entry</button>
        </>
    );
}

function addField(expenseFieldsState, setExpenseFieldState){
    let newFieldCount = [...expenseFieldsState];
    fieldsStateKey++

    newFieldCount.push(fieldsStateKey);
    setExpenseFieldState(newFieldCount);
}

function ResetFieldsButton({expenseFieldsState, setExpenseFieldsState}){

    return(
        <button className={"ml-4"} onClick={(e) => {
           e.preventDefault();
           resetAllFields(expenseFieldsState, setExpenseFieldsState);
        }}>Reset</button>
    );
}

function resetAllFields(expenseFieldsState, setExpenseFieldsState){
    let x = [fieldsStateKey++];
    setExpenseFieldsState(x);
}

function SubmitButton(){

    return (
        <button onClick={(e) => {
            e.preventDefault();
            handleExpensesSubmission();
        }}>Submit</button>
    );
}

function handleExpensesSubmission(){
    let expenseData = getExpenseDataFromFields();
    //let expenseData = runCalculationsOnExpenseData(expenseData);
}

function getExpenseDataFromFields(){
    let expenseTitle = document.querySelector(".jobtitle");
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

function Expenses(){

    return(
        <>
          <br/>
            {/*<span className="inputHeader mb-1 block"> Type of Expense(s) </span>*/}
            <ExpensesContainer />
        </>
    );
}

export default Expenses;