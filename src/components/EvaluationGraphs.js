import CalculateTaxes from "../libs/Taxes";
import Chart from "react-apexcharts";
import React from "react";
import jobdatahandler from "../libs/jobdatahandler";
import {getYearsNumbered} from "./jobssharedfunctions";
import CreateNewDataForEvaluationGraphs from "../libs/CreateNewDataForEvaluationGraphs";

let cc = console.dir
let length = new jobdatahandler().graphMaxNumberOfYears;
var yearsArrayForGraph = getYearsNumbered();

function EvaluationGraphs({incomeOptionState, expenseOptionState, investmentOptionState, graphOptionState, incomeData,
                              expenseData, investmentData, employmentState, filingStatusState, stTaxState}){
    incomeData = findCurrentFinancialSheets(incomeData, incomeOptionState);
    expenseData = findCurrentFinancialSheets(expenseData, expenseOptionState);
    investmentData = findCurrentFinancialSheets(investmentData, investmentOptionState);
    if (incomeData[0]) { incomeData = incomeData[0] }
    if (expenseData[0]) { expenseData = expenseData[0] }
    if (investmentData[0]) { investmentData = investmentData[0] }


    const mapGraphOptionStateToObjectKey = {
        "Yearly In Pocket": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeYearlyInPocket(); },
        "Running Liquid Assets Sums vs. Yearly Expenses": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeRunningIncomeSumsAndYearlyExpenses(); },
    };

    let graphData = mapGraphOptionStateToObjectKey[graphOptionState]();

    return (
        <div className={"right"}>
            <div className={"graphCard"}>
                <Chart
                    series = {graphData}
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

            <div className={"graphCard"}>
                <Chart
                    series = {graphData}
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
        </div>
    );
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

function applyInflation(arr){
    let x = structuredClone(arr)

    for (let i = 0; i < length; i++){
        x[i] = x[i] * .9674;
    }

    return x;
}


export default EvaluationGraphs;