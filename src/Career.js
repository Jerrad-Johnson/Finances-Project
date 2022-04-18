import JobDataHandler from "./libs/jobdatahandler";
import React from "react";
import {BarChart} from "./graphs/IncomeGraphs";
import {useState} from "react";

var cc = console.log;
var lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;
var linearKey = 0;


function handleError(message){
    throw new Error(message);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function createArrayWithNumberOfYearsToGraph() {
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
} //TODO Turn into class; will be reused

function FormContainer({linearJobDataState, setLinearJobDataState, staticJobDataState, setStaticJobDataState}) {

    return (
        <div id={"formContainer"}>
            <LinearIncomeForms
                linearJobDataState = {linearJobDataState}
                setLinearJobDataState = {setLinearJobDataState}
            />
        </div>
    );
}

function LinearIncomeForms({linearJobDataState, setLinearJobDataState}) {

    return (
        <>
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
                <button type={"click"} id={"submitLinearJob"} onClick={(e) => {
                    e.preventDefault(); handleLinearSubmit(linearJobDataState, setLinearJobDataState) }}>
                    Submit
                </button>

            </form>
        </>
    );
}

function StaticIncomeForms({staticJobDataState, setStaticJobDataState}) {

    //return
}


function DynamicChartTest({linearJobDataState, setLinearJobDataState}) {
    if (linearJobDataState.length !== 0) {
        const linearIncomeBarGraph = linearJobDataState.map((job) => (
            <div id="linearJob" className={"linearJobKey" + job.key } key={job.key}>
                <BarChart linearIncome={job}/>
                <button type={"click"} className={"deleteLinearJobKey" + job.key} onClick={(e) => {
                    e.preventDefault();
                    handleLinearJobDelete(job.key, linearJobDataState, setLinearJobDataState);
                }} >
                    Delete Row {job.key}
                </button>
            </div>
        ));

        return (
            <>
             {(linearJobDataState.length !== 0) && linearIncomeBarGraph}
            </>
        );
    }
}

//TODO Hide submit button for two seconds after click.
function handleLinearSubmit(linearJobDataState, setLinearJobDataState){
    let jobData = undefined;
    let jobTitle = document.querySelector('#jobTitle').value;
    let incomeCeiling = document.querySelector('#incomeCeiling').value;
    let incomeImmediate = document.querySelector('#incomeImmediate').value;
    let yearToIncomeCeiling = document.querySelector('#yearToIncomeCeiling').value;
    let yearIncomeBegins = document.querySelector('#yearIncomeBegins').value;

    jobData = checkLinearData(jobTitle, incomeCeiling, incomeImmediate, yearToIncomeCeiling, yearIncomeBegins);

    if (jobData[0].pass === true) {
        jobData = updateLinearData(linearJobDataState, setLinearJobDataState, jobData);
        jobData = updateJobDataState(jobData, linearJobDataState, setLinearJobDataState);
    }
}

//TODO Add delete confirmation.
function handleLinearJobDelete(key, linearJobDataState, setLinearJobDataState){
    let arrayToBeReturned = [];
    arrayToBeReturned = [...linearJobDataState]
    let keyPositionInArray = arrayToBeReturned.findIndex(o => o.key === key);
    arrayToBeReturned.splice(keyPositionInArray, 1);
    setLinearJobDataState(arrayToBeReturned);
}


export function checkLinearData(jobTitle, incomeCeiling, incomeImmediate, yearToIncomeCeiling, yearIncomeBegins){
    let jobData = {};
    let jobDataToBeReturned = [];

    try {

        if ((jobTitle !== undefined) && (jobTitle !== '')){
            jobData.jobTitle = jobTitle;
        } else {
            throw new Error("Job Title not set.");
        }

        if (isNumeric(incomeCeiling)) {
            jobData.incomeCeiling = +incomeCeiling;

        } else {
            throw new Error("Ceiling Income NaN.");
        }

        if (isNumeric(incomeImmediate)) {
            jobData.incomeImmediate = +incomeImmediate;
        } else {
            throw new Error("Starting income NaN.");
        }

        if (isNumeric(yearToIncomeCeiling)) {
            jobData.yearToIncomeCeiling = --yearToIncomeCeiling;
        } else {
            throw new Error("Year to income ceiling not set.");
        }

        if (isNumeric(yearIncomeBegins)) {
            jobData.yearIncomeBegins = --yearIncomeBegins;
        } else {
            throw new Error("Year to beginning of income not set.");
        }

        if (+yearIncomeBegins >= +yearToIncomeCeiling) {
            throw new Error("Beginning income year is later than or equal to ceiling income year.");
        }

    } catch (err) {

        let returnObject = {}
        //returnObject.pass = false;
        returnObject.fn = (() => { handleError(err.message) });
        return returnObject;
//      return (() => { handleError(err.message)});
    }

    jobData.pass = true;
    jobData.key = linearKey;
    jobDataToBeReturned.push(jobData)
    jobData = {};
    linearKey++;
    return jobDataToBeReturned;
    //TODO Split this into check and set
    //TODO Allow user to skip Starting Income field
}


function updateLinearData(linearJobDataState, setLinearJobDataState, jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findLinear();
    return jobDataToBeReturned;
}


function updateJobDataState(jobData, jobDataState, setJobDataState){
    let extantJobs = [...jobDataState];

    if (jobDataState.length === 0){
        setJobDataState(jobData);
    } else {
        let combinedJobs = [...extantJobs, ...jobData];
        setJobDataState(combinedJobs);
    }
}



//TODO Display job title in graph
function Career() {
    const [linearJobDataState, setLinearJobDataState] = useState([]);
    const [staticJobDataState, setStaticJobDataState] = useState([]);


    return (
      <>
          <FormContainer
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
              staticJobDataState = {staticJobDataState}
              setStaticJobDataState = {setStaticJobDataState}
          />
          <br />
          <DynamicChartTest
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
           />
          <StaticIncomeForms
              staticJobDataState = {staticJobDataState}
              setStaticJobDataState = {setStaticJobDataState}
          />

      </>
    );
}

export default Career;
