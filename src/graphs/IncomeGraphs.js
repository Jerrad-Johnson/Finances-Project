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


export function BarChart({jobsData}) {

    cc(jobsData)
    cc(jobsData.key)


    return (
        <div key={jobsData.key}> {/*TODO Does not render key*/}
            <Chart
                series = {[
                {
                    data: [43, 53, 50, 57]
                }
                ]}
                type="bar"
                height={430}
                options = {{
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    xaxis: {
                        categories: [jobsData.immediateIncome]
                        ,

                    }
                }}
            />
        </div>
    );
}