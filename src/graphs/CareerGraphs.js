import Chart from "react-apexcharts";
import React from "react";

//let cc = console.log;
let chartHeight = 400;


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
        <>
            Job title: {job.title} <br />
            <span className={"inputSetTitle graphTitle"}>Yearly Income</span>
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
                    xaxis: {
                        categories: job.yearsNumbered,
                    },
                }}
            />
        </>
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
                    xaxis: {
                        categories: job.yearsNumbered,
                    },
                }}
            />
        </div>
    );
}