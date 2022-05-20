import CalculateTaxes from "../libs/Taxes";
import Chart from "react-apexcharts";
import React from "react";
import jobdatahandler from "../libs/jobdatahandler";
import {getYearsNumbered} from "./jobssharedfunctions";
import CreateNewDataForEvaluationGraphs from "../libs/CreateNewDataForEvaluationGraphs";

let cc = console.dir
var jobHandler = new jobdatahandler;
let length = jobHandler.graphMaxNumberOfYears;
var yearsArrayForGraph = getYearsNumbered();

function EvaluationGraphs({incomeOptionState, expenseOptionState, investmentOptionState, graphOptionState,
                              incomeData, expenseData, investmentData, employmentState, filingStatusState,
                              stTaxState}){

    let foundLength = findNumberOfSheetTypesInvolved(incomeOptionState, expenseOptionState, investmentOptionState);

    incomeData = findCurrentFinancialSheets(incomeData, incomeOptionState);
    expenseData = findCurrentFinancialSheets(expenseData, expenseOptionState);
    investmentData = findCurrentFinancialSheets(investmentData, investmentOptionState);

    if (incomeData[0]) { incomeData = incomeData[0] }
    if (expenseData[0]) { expenseData = expenseData[0] }
    if (investmentData[0]) { investmentData = investmentData[0] }

    let incomeTaxData = getIncomeTaxData(incomeData, employmentState, filingStatusState, stTaxState);

    let newDataForGraphs = new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData, incomeTaxData);
    newDataForGraphs = newDataForGraphs.begin();


    let graphData = combineData(incomeData, expenseData, investmentData, graphOptionState);         //TODO Repurpose this after I have more graph data

    //cc(investmentData)
//    let temp = applyInflation(incomeData.incomeInGraphYearsNumberOfSteps);



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
                        categories: yearsArrayForGraph,
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
    return typeof x === 'object' && !Array.isArray(x) && x !== null;
}

function findCurrentFinancialSheets(sheets, current){
    return sheets.filter((sheet) => {
        return sheet.title === current;
    });
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

function applyInflation(arr){
    let x = structuredClone(arr)

    for (let i = 0; i < length; i++){
        x[i] = x[i] * .9674;
    }

    return x;
}

function getIncomeAfterExpenses(incomeData, expenseData, investmentData){

}

function getIncomeTaxData(incomeData, employmentState, filingStatusState, stTaxState){
    let incomeTaxData = [];

    if (typeof incomeData === 'object' && !Array.isArray(incomeData) && incomeData !== null){
        incomeTaxData = new CalculateTaxes(incomeData.salaryAmounts || incomeData.incomeInGraphYearsNumberOfSteps, employmentState,
            filingStatusState, stTaxState, "22");
        incomeTaxData = incomeTaxData.federalCalculations();
    }
    // TODO In the future, add an input so users can change years.

    return incomeTaxData

}


export default EvaluationGraphs;