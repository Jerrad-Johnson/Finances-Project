import {useState} from "react";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";

var fieldsStateKey = 0;
let cc = console.log;
let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

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
        </>
    );
}


function ExpenseForms({expenseFieldsState}){
    let printFormsToDom = expenseFieldsState.map(entry => {
        return (
            <div key={entry}>
                <input type="text" className={"inputField text-black"} defaultValue={""}></input>
            </div>
       );
    });

    return (
        <>
            <form>
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
    cc(fieldsStateKey)

    newFieldCount.push(fieldsStateKey);
    setExpenseFieldState(newFieldCount);
}

function Expenses(){

    return(
        <>
          <br/>
            <span className="inputHeader mb-1 block"> Type of Expense(s) </span>
            <ExpensesContainer />
        </>
    );
}

export default Expenses;