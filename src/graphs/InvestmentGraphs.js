import Chart from "react-apexcharts";
import React from "react";

let chartHeight = 350;
let cc = console.log

export function InvestmentRunningValueBarChart({investmentSheet}) {
    let sheet = {};
    sheet.data = investmentSheet.arrayRunningInvestmentValue;
    sheet.categories = investmentSheet.yearsNumbered;


    return (
        <div>
            <Chart
                series = {[
                    {
                        data: sheet.data[0]
                    }
                ]}
                type="bar"
                height={chartHeight}
                options = {{
                    colors: [
                        '#00aa00', '#880000', '#880000',
                    ],
                    xaxis: {
                        categories: sheet.categories,
                    }
                }}
            />
        </div>
    );
}