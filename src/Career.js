import JobDataHandler from "./libs/jobdatahandler";
import React from "react";
import Chart from 'react-apexcharts';
//import ReactApexChart from 'react-apexcharts';
import {DonutChart} from "./graphs/IncomeGraphs";
import {BarChart} from "./graphs/IncomeGraphs";

let jobsData =
    [{
        yearsOfExperienceAtEachStep:
            [0, 4, 5, 8],
        incomeAtBeginningOfEachStep:
            [60000, 120000, 150000, 300000],
        key: 0,
    },{
        immediateIncome: 35000,
        incomeCeiling: 70000,
        yearIncomeBegins: 2,
        yearToIncomeCeiling: 10,
        key: 1,
    },{
        immediateIncome: 15000,
        incomeCeiling: 20000,
        yearIncomeBegins: 5,
        yearToIncomeCeiling: 10,
        key: 2,
    }];

var cc = console.log;


function DynamicChartTest() {
    const linearIncome = new JobDataHandler(jobsData).findLinear();

    const linearIncomeBarGraph = linearIncome.map((job) =>
        ( <BarChart linearIncome={job} key={job.key}/> )
    );


    return (
        <>
            {linearIncomeBarGraph}
        </>
    );
}

/*

function JobContainer({jobsData}) {
    const linearIncome = new JobDataHandler(jobsData).findLinear();
    //const steppedIncome = new JobDataHandler(jobsData).findStepped();

    return (
      <>
          {/!*<DonutChart
              jobsData = {jobsData[1]}
          />*!/}
{/!*          <BarChart
              linearIncome = {linearIncome[0]}
          />*!/}
      </>
    );
}

*/

function Career() {
    return (
      <>
          <span>Test</span>
          <br />
          <DynamicChartTest
               jobsData = {jobsData}
           />
{/*          <JobContainer
               jobsData = {jobsData}
          />*/}

      </>
    );
}

export default Career;
