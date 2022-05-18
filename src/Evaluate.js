import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import jobdatahandler from "./libs/jobdatahandler";
import CalculateTaxes from "./libs/Taxes";
let cc = console.log
var length = new jobdatahandler;
length = length.graphMaxNumberOfYears;

const TaxCalculator = new CalculateTaxes();
TaxCalculator.federalCalculations();

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
            <option>Yearly In Pocket</option>
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

    let foundLength = findNumberOfSheetTypesInvolved(incomeOptionState, expenseOptionState, investmentOptionState);
    //let chartDataArray = Array(foundLength); Useless ?

    incomeData = findCurrentFinancialSheets(incomeData, incomeOptionState);
    expenseData = findCurrentFinancialSheets(expenseData, expenseOptionState);
    investmentData = findCurrentFinancialSheets(investmentData, investmentOptionState);

    if (incomeData[0]) { incomeData = incomeData[0] }
    if (expenseData[0]) { expenseData = expenseData[0] }
    if (investmentData[0]) { investmentData = investmentData[0] }

    let graphData = combineData(incomeData, expenseData, investmentData, graphOptionState)

    //TODO Get yearsNumbered directly.

    return (
        <div>
            <Chart
                series = {graphData}
                type = "bar"
                height = "300"
                options = {{

                    colors: graphData.colors,
                    chart: {
                        stacked: false,
                    },
                    xaxis: {
                        categories: investmentData.yearsNumbered
                    }
                }}
            />
        </div>
    );
}

function combineData(incomeData, expenseData, investmentData, graphOptionState, foundLength){
    let x = [];
    let y = {};
    y.colors = [];
    let color = [];

    switch (graphOptionState){
        case "Yearly In Pocket":
            if (isObject(incomeData)){
                y.data = incomeData.incomeInGraphYearsNumberOfSteps ?? incomeData.salaryAmounts;
                y.name = "Income"
                y.colors = "#00ff00";
                x.push(y);
                y = {};
                color = [];
            }

            if (isObject(investmentData)){
                y.data = combineSinglePropertyArrays(investmentData.arrayPullValueByYear); // TODO Add withdraw
                y.name = "Investment"
                y.colors = "#00ff00";
                x.push(y);
                y = {};
                color = [];
            }

            if (isObject(expenseData)){
                y.data = combineMultiplePropertyArrays(expenseData.graphSumObject); // TODO Add investment expense
                y.name = "Expense"
                y.colors = "#ff0000";
                x.push(y);
                y = {};
                color = [];
            }
            break;
    }
    return x;
}


function isObject(x){
    if(typeof x === 'object' && !Array.isArray(x) && x !== null){
        return true;
    } else {
        return false;
    }
}

function findCurrentFinancialSheets(sheets, current){
    let toBeReturned = sheets.filter((sheet) => {
        return sheet.title == current;
    });

    return toBeReturned;
}

function checkExistence(financialData){
    let toBeReturned;

    financialData[0]?.title ? toBeReturned = financialData[0].title : toBeReturned = "No Data";

    return toBeReturned;
}

function findNumberOfSheetTypesInvolved(incomeOptionState, expenseOptionState, investmentOptionState){
    let x = [incomeOptionState, expenseOptionState, investmentOptionState];

    x = x.filter((e) => {
        return (e !== "No Data");
    });

    return x = x.length;
}

function combineSinglePropertyArrays(financialDataProperty){
    let x = [];

    for (let j = 0; j < length; j++){
        x[j] = 0;
    }

    for (let i = 0; i < financialDataProperty.length; i++) {
        for (let j = 0; j < length; j++) {
            x[j] = x[j] + financialDataProperty[i][j];
        }
    }

    return x;
}

function combineMultiplePropertyArrays(financialDataProperties){
    let x = [];

    for (let j = 0; j < length; j++){
        x[j] = 0;
    }

    for (let i = 0; i < financialDataProperties.length; i++) {

        for (let j = 0; j < length; j++) {
            x[j] = x[j] + financialDataProperties[i].data[j];
        }
    }

    return x;
}

function Evaluate(){

    let linearJob = JSON.parse(localStorage.getItem("linearjob"));
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob"));
    let investmentData = sortFinancialData(JSON.parse(localStorage.getItem("investmentdata"))) ?? [];
    let expenseData = sortFinancialData(JSON.parse(localStorage.getItem("expensedata"))) ?? [];
    let incomeData = sortFinancialData([...linearJob, ...steppedJob]) ?? [];
    let [incomeOptionState, setIncomeOptionState] = useState(checkExistence(incomeData));
    let [expenseOptionState, setExpenseOptionState] = useState(checkExistence(expenseData));
    let [investmentOptionState, setInvestmentOptionState] = useState(checkExistence(investmentData));
    let [graphOptionState, setGraphOptionState] = useState("Yearly In Pocket");

    return (
        <div className={"container"}>
            <button onClick={(e) => {
                e.preventDefault();
                cc(investmentData);
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
                    setInvestmentOptionState(event.target.value);
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
                investmentOptionState = {investmentOptionState}
                graphOptionState = {graphOptionState}
                incomeData = {incomeData}
                expenseData = {expenseData}
                investmentData = {investmentData}
            />
        </div>
    );
}

export default Evaluate;