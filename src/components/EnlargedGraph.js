import Chart from "react-apexcharts";
import React from "react";

function EnlargedGraph({enlargeGraphState, setEnlargeGraphState, graphData, yearsArrayForGraph}){
    if (enlargeGraphState == 1){
        return (
            <div>
                <button onClick={((e) => {
                    handleRemoveGraph(setEnlargeGraphState);
                })}>Close</button>
                <Chart
                    series = {graphData}
                    type = "bar"
                    height = "400"

                    options = {{
                        chart: {
                            stacked: false,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: yearsArrayForGraph,
                        }
                    }}
                />
            </div>
        );
    }
}

function handleRemoveGraph(setEnlargeGraphState){
    setEnlargeGraphState(0);
}

export default EnlargedGraph;