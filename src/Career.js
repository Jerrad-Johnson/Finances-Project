import JobDataHandler from "./libs/jobdatahandler";
import React from "react";
import {BarChart} from "./graphs/IncomeGraphs";
import {useState} from "react";

let jobsData =
    [{
        yearsOfExperienceAtEachStep:
            [0, 4, 5, 8],
        incomeAtBeginningOfEachStep:
            [60000, 120000, 150000, 300000],
        key: 0,
    },{
        incomeImmediate: 35000,
        incomeCeiling: 70000,
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 10,
        key: 1,
    },{
        incomeImmediate: 20000,
        incomeCeiling: 20000,
        yearIncomeBegins: 3,
        yearToIncomeCeiling: 10,
        key: 2,
    }];

var cc = console.log;
var lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;


function DynamicChartTest({jobDataState}) {
    const linearIncome = new JobDataHandler(jobsData).findLinear(); //TODO Note: Set arg to "jobsData" to return to hard-coded data.
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


function CreateOptionForms({formTitle, id, key}) {

    const numberOfYearsToGraph = createArrayWithNumberOfYearsToGraph();
    const optionElements = numberOfYearsToGraph.map((year) =>
            ( <option value={year} key={year}></option> )
    );

    return (
        <>
                <select className={"text-slate-500"} id={id} key={key}>
                    {optionElements}
                </select>
            <label> {formTitle} </label><br />
        </>
    );
}


function IncomeForms({jobDataState, setJobDataState}) {

    return (
        <div className={'formContainer'}>
            <form>
                <input type={"text"} id={"jobTitle"}></input> Job Title <br />
                <input type={"text"} id={"incomeImmediate"}></input> Starting income
                <CreateOptionForms
                    formTitle={"Year income begins"}
                    id={"yearIncomeBegins"}
                    /*keyNumber={"1"}*/
                />
                <input type={"text"} id={"incomeCeiling"}></input> Ceiling income
                <CreateOptionForms
                    formTitle={"Year to income ceiling"}
                    id={"yearToIncomeCeiling"}
                    /*keyNumber={"2"}*/
                />
                <button type={"click"} onClick={(e) => {
                    e.preventDefault(); handleLinearSubmit(jobDataState, setJobDataState) }}>
                    Submit
                </button>

            </form>
        </div>
    );
}

function handleLinearSubmit(jobDataState, setJobDataState){
    cc(jobDataState)
}


function Career() {

    const [jobDataState, setJobDataState] = useState([]);
    return (
      <>
          <br />
          <IncomeForms
              jobDataState = {jobDataState}
              setJobDataState = {setJobDataState}
          />
          <DynamicChartTest
              jobDataState = {jobDataState}
           />
      </>
    );
}

export default Career;
