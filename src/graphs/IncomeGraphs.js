import JobDataHandler from "../libs/jobdatahandler";
import Chart from "react-apexcharts";
import React from "react";

let cc = console.log;

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


export function BarChart({linearIncome}) {
    cc(linearIncome)
//cc(linearIncome.incomeInGraphYearsNumberOfSteps)

    return (
        <div /*key={linearIncome.key}*/> {/*TODO Does not render key*/}
            <Chart
                series = {[
                {
                    data: linearIncome.incomeInGraphYearsNumberOfSteps
                }
                ]}
                type="bar"
                height={430}
                options = {{
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    xaxis: {
                        categories: linearIncome.yearsNumbered
                        ,

                    }
                }}
            />
        </div>
    );
}