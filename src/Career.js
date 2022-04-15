import JobDataHandler from "./libs/jobdatahandler";
import React from "react";
import {BarChart} from "./graphs/IncomeGraphs";
import {useState} from "react";

let jobsData =
    [{
        incomeImmediate: 20000,
        incomeCeiling: 20000,
        yearIncomeBegins: 3,
        yearToIncomeCeiling: 10,
        key: 2,
    }];

var cc = console.log;
var lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;

/*
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
*/

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
    let jobData = undefined;
    jobData = checkLinearData();
    if (jobData != false) {
        jobData = updateLinearData(jobDataState, setJobDataState, jobData);
        jobData = updateJobDataState(jobData, jobDataState, setJobDataState);
    }
}


function checkLinearData(){
    let jobData = {};
    let jobDataToBeReturned = [];
    let jobTitle = document.querySelector('#jobTitle').value;
    let incomeCeiling = document.querySelector('#incomeCeiling').value;
    let incomeImmediate = document.querySelector('#incomeImmediate').value;
    let yearToIncomeCeiling = document.querySelector('#yearToIncomeCeiling').value;
    let yearIncomeBegins = document.querySelector('#yearIncomeBegins').value;

    try {

        if ((jobTitle !== undefined) && (jobTitle !== '')){
            jobData.jobTitle = jobTitle;
        } else {
            throw new Error("Job Title not set");
            return;
        }

        if (isNumeric(incomeCeiling)) {
            jobData.incomeCeiling = +incomeCeiling;

        } else {
            throw new Error("Ceiling Income NaN");
            return;
        }

        if (isNumeric(incomeImmediate)) {
            jobData.incomeImmediate = +incomeImmediate;
        } else {
            throw new Error("Starting income NaN");
            return;
        }

        if (isNumeric(yearToIncomeCeiling)) {
            jobData.yearToIncomeCeiling = --yearToIncomeCeiling;
        } else {
            throw new Error("Year to income ceiling not set.");
            return;
        }

        if (isNumeric(yearIncomeBegins)) {
            jobData.yearIncomeBegins = --yearIncomeBegins;
        } else {
            throw new Error("Year to beginning of income not set.");
            return;
        }

        if (+yearIncomeBegins >= +yearToIncomeCeiling) {
            throw new Error("Beginning income year is later than or equal to ceiling income year.");
        }

    } catch (err) {
        cc("Error - " + err.message)
        return false;
    }
    jobDataToBeReturned.push(jobData)
    jobData = {};
    return jobDataToBeReturned;
    //TODO Split this into check and set
    //TODO Allow user to skip Starting Income field
}


function updateLinearData(jobDataState, setJobDataState, jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findLinear();
    return jobDataToBeReturned;
}


function updateJobDataState(jobData, jobDataState, setJobDataState){
    let extantJobs = [...jobDataState];

    if (jobDataState.length == 0){
        setJobDataState(jobData);
    } else {

    let combinedJobs = [...jobData, ...extantJobs];
    setJobDataState(combinedJobs);
    cc(jobDataState)
    }
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
          {/*<DynamicChartTest
              jobDataState = {jobDataState}
           />*/}
      </>
    );
}

export default Career;
