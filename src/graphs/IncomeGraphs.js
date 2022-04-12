import JobDataHandler from "../libs/jobdatahandler";
import Chart from "react-apexcharts";
import React from "react";

export function DonutChart({jobsData}) {
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

