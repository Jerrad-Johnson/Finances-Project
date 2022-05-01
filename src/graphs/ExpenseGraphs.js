import Chart from "react-apexcharts";
import React from "react";

//let cc = console.log;
let chartHeight = 300;

export function ExpenseSumDonutChart({expenseSheet}) {

    console.log(expenseSheet.label)

    return (
        <>
            <Chart
                series={expenseSheet.graphSumEachExpenseObjectForDonut[0].data}
                type="donut"
                height={430}
                options = {{

                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    labels: expenseSheet.graphSumEachExpenseObjectForDonut[0].name,
                }}
            />
        </>
    );
}


export function ExpenseSumBarChart({expenseSheet}) {
/*  delete expenseSheet.amount;
    delete expenseSheet.beginYears;
    delete expenseSheet.endYears;
    delete expenseSheet.calculatedAmount;
    delete expenseSheet.endYears;
    delete expenseSheet.frequency;
    delete expenseSheet.label;
    delete expenseSheet.numberOfEntries;
    delete expenseSheet.runningSumsByYear;
    delete expenseSheet.finalSums; */


    return (
        <div>
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


export function ExpenseRunningSumBarChart({expenseSheet}) {

/*  delete expenseSheet.amount;
    delete expenseSheet.beginYears;
    delete expenseSheet.endYears;
    delete expenseSheet.calculatedAmount;
    delete expenseSheet.endYears;
    delete expenseSheet.frequency;
    delete expenseSheet.label;
    delete expenseSheet.numberOfEntries;
    delete expenseSheet.runningSumsByYear;
    delete expenseSheet.finalSums; */

    return (
        <div>
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
