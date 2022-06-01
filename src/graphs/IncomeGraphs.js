import Chart from "react-apexcharts";
import React from "react";

//let cc = console.log;
let chartHeight = 300;

export function DonutChart({jobsData}) {

    //cc(jobsData)

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


export function LinearBarChart({job}) {

    return (
        <div /*key={linearIncome.key}*/> {/*TODO Does not render key*/}
            <Chart
                series = {[
                {
                    data: job.incomeInGraphYearsNumberOfSteps
                }
                ]}
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
                    xaxis: {
                        categories: job.yearsNumbered,
                    },
                }}
            />
        </div>
    );
}

export function LinearSumBarChart({job}) {

    return (
        <div /*key={linearIncome.key}*/> {/*TODO Does not render key*/}
            <Chart
                series = {[
                    {
                        data: job.sumIncomeByYear
                    }
                ]}
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
                    xaxis: {
                        categories: job.yearsNumbered,
                    },
                }}
            />
        </div>
    );
}


export function SteppedBarChart({job}) {

    return (
        <div /*key={linearIncome.key}/*/> {/*TODO Does not render key*/}
            <Chart
                series = {[
                    {
                        data: job.salaryAmounts
                    }
                ]}
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
                    xaxis: {
                        categories: job.yearsNumbered,
                    },
                }}
            />
        </div>
    );
}

export function SteppedSumBarChart({job}) {

    return (
        <div /*key={linearIncome.key}/*/> {/*TODO Does not render key*/}
            <Chart
                series = {[
                    {
                        data: job.salarySumByYear
                    }
                ]}
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
                    xaxis: {
                        categories: job.yearsNumbered,
                    },
                }}
            />
        </div>
    );
}

