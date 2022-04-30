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


export function TestChart({job}) {

    let testArr = [[1, 2, 3, 4, 5, 6, 6, 7, 8, 8], [1, 2, 3, 4, 5, 6, 6, 7, 8, 8], [1, 2, 3, 4, 5, 6, 6, 7, 8, 8]]
    let testArr2 = [2, 5, 5, 5, 2]
    let testArr3 = [{
            name: "idk",
            data: [200, 100, 500],
        }, {
            name: "idk2",
            data: [100, 200, 300],
        }];

    console.log(testArr3);

    return (
        <div /*key={linearIncome.key}*/> {/*TODO Does not render key*/}
            <Chart
                series = {testArr3}
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
                    /*xaxis: {
                        //categories: job.yearsNumbered
                    }*/
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
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    xaxis: {
                        categories: job.yearsNumbered
                        ,

                    }
                }}
            />
        </div>
    );
}


