import React, {useState} from "react";
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
    const [expensesState, setExpensesState] = useLocalStorage("expensedata", localStorage.getItem("expensedata") ?? []);

    return (
        <div className={"container"}>
            <div className={"pairs"}>
                <div className={"left"}>
                    <ExpenseForms
                        expenseFieldsState = {expenseFieldsState}
                    />
                    <div className={"inputSet"}>
                        <div className={"inputSelectorsCard"}>
                            <DeleteFieldButton
                                expenseFieldsState = {expenseFieldsState}
                                setExpenseFieldState = {setExpenseFieldsState}
                            />
                            <AddFieldButton
                                expenseFieldsState = {expenseFieldsState}
                                setExpenseFieldState = {setExpenseFieldsState}
                            />
                            <SubmitButton
                                expensesState = {expensesState}
                                setExpensesState = {setExpensesState}
                            />
                            <ResetFieldsButton
                                expenseFieldsState = {expenseFieldsState}
                                setExpenseFieldsState = {setExpenseFieldsState}
                            />
                        </div>
                    </div>
                </div>

                <div className={"right"}>
                    <ExpenseGraphs
                        expensesState = {expensesState}
                        setExpensesState = {setExpensesState}
                    />
                </div>
            </div>
        </div>
    );
}


function ExpenseGraphs({expensesState, setExpensesState}){

    let printToDom = expensesState.map((expenseSheet, index) => {
       return (
           <div key={index} className={"graphCard"}>
               <span className={"inputSetTitle graphTitle"}>Yearly Expenses</span>
               <ExpenseSumBarChart
                   expenseSheet = {expenseSheet}
               />
               <span className={"inputSetTitle graphTitle"}>Running Sum</span>
               <ExpenseRunningSumBarChart
                   expenseSheet = {expenseSheet}
               />
               <span className={"inputSetTitle graphTitle"}>Total Expense % By Category</span>
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