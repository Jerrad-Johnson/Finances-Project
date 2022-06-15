import Chart from "react-apexcharts";
import React from "react";

//let cc = console.log;
let chartHeight = 300;

export function ExpenseSumBarChart({expenseSheet}) {

    return (
        <>
            <span className={"sheetTitle"}>{expenseSheet.title}</span>
            <span className={"inputSetTitle graphTitle"}>Yearly Expenses</span>
            <Chart
                series = {expenseSheet.graphSumObject}
                type = "bar"
                height = {chartHeight}
                options = {{
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
/*                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],*/
                    chart: {
                        stacked: true,
                    },
                    xaxis: {
                        categories: expenseSheet.yearsNumbered
                    }
                }}
            />
        </>
    );
}

export function ExpenseSumDonutChart({expenseSheet}) {

    return (
        <>
            <span className={"inputSetTitle graphTitle"}>Total Expense % By Category</span>
            <Chart
                series={expenseSheet.graphSumEachExpenseObjectForDonut[0].data}
                type="donut"
                height={430}
                options = {{
/*                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],*/
                    labels: expenseSheet.graphSumEachExpenseObjectForDonut[0].name,
                }}
            />
        </>
    );
}

export function ExpenseRunningSumBarChart({expenseSheet}) {

    return (
        <>
            <span className={"inputSetTitle graphTitle"}>Running Sum</span>
            <Chart
                series = {expenseSheet.graphRunningSumObject}
                type="bar"
                height={chartHeight}
                options = {{
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
/*                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],*/
                    chart: {
                        stacked: true,
                    },
                    xaxis: {
                        categories: expenseSheet.yearsNumbered
                    }
                }}
            />
        </>
    );
}
