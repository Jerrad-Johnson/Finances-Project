import {useState} from "react";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";

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
        </>
    );
}


function ExpenseForms({expenseFieldsState}){
    let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

    let optionElements = lengthOfGraphInYears.map(entry => {
       return(
         <option value={entry}>{entry}</option>
       );
    });

    let printFormsToDom = expenseFieldsState.map(entry => {
        return (
            <div key={entry}>
                <input type="text" className={"inputField label text-black mb-2 ml-2 w-40"} defaultValue={""}></input>
                <span className={"ml-2"}> Label</span>
                <input type="text" className={"inputField expenses text-black mb-2 ml-2 w-14"} defaultValue={""}></input>
                <span className={"ml-2"}>Amount</span>
                <select className={"beginYear ml-2 text-black"}>
                    <option value={"month"}>M</option>
                    <option value={"year"}>Y</option>
                </select>
                <span className={"ml-2"}>M/Y?</span>
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