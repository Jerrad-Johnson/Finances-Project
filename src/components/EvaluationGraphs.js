import CalculateTaxes from "../libs/Taxes";
import Chart from "react-apexcharts";
import React from "react";
import jobdatahandler from "../libs/jobdatahandler";
import {getYearsNumbered, isEmptyArray, isObject} from "./jobssharedfunctions";
import CreateNewDataForEvaluationGraphs from "../libs/CreateNewDataForEvaluationGraphs";

let cc = console.dir
let length = new jobdatahandler().graphMaxNumberOfYears;
let yearsArrayForGraph = ["No data"];


function EvaluationGraphs({incomeOptionState, expenseOptionState, investmentOptionState, graphOptionState, secondGraphOptionState, incomeData,
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
        "Total Assets": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeTotalAssetsLiquidAndIlliquid(); },
        "Same Year Expendable": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeSameYearExpendable(); },
        "Expenses by Group": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeExpenses(); },
        "Taxes by Category": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeTaxesByCategory(); },
    };

    let graphData = mapGraphOptionStateToObjectKey[graphOptionState]();
    let secondGraphData = mapGraphOptionStateToObjectKey[secondGraphOptionState]();


    if (isObject(graphData?.[0])){
        yearsArrayForGraph = getYearsNumbered();
    }



    return (
        <>
            <div className={"graphCard"}>
                <Chart
                    series = {graphData}
                    type = "bar"
                    height = "300"

                    options = {{
                     /*colors: ["#ff0000", "#00FF00", "#0000FF"],*/
                        chart: {
                            stacked: false,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: yearsArrayForGraph,
                        }
                    }}
                />
            </div>

            <div className={"graphCard"}>
                <Chart
                    series = {secondGraphData}
                    type = "bar"
                    height = "300"
                    options = {{
                        /*colors: ["#fff000"],*/
                        chart: {
                            stacked: false,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: yearsArrayForGraph,
                        }
                    }}
                />
            </div>
        </>
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