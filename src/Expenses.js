import {useState} from "react";

let cc = console.log;
function ExpensesContainer(){
    let fieldsStateKey = 0;
    const [expenseFieldsState, setExpenseFieldsState] = useState([fieldsStateKey]);

    return (
        <>
            <ExpenseForms
                expenseFieldsState = {expenseFieldsState}
                setExpenseFieldState = {setExpenseFieldsState}
                fieldsStateKey = {fieldsStateKey}
            />
        </>
    );
}


function ExpenseForms({expenseFieldsState, setExpenseFieldState, fieldsStateKey}){
    cc(expenseFieldsState)
    let expenseForms = expenseFieldsState.map(entry => {
        return (
            <>
                <input type="text" className={"inputField text-black"} key={fieldsStateKey} defaultValue={""}></input>
            </>
       );
    });

    return (
        <>
            <form>
                {expenseForms}
            </form>
        </>
    );
}



function Expenses(){

    return(
        <>
          <br/>
            <span className="inputHeader"> Type of Expense(s) </span>
            <ExpensesContainer />
        </>
    );
}

export default Expenses;