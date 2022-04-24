import JobDataHandler from "./libs/jobdatahandler";
import React from "react";
import {BarChart} from "./graphs/IncomeGraphs";
import {useState} from "react";
import {list} from "postcss";

var cc = console.log;
var lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;
var linearKey = 0;
var steppedKey = 0;


function handleError(message){
    throw new Error(message)
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

function CreateSteppedJobIncomeForm({id}){

    return(
        <>
            <input type={"text"} className={"incomeSteppedJob"}></input> Income from this year
            onward: &nbsp;
            <CreateOptionForms
                id = {id}
            />
        </>
    )
}

function CreateOptionForms({formTitle, id, key}) {

    const numberOfYearsToGraph = createArrayWithNumberOfYearsToGraph();
    const optionElements = numberOfYearsToGraph.map((year) =>
            ( <option value={year} key={year}></option> )
    );
    // TODO Remove ID
    return (
        <>
                <select className={"text-slate-500 "+ id} id={id} key={key}>
                    {optionElements}
                </select>
            <label> {formTitle} </label><br />
        </>
    );
} //TODO Turn into class; will be reused

//TODO Make this container show as a pseudo-popup.
function FormContainer({linearJobDataState, setLinearJobDataState, steppedJobDataState,
                           setSteppedJobDataState}) {

    return (
        <div id={"formContainer"}>
            <LinearIncomeForms
                linearJobDataState = {linearJobDataState}
                setLinearJobDataState = {setLinearJobDataState}
            />
        </div>
    );
}

/*
var onAddLinearJobButtonClick = {
    jobType: "linear",
}

var onAddSteppedJobButtonClick = {
    jobType: "stepped",
}
*/

function LinearIncomeForms({linearJobDataState, setLinearJobDataState}) {
    let formType = "linearincome";

    return (
        <>
            <form>
                <input type={"text"} id={"linearJobTitle"}></input> Job Title <br />
                <input type={"text"} id={"incomeImmediate"}></input> Starting income
                <CreateOptionForms
                    formTitle={"Year income begins"}
                    id={"yearIncomeBegins"}
                />
                <input type={"text"} id={"incomeCeiling"}></input> Ceiling income
                <CreateOptionForms
                    formTitle={"Year to income ceiling"}
                    id={"yearToIncomeCeiling"}
                />
                <button type={"click"} id={"submitLinearJob"} onClick={(e) => {
                    e.preventDefault(); handleLinearJobSubmission(linearJobDataState,
                        setLinearJobDataState) }}>
                    Submit
                </button>
            </form>
        </>
    );
}

function SteppedIncomeForms({steppedJobDataState, setSteppedJobDataState}) {
    let steppedIncomeFormKey = 0;
    let initialIncomeFormState = [{ key: steppedIncomeFormKey }];
    const [steppedIncomeFormState, setSteppedIncomeFormState] = useState(initialIncomeFormState);

    return (
        <>
            <form>
                <input type={"text"} id={"steppedJobTitle"}></input> Job Title <br />

                <ListJobIncomeForms
                    steppedIncomeFormState = {steppedIncomeFormState}
                />

                <button type={"click"} id={"addSteppedIncome"} onClick={(e) => {
                    e.preventDefault(); steppedIncomeFormKey = steppedIncomeFormKey +1;
                        addSteppedIncomeField(steppedIncomeFormState,
                            setSteppedIncomeFormState, steppedIncomeFormKey) }}>
                    Add income change
                </button> &nbsp;

                <button type={"click"} id={"deleteSteppedIncome"} onClick={(e) => {
                    e.preventDefault(); removeSteppedIncomeField(steppedIncomeFormState,
                        setSteppedIncomeFormState) }}>
                    Delete income change
                </button>
                <br />
                <button type={"click"} id={"submitLinearJob"} onClick={(e) => {
                    e.preventDefault(); handleSteppedJobSubmission(steppedJobDataState,
                        setSteppedJobDataState) }}>
                    Submit
                </button>

            </form>
        </>
    )
}

function addSteppedIncomeField(steppedIncomeFormState, setSteppedIncomeFormState,
                               steppedIncomeFormKey){
    try {
        if (steppedIncomeFormState.length >= lengthOfGraphInYears) {
            throw new Error("There are as many fields as years; you cannot add more.")
        }
    } catch (err) {
        handleError(err.message);
        return;
    }


    let arrayToBeReturned = [...steppedIncomeFormState];
    let dataToAppend = [{
            key: steppedIncomeFormKey
        }];
    arrayToBeReturned = [...arrayToBeReturned, ...dataToAppend];
    setSteppedIncomeFormState(arrayToBeReturned);
}

function removeSteppedIncomeField(steppedIncomeFormState, setSteppedIncomeFormState){
    if (steppedIncomeFormState <= 1){
        return;
    }

    let arrToBeReturned = [...steppedIncomeFormState];
    let whichEntryToRemove = arrToBeReturned.length -1;
    arrToBeReturned.splice(whichEntryToRemove, 1);
    setSteppedIncomeFormState(arrToBeReturned);
}


function ListJobIncomeForms({steppedIncomeFormState}){

    let printToDom = steppedIncomeFormState.map(entry => {
        return(
            <CreateSteppedJobIncomeForm
                id={"yearThisSteppedIncomeBegins"}
            />
        )
    });

    return (
        <>
            {printToDom}
        </>
    )
}

function DynamicChartTest({linearJobDataState, setLinearJobDataState}) {
    if (linearJobDataState.length !== 0) {
        const linearIncomeBarGraph = linearJobDataState.map((job) => (
            <div id="linearJob" className={"linearJobKey" + job.key } key={job.key}>
                <BarChart linearIncome={job}/>
                <button type={"click"} className={"deleteLinearJobKey" + job.key}
                        onClick={(e) => {
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

function handleSteppedJobSubmission(steppedJobDataState, setSteppedJobDataState){
    let jobData = undefined;
    let jobTitle = document.querySelector('#steppedJobTitle').value;
    let salaryAmountsNodes = document.querySelectorAll('.incomeSteppedJob');
    let salaryAmounts = [];
    let salaryYearsNodes = document.querySelectorAll('.yearThisSteppedIncomeBegins');
    let salaryYears = [];

    salaryAmountsNodes.forEach(e => {
        salaryAmounts.push(e.value);
    });

    salaryYearsNodes.forEach(e => {
        salaryYears.push(e.value);
    });

    jobData = checkSteppedData(jobTitle, salaryAmounts, salaryYears);

    if (jobData[0].pass === true) {
        jobData = runCalculationsOnSteppedData(steppedJobDataState, setSteppedJobDataState, jobData);
        //jobData = updateJobDataState(jobData, steppedJobDataState, setSteppedJobDataState);
    }
}


//TODO Hide submit button for two seconds after click.
function handleLinearJobSubmission(linearJobDataState, setLinearJobDataState){
    let jobData = undefined;
    let jobTitle = document.querySelector('#linearJobTitle').value;
    let incomeCeiling = document.querySelector('#incomeCeiling').value;
    let incomeImmediate = document.querySelector('#incomeImmediate').value;
    let yearToIncomeCeiling = document.querySelector('#yearToIncomeCeiling').value;
    let yearIncomeBegins = document.querySelector('#yearIncomeBegins').value;

    jobData = checkLinearData(jobTitle, incomeCeiling, incomeImmediate, yearToIncomeCeiling,
        yearIncomeBegins);



    if (jobData[0].pass === true) {
        jobData = runCalculationsOnLinearData(linearJobDataState, setLinearJobDataState, jobData);
        jobData = updateJobDataState(jobData, linearJobDataState, setLinearJobDataState);
    }
}

//TODO Add delete confirmation.
function handleLinearJobDelete(key, linearJobDataState, setLinearJobDataState){
    let arrayToBeReturned = [];
    arrayToBeReturned = [...linearJobDataState]
    //cc(linearJobDataState)
    //cc(arrayToBeReturned);
    let keyPositionInArray = arrayToBeReturned.findIndex(o => o.key === key);
    arrayToBeReturned.splice(keyPositionInArray, 1);
    setLinearJobDataState(arrayToBeReturned);
}


export function checkLinearData(jobTitle, incomeCeiling, incomeImmediate, yearToIncomeCeiling,
                                yearIncomeBegins){
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


export function checkSteppedData(jobTitle, salaryAmounts, salaryYears){
    let jobData = {
        salaryAmounts: [],
        salaryYears: [],
        jobTitle: '',
        };
    let jobDataToBeReturned = [];

    try {
        if ((jobTitle !== undefined) && (jobTitle !== '')){
            jobData.jobTitle = jobTitle;
        } else {
            throw new Error("Job Title not set.");
        }

        for (let i = 0; i < salaryAmounts.length; i++) {
            if (isNumeric(salaryAmounts[i])) {
                jobData.salaryAmounts.push(+salaryAmounts[i]);
            } else {
                throw new Error("Ceiling Income NaN.");
            }
        }

        for (let i = 0; i < salaryYears.length; i++) {
            if ((i >= 1) && (+salaryYears[i] <= +salaryYears[i -1])){
                throw new Error("Year in field " +i+ " is less than or equal to the year in the previous field.");
            } else if (isNumeric(salaryYears[i])) {
                jobData.salaryYears.push(+salaryYears[i]);
            } else {
                throw new Error("Starting income NaN.");
            }
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
    jobDataToBeReturned.push(jobData);
    jobData = {};
    steppedKey++;
    return jobDataToBeReturned;
    //TODO Split this into check and set
}


function runCalculationsOnLinearData(linearJobDataState, setLinearJobDataState, jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findLinear();
    return jobDataToBeReturned;
}

function runCalculationsOnSteppedData(linearJobDataState, setLinearJobDataState, jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findStepped();
    //return jobDataToBeReturned;
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
//TODO Create a Youtube video demonstrating this app.
function Career() {
    const [linearJobDataState, setLinearJobDataState] = useState([]);
    const [steppedJobDataState, setSteppedJobDataState] = useState([]);


    return (
      <>
          <FormContainer
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />
          <br />
          <DynamicChartTest
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
           />
          <SteppedIncomeForms
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />

      </>
    );
}

export default Career;
