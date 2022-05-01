import Chart from "react-apexcharts";
import React from "react";

//let cc = console.log;
let chartHeight = 300;

export function DonutChart({sheetData}) {

    return (
        <>
            <Chart
                series={[5, 500, 5]}
                type="donut"
                height={430}
                options = {{
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                }}
            />
        </>
    );
}


export function ExpenseSumChart({expenseSheet}) {

/*
    delete expenseSheet.amount;
    delete expenseSheet.beginYears;
    delete expenseSheet.endYears;
    delete expenseSheet.calculatedAmount;
    delete expenseSheet.endYears;
    delete expenseSheet.frequency;
    delete expenseSheet.label;
    delete expenseSheet.numberOfEntries;
    delete expenseSheet.runningSumsByYear;
    delete expenseSheet.finalSums;
*/

    return (
        <div /*key={linearIncome.key}*/> {/*TODO Does not render key*/}
            <Chart
                series = {expenseSheet.graphSumObject}
                type = "bar"
                height = {chartHeight}
                options = {{
/*                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },*/
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    chart: {
                        stacked: true,
                    },
                    xaxis: {
                        categories: expenseSheet.yearsNumbered
                    }
                }}
            />
        </div>
    );
}


export function ExpenseRunningSumChart({expenseSheet}) {

/*    delete expenseSheet.amount;
    delete expenseSheet.beginYears;
    delete expenseSheet.endYears;
    delete expenseSheet.calculatedAmount;
    delete expenseSheet.endYears;
    delete expenseSheet.frequency;
    delete expenseSheet.label;
    delete expenseSheet.numberOfEntries;
    delete expenseSheet.runningSumsByYear;
    delete expenseSheet.finalSums;*/

    return (
        <div /*key={linearIncome.key}*/> {/*TODO Does not render key*/}
            <Chart
                series = {expenseSheet.graphRunningSumObject}
                type="bar"
                height={chartHeight}
                options = {{
                    /*                    plotOptions: {
                                            bar: {
                                                horizontal: true,
                                            }
                                        },*/
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    chart: {
                        stacked: true,
                    },
                    xaxis: {
                        categories: expenseSheet.yearsNumbered
                    }
                }}
            />
        </div>
    );
}
