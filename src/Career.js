import JobDataHandler from "./libs/jobdatahandler";
import React from "react";
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
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 10,
        key: 1,
    },{
        immediateIncome: 20000,
        incomeCeiling: 20000,
        yearIncomeBegins: 3,
        yearToIncomeCeiling: 10,
        key: 2,
    }];

var cc = console.log;
var lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;


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


function createArrayWithNumberOfYearsToGraph() {
    let numberOfYearsToGraph = [];
    let yearsToBeReturned = [];

    for (let i = 0; i < lengthOfGraphInYears;){
        numberOfYearsToGraph = ++i;
        yearsToBeReturned.push(numberOfYearsToGraph);
    }

    return yearsToBeReturned;
}


function CreateOptionForms({formTitle}) {

    const numberOfYearsToGraph = createArrayWithNumberOfYearsToGraph();
    const optionElements = numberOfYearsToGraph.map((year) =>
            ( <option value={year} className={"text-slate-500"}></option> )
    );

    return (
        <>
                <select>
                    {optionElements}
                </select>
            <label> {formTitle} </label><br />
        </>
    );
}


function IncomeForms() {

    return (
        <div className={'formContainer'}>
            <form>
                <input type={"text"}></input> <br />
                <CreateOptionForms
                    formTitle={"Year income begins"}
                />
                <input type={"text"}></input> <br />
                <CreateOptionForms
                    formTitle={"Year to income ceiling"}
                />
            </form>
        </div>
    );
}


function Career() {

    return (
      <>
          <br />
          <IncomeForms />

          <DynamicChartTest
               jobsData = {jobsData}
           />
      </>
    );
}

export default Career;
