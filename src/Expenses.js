import {useState} from "react";
import {ExpenseRunningSumBarChart, ExpenseSumBarChart, ExpenseSumDonutChart} from "./graphs/ExpenseGraphs";
import {SubmitButton, DeleteSheetButton} from "./components/ExpensesGraphs";
import {DeleteFieldButton, ExpenseForms, AddFieldButton, ResetFieldsButton} from "./components/ExpensesForms";
import {useLocalStorage} from "./hooks/useLocalStorage";

let expenseSheetKey = 0;

function incrementExpenseSheetKey(){
    expenseSheetKey++;
}

function Expenses(){

    const [expenseFieldsState, setExpenseFieldsState] = useState([0]);
    const [expensesState, setExpensesState] = useLocalStorage("expensedata", localStorage.getItem("expensedata") || []);

    return (
        <>
            <br />
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
            />
            <br />
            <SubmitButton
                expensesState = {expensesState}
                setExpensesState = {setExpensesState}
            />
            <ResetFieldsButton
                expenseFieldsState = {expenseFieldsState}
                setExpenseFieldsState = {setExpenseFieldsState}
            />
            <ExpenseGraphs
                expensesState = {expensesState}
                setExpensesState = {setExpensesState}
            />
        </>
    );
}


function ExpenseGraphs({expensesState, setExpensesState}){

    let printToDom = expensesState.map((expenseSheet, index) => {
       return (
           <div key={index}>
               <ExpenseSumBarChart
                   expenseSheet = {expenseSheet}
               />
               <ExpenseRunningSumBarChart
                   expenseSheet = {expenseSheet}
               />
               <ExpenseSumDonutChart
                   expenseSheet = {expenseSheet}
               /><br />
               <DeleteSheetButton
                   expenseSheet = {expenseSheet}
                   expensesState = {expensesState}
                   setExpensesState = {setExpensesState}
               />
           </div>

       );
    });

    return (
        <>
            {printToDom}
        </>
    );
}

export default Expenses;