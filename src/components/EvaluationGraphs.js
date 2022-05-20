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

    incomeData = findCurrentFinancialSheets(incomeData, incomeOptionState);
    expenseData = findCurrentFinancialSheets(expenseData, expenseOptionState);
    investmentData = findCurrentFinancialSheets(investmentData, investmentOptionState);
    if (incomeData[0]) { incomeData = incomeData[0] }
    if (expenseData[0]) { expenseData = expenseData[0] }
    if (investmentData[0]) { investmentData = investmentData[0] }
    let incomeTaxData = getIncomeTaxData(incomeData, employmentState, filingStatusState, stTaxState);
    let newDataForGraphs = new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData, incomeTaxData);

    const mapGraphOptionStateToObjectKey = {
        "Yearly In Pocket": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData, incomeTaxData).makeYearlyInPocket(); },
    };

    let x = mapGraphOptionStateToObjectKey[graphOptionState]();

    //let singleGraphData = newDataForGraphs[mapGraphOptionStateToObjectKey[graphOptionState]];

    return (
        <div>
            <Chart
                series = {x}
                type = "bar"
                height = "300"
                options = {{
                /*colors: ["#fff000"],*/
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