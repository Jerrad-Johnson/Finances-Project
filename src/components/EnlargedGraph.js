import Chart from "react-apexcharts";
import React from "react";

function EnlargedGraph({enlargeGraphState, setEnlargeGraphState, graphData, yearsArrayForGraph}){
    if (enlargeGraphState == 1){
        let originalGraphs = document.querySelectorAll(".graphCard");
        originalGraphs.forEach((e) => {
            e.style.display = "none";
        });

        return (
            <div className={"enlargedGraph"}>

                <button onClick={((e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveGraph(setEnlargeGraphState, originalGraphs);
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

function handleRemoveGraph(setEnlargeGraphState, originalGraphs){
    setEnlargeGraphState(0);
    originalGraphs.forEach((e) => {
        e.style.display = "block";
    });
}

export default EnlargedGraph;