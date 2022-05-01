import {useState} from "react";
import {ExpenseRunningSumBarChart, ExpenseSumBarChart, ExpenseSumDonutChart} from "./graphs/ExpenseGraphs";
import {SubmitButton, DeleteSheetButton} from "./components/ExpensesGraphs";
import {DeleteFieldButton, ExpenseForms, AddFieldButton, ResetFieldsButton} from "./components/ExpensesForms";
//let cc = console.log;

function Expenses(){

    const [expenseFieldsState, setExpenseFieldsState] = useState([0]);
    const [expensesState, setExpensesState] = useState([]);

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
            <ExpenseBarGraph
                expensesState = {expensesState}
                setExpensesState = {setExpensesState}
            />
        </>
    );
}


function ExpenseBarGraph({expensesState, setExpensesState}){

    let printToDom = expensesState.map(expenseSheet => {
       return (
           <>
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


           </>
       );
    });

    return (
        <>
            {printToDom}
        </>
    );
}

export default Expenses;