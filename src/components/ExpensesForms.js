import {createArrayWithNumberOfYearsToGraph} from "./jobssharedfunctions";
var fieldsStateKey = 0;

export function ExpenseForms({expenseFieldsState}){
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
                <input type="text" className={"inputField expenseTitle text-black mb-5 ml-2"} defaultValue={""}></input>
                <span className={"ml-2"}>Title</span>
                {printFormsToDom}
            </form>
        </>
    );
}

export function DeleteFieldButton({expenseFieldsState, setExpenseFieldState}){

    return(
        <>
            <button className={"delete-entry-field"} onClick={(e) => {

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

export function AddFieldButton({expenseFieldsState, setExpenseFieldState}){

    return(
        <>
            <button className={"add-entry-field"} onClick={(e) => {
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

export function ResetFieldsButton({expenseFieldsState, setExpenseFieldsState}){
    //TODO This should also set the values of existing fields to zero.

    return(
        <button className={"reset ml-4"} onClick={(e) => {
            e.preventDefault();
            resetAllFields(expenseFieldsState, setExpenseFieldsState);
        }}>Reset</button>
    );
}

function resetAllFields(expenseFieldsState, setExpenseFieldsState){
    let x = [fieldsStateKey++];
    setExpenseFieldsState(x);
}
