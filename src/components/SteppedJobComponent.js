import React, {useState} from "react";
import JobDataHandler from "../libs/jobdatahandler";
import {handleJobDelete, handleError, isNumeric, createArrayWithNumberOfYearsToGraph} from "./jobssharedfunctions";
import {SteppedBarChart, SteppedSumBarChart} from "../graphs/IncomeGraphs";
import {CreateSteppedJobIncomeForm} from "../Career";

//let cc = console.log;
var steppedKey = 0;
let lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;



export function ListJobIncomeForms({steppedIncomeFormState}){

    let printToDom = steppedIncomeFormState.map(entry => {
        return(
            <CreateSteppedJobIncomeForm
                id = {"yearThisSteppedIncomeBegins"}
                key = {"steppedforms"}
            />
        )
    });

    return (
        <>
            {printToDom}
        </>
    )
}

export function addSteppedIncomeField(steppedIncomeFormState, setSteppedIncomeFormState,
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

export function removeSteppedIncomeField(steppedIncomeFormState, setSteppedIncomeFormState){
    if (steppedIncomeFormState <= 1){
        return;
    }

    let arrToBeReturned = [...steppedIncomeFormState];
    let whichEntryToRemove = arrToBeReturned.length -1;
    arrToBeReturned.splice(whichEntryToRemove, 1);
    setSteppedIncomeFormState(arrToBeReturned);
}




export function handleSteppedJobSubmission(steppedJobDataState, setSteppedJobDataState){
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
        updateSteppedJobDataState(jobData, steppedJobDataState, setSteppedJobDataState);
    }
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
    jobData.key = steppedKey++;
    jobDataToBeReturned.push(jobData);
    jobData = {};
    return jobDataToBeReturned;
    //TODO Split this into check and set
}


function runCalculationsOnSteppedData(linearJobDataState, setLinearJobDataState, jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findStepped();
    return jobDataToBeReturned;
}

function updateSteppedJobDataState(jobData, steppedJobDataState, setSteppedJobDataState){
    let extantJobs = [...steppedJobDataState];

    if (steppedJobDataState.length === 0){
        setSteppedJobDataState(jobData);
    } else {
        let combinedJobs = [...extantJobs, ...jobData];
        setSteppedJobDataState(combinedJobs);
    }
}

function SteppedGraph({steppedJobDataState, setSteppedJobDataState}){

    if (steppedJobDataState.length !== 0) {
        const steppedIncomeBarGraph = steppedJobDataState.map((job) => (
            <div className={"steppedJobBarGraph steppedJobKey" + job.key } key={job.key}>
                Job title: {job.jobTitle} <br />
                <SteppedBarChart job={job}/>
                <SteppedSumBarChart job={job}/>
                <button type={"click"} className={"deleteSteppedJobKey" + job.key}
                        onClick={(e) => {
                            e.preventDefault();
                            handleJobDelete(job.key, steppedJobDataState, setSteppedJobDataState);
                        }} >
                    Delete Row {job.key}
                </button>
            </div>
        ));

        return (
            <>
                {(steppedJobDataState.length !== 0) && steppedIncomeBarGraph}
            </>
        );
    }
}

function SteppedJobComponent({steppedJobDataState, setSteppedJobDataState}) {
    return (
      <>
          <SteppedGraph
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />
      </>
    );
}

export default SteppedJobComponent;