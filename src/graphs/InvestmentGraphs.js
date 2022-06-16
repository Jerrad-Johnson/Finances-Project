import Chart from "react-apexcharts";
import React from "react";

let chartHeight = 350;
let cc = console.log

function makeDataStackedChartCompatible(labels, dataArray){
    let returnSheet = [];

    for (let i = 0; i < labels.length; i++){
        returnSheet[i] = {
            data: dataArray[i],
            name: labels[i],
        }
    }

    return returnSheet;
}

export function InvestmentRunningValueBarChart({investmentSheet}) {
    let dataConverted = makeDataStackedChartCompatible(investmentSheet.labels, investmentSheet.arrayRunningInvestmentValue);

    return (
        <div>
            <br />
            <span className={"sheetTitle"}>{investmentSheet.title}</span>
            <span className={"inputSetTitle graphTitle"}>Running Investment Value</span>
            <Chart
                series = {dataConverted}
                type = "bar"
                height = {chartHeight}
                width = '100%'
                options = {{
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
                    /*colors: [
                        '#00aa00', '#880000', '#880000',
                    ],*/
                    chart: {
                        stacked: true,
                    },
                    xaxis: {
                        categories: investmentSheet.yearsNumbered
                    }
                }}
            />
        </div>
    );
}