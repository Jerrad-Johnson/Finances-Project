import {createArrayWithNumberOfYearsToGraph} from "./jobssharedfunctions";
import {GraphOptions, PrintSum, SelectOptions} from "./EvaluationForms";
import React from "react";
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
                <div key={entry} className={"inputSelectorsCard"}>
                    <span className={"inputSetTitle"}>Expense</span>
                    <span className={"inputTitle"}>Label</span>
                    <input type="text" className={"label inputTextField"} defaultValue={""}></input>
                    <span className={"inputTitle"}>Amount</span>
                    <input type="text" className={"payment inputTextField"} defaultValue={""}></input>
                    <span className={"inputTitle"}>Frequency</span>
                    <select className={"frequency inputSelector"}>
                        <option value={"mo"}>Monthly</option>
                        <option value={"yr"}>Yearly</option>
                    </select>
                    <span className={"inputTitle"}>Begin and End Years</span>
                    <select className={"beginYear inputSelectorShortSidebySide"}>{optionElements}</select>
                    <select className={"endYear inputSelectorShortSidebySide"} >{optionElements}</select>
            </div>
        );
    });

    return (
        <div className={"inputSet"}>
            <div className={"inputSelectorsCard"}>
                <form>
                    <span className={"inputSetTitle"}>Expenses Sheet</span>
                    <span className={"inputTitle"}>Title</span>
                    <input type="text" className={"inputTextFieldLong expenseTitle"} defaultValue={""}></input>
                </form>
                <br />
            </div>
                    {printFormsToDom}
        </div>
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
        <button className={"reset"} onClick={(e) => {
            e.preventDefault();
            resetAllFields(expenseFieldsState, setExpenseFieldsState);
        }}>Reset</button>
    );
}

function resetAllFields(expenseFieldsState, setExpenseFieldsState){
    let x = [fieldsStateKey++];
    setExpenseFieldsState(x);
}

