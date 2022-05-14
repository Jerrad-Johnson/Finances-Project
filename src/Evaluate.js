import {useEffect, useState} from "react";
let cc = console.log

function sortFinancialData(financialData){
    financialData.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        return (x > y ? 1 : -1);
    });

    return financialData;
}

function SelectOptions({financialData}){
    if (!financialData[0]) {
        return (
            <>
                <option>No Data</option>
            </>
        );
    }

    let printToDom = financialData.map((entry, index) => {
        return(
           <option key={index}>{entry.title}</option>
        );
    });

    return(
        <>
            {printToDom}
        </>
    );
}

function GraphOptions(){
    return (
        <>
            <option>Yearly Sum</option>
            <option>Running Sum</option>
        </>
    );
}


function PrintSum({title, financialData, typeOfFinancialData, valueKeyToFind = "sum"}){
    if (!financialData[0]) { return; }

    let getCurrentEntry = financialData.filter((e) => {
       return e.title == title;
    });

    let sum = getCurrentEntry[0][valueKeyToFind];

    return(
      <span className={"sum" + typeOfFinancialData}>
          {sum}
      </span>
    );
}


function EvaluationGraphs({incomeOptionState, expenseOptionState, investmentOptionState, graphOptionState,
                              incomeData, expenseData, investmentData}){



}

function checkExistence(financialData){
    let toBeReturned;

    if (financialData[0] !== undefined){
        if(financialData[0].title !== undefined){
            toBeReturned = financialData[0].title;
        }
    } else {
        toBeReturned = [];
    }

    return toBeReturned;
}

function Evaluate(){
    let linearJob = JSON.parse(localStorage.getItem("linearjob"));
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob"));
    let investmentData = sortFinancialData(JSON.parse(localStorage.getItem("investmentdata"))) ?? [];
    let expenseData = sortFinancialData(JSON.parse(localStorage.getItem("expensedata")));
    let incomeData = sortFinancialData([...linearJob, ...steppedJob]);

    let [incomeOptionState, setIncomeOptionState] = useState(checkExistence(incomeData));
    let [expenseOptionState, setExpenseOptionState] = useState(checkExistence(expenseData));
    let [investmentOptionState, setInvestmentOptionState] = useState(checkExistence(investmentData));
    let [graphOptionState, setGraphOptionState] = useState("Yearly Sum");

    return (
        <div className={"container"}>
            <button onClick={(e) => {
                e.preventDefault();
                cc(graphOptionState);
            }}>Log</button>
            <br />

            <form>
                <select className={"text-black"} onChange={(event) => {
                    setIncomeOptionState(event.target.value);
                }}>
                    <SelectOptions
                        financialData = {incomeData}
                    />
                </select> &nbsp;
                Income &nbsp;

                <select className={"text-black"} onChange={(event) => {
                    setExpenseOptionState(event.target.value);
                }}>
                    <SelectOptions
                        financialData = {expenseData}
                    />
                </select>&nbsp;
                Expenses&nbsp;

                <select className={"text-black"} onChange={(event) => {
                    /*setInvestmentOptionState(event.target.value);*/
                }}>
                    <SelectOptions
                        financialData = {investmentData}
                    />
                </select>&nbsp;
                Investments&nbsp;

                <br />
                <br />
                <select className={"text-black"} onChange={(event) => {
                    setGraphOptionState(event.target.value);
                }}>
                    <GraphOptions />
                </select>&nbsp;
                Graph Type&nbsp;

            </form>
            <br />
            <br />
            <PrintSum
                title = {incomeOptionState}
                financialData = {incomeData}
                typeOfFinancialData = {"income"}
            /> Income
            <br />
            <PrintSum
                title = {expenseOptionState}
                financialData = {expenseData}
                typeOfFinancialData = {"expense"}
            /> Expenses
            <br />
            <span>Income $, Expenses $, Investment Value $</span>
            <br />
            <span>Difference $</span>
            <br />
            <br />
            <EvaluationGraphs
                incomeOptionState = {incomeOptionState}
                expenseOptionState = {expenseOptionState}
                /*investmentOptionState = {investmentOptionState}*/
                graphOptionState = {graphOptionState}
                incomeData = {incomeData}
                expenseData = {expenseData}
                investmentData = {investmentData}
            />
        </div>
    );
}

export default Evaluate;