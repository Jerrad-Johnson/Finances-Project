import Chart from "react-apexcharts";
import React from "react";

let chartHeight = 350;

export function InvestmentRunningValueBarChart({investmentSheet}) {

    return (
        <div>
            <Chart
                series = {[
                    {
                        data: [5, 5, 5, 2, 5]
                    }
                ]}
                type="bar"
                height={chartHeight}
                options = {{
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    xaxis: {
                        categories: ["l", 5, 5, 2, 2]
                        ,

                    }
                }}
            />
        </div>
    );
}