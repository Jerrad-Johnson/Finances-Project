import CalculateTaxes from "../libs/Taxes";
import Chart from "react-apexcharts";
import React from "react";
import jobdatahandler from "../libs/jobdatahandler";
import {getYearsNumbered, isEmptyArray, isObject} from "./jobssharedfunctions";
import CreateNewDataForEvaluationGraphs from "../libs/CreateNewDataForEvaluationGraphs";
import {createArrayOfZeros} from "./jobssharedfunctions";
import {useState} from "react";
import EnlargedGraph from "./EnlargedGraph";

let cc = console.dir
let length = new jobdatahandler().graphMaxNumberOfYears;
let yearsArrayForGraphOne = ["No data"];
let yearsArrayForGraphTwo = ["No data"];

function changeSheetLength(graphData, graphRangeState, yearsArrayForGraph) {
    let newGraphData = []
    let newYearsArray = []

    let beginningRange = graphRangeState;
    beginningRange = Array.from(beginningRange);
    let indexOfDash = beginningRange.indexOf("-");
    let arrayLength = beginningRange.length
    beginningRange.splice(indexOfDash, (arrayLength -1));
    beginningRange = beginningRange.toString();
    beginningRange = beginningRange.replace(',', '');
    beginningRange = +beginningRange;

    for (let i = 0; i < graphData.length; i++){
        let k = 0;
        newGraphData[i] = {}
        newGraphData[i].data = createArrayOfZeros(5);
        newGraphData[i].name = graphData[i].name;
        newGraphData.description = graphData.description

        for (let j = beginningRange; j < (beginningRange + 5); j++){
            newGraphData[i].data[k] = graphData[i].data[j];
            newYearsArray[k] = yearsArrayForGraph[j];
            k++;
        }
    }

    return [newGraphData, newYearsArray]
}

function EvaluationGraphs({incomeOptionState, expenseOptionState, investmentOptionState, graphOptionState, secondGraphOptionState, incomeData,
                              expenseData, investmentData, employmentState, filingStatusState, stTaxState, graphRangeState}){
    incomeData = findCurrentFinancialSheets(incomeData, incomeOptionState);
    expenseData = findCurrentFinancialSheets(expenseData, expenseOptionState);
    investmentData = findCurrentFinancialSheets(investmentData, investmentOptionState);
    let [enlargeGraphState, setEnlargeGraphState] = useState(0);

    if (incomeData[0]) { incomeData = incomeData[0] }
    if (expenseData[0]) { expenseData = expenseData[0] }
    if (investmentData[0]) { investmentData = investmentData[0] }

    const mapGraphOptionStateToObjectKey = {
        "Assets vs. Inflation": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeAssetsVsInflation(); },
        "Combined Investment Expenses": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeCombinedInvestmentExpenses(); },
        "Expenses by Group": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeExpenses(); },
        "Income by Group": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeIncomeByGroup(); },
        "Investment Income": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeInvestmentIncome(); },
        "Running Liquid Assets Sums vs. Yearly Expenses": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeRunningIncomeSumsAndYearlyExpenses(); },
        "Same Year Expendable": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeSameYearExpendable(); },
        "Taxes by Category": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeTaxesByCategory(); },
        "Tax Percentage by Year": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeTaxPercentageByYear(); },
        "Total Assets": () => { return new CreateNewDataForEvaluationGraphs(incomeData, expenseData, investmentData,
            employmentState, filingStatusState, stTaxState).makeTotalAssetsLiquidAndIlliquid(); },
    };

    let graphData = mapGraphOptionStateToObjectKey[graphOptionState]();
    let secondGraphData = mapGraphOptionStateToObjectKey[secondGraphOptionState]();
    let firstGraphDataForEnlargedView = graphData;
    let secondGraphDataForEnlargedView = secondGraphData;

    Array.isArray(graphData?.[0]?.data) ? yearsArrayForGraphOne = getYearsNumbered() : yearsArrayForGraphOne = ["No Data"];
    Array.isArray(secondGraphData?.[0]?.data) ? yearsArrayForGraphTwo = getYearsNumbered() : yearsArrayForGraphTwo = ["No Data"];
    let [enlargedGraphDataState, setEnlargedGraphDataState] = useState( []);
    let [enlargedYearsArrayState, setEnlargedYearsArrayState] = useState([]);

    let enlargedYearsArrayForGraphOne = yearsArrayForGraphOne;
    let enlargedYearsArrayForGraphTwo = yearsArrayForGraphTwo;
    let yearsArrayForEnlargedGraph = yearsArrayForGraphOne || []

    if (graphRangeState !== "All") {
        [graphData, yearsArrayForGraphOne] = changeSheetLength(graphData, graphRangeState, yearsArrayForGraphOne);
        [secondGraphData, yearsArrayForGraphTwo] = changeSheetLength(secondGraphData, graphRangeState, yearsArrayForGraphTwo);
    }

    return (
        <>
            <EnlargedGraph
                enlargeGraphState = {enlargeGraphState}
                setEnlargeGraphState = {setEnlargeGraphState}
                graphData = {enlargedGraphDataState}
                yearsArrayForGraph = {enlargedYearsArrayState}
            />
            <div className={"graphCard"}>
                <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEnlargedGraphDataState(firstGraphDataForEnlargedView);
                    setEnlargedYearsArrayState(enlargedYearsArrayForGraphOne);
                    setEnlargeGraphState(1);
                }}>Enlarge</button>
                <Chart
                    series = {graphData}
                    type = "bar"
                    height = "400"

                    options = {{
/*                        plotOptions: {
                            bar: {
                                horizontal: true,
                            }
                        },*/
                     /*colors: ["#ff0000", "#00FF00", "#0000FF"],*/
                        chart: {
                            stacked: false,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: yearsArrayForGraphOne,
                        }
                    }}
                />
                <span className={"evalDescription"}>{graphData.description}</span>
            </div>

            <div className={"graphCard"}>
                <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEnlargedGraphDataState(secondGraphDataForEnlargedView)
                    setEnlargedYearsArrayState(enlargedYearsArrayForGraphTwo);
                    setEnlargeGraphState(1);
                }}>Enlarge</button>
                <Chart
                    series = {secondGraphData}
                    type = "bar"
                    height = "400"
                    options = {{
/*                        plotOptions: {
                            bar: {
                                horizontal: true,
                            }
                        },*/
                        /*colors: ["#fff000"],*/
                        chart: {
                            stacked: false,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: yearsArrayForGraphTwo,
                        }
                    }}
                />
                <span className={"evalDescription"}>{secondGraphData.description}</span>
            </div>
        </>
    );
}

function findCurrentFinancialSheets(sheets, current){
    return sheets.filter((sheet) => {
        return sheet.title === current;
    });
}

export default EvaluationGraphs;