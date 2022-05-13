import React from "react";
import JobDataHandler from "../libs/jobdatahandler";
import {handleJobDelete, isNumeric} from "./jobssharedfunctions";
import {SteppedBarChart, SteppedSumBarChart} from "../graphs/IncomeGraphs";
import {CreateSteppedJobIncomeForm} from "../Career";

let cc = console.log;
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
        if (steppedIncomeFormState.length >= lengthOfGraphInYears) {
            throw new Error("There are as many fields as years; you cannot add more.")
        }
        //TODO Add catch somewhere

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
    let jobData = setSteppedData();
    jobData = checkSteppedData(jobData);

    if (jobData[0].pass === true) {
        jobData = runCalculationsOnSteppedData(jobData);
        updateSteppedJobDataState(jobData, steppedJobDataState, setSteppedJobDataState);
    }
}

function setSteppedData(){
    let jobDataToBeReturned = [];
    jobDataToBeReturned.jobTitle = document.querySelector('#steppedJobTitle').value;
    let salaryAmountsNodes = document.querySelectorAll('.incomeSteppedJob');
    let salaryYearsNodes = document.querySelectorAll('.yearThisSteppedIncomeBegins');
    jobDataToBeReturned.salaryAmounts = [];
    jobDataToBeReturned.salaryYears = [];

    salaryAmountsNodes.forEach(e => {
        jobDataToBeReturned.salaryAmounts.push(+e.value);
    });

    salaryYearsNodes.forEach(e => {
        jobDataToBeReturned.salaryYears.push(+e.value);
    });

    return jobDataToBeReturned;
}

export function checkSteppedData(jobData){
    let jobDataToBeReturned = [];

    if ((jobData.jobTitle === undefined) || (jobData.jobTitle === '')) {
        throw new Error("Job Title not set.");
    }

    for (let i = 0; i < jobData.salaryAmounts.length; i++) {
        if (!isNumeric(jobData.salaryAmounts[i])) {
            throw new Error("Salary fields must be filled, and contain only numbers.");
        }
    }

    for (let i = 0; i < jobData.salaryYears.length; i++) {
        if ((i >= 1) && (+jobData.salaryYears[i] <= +jobData.salaryYears[i -1])){
            throw new Error("Year in field " +i+ " is less than or equal to the year in the previous field.");
        }
    }
     //TODO Add catch somewhere

    jobData.pass = true;
    jobData.key = steppedKey++;
    jobDataToBeReturned.push(jobData);
    jobData = {};
    return jobDataToBeReturned;
    //TODO Split this into check and set
}

export function runCalculationsOnSteppedData(jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findStepped();

    return jobDataToBeReturned;
}

function updateSteppedJobDataState(jobData, steppedJobDataState, setSteppedJobDataState){

    let newJobData = {};

    jobData.forEach((e) => { // Correcting data format error; converts from [[k:v]] to {k:v}
        for(const [k, v] of Object.entries(e)){
            newJobData[k] = v;
        }
    });


    let extantJobs = [...steppedJobDataState];

    if (steppedJobDataState.length === 0){
        setSteppedJobDataState([newJobData]);
    } else {
        let combinedJobs = [...extantJobs, newJobData];
        setSteppedJobDataState(combinedJobs);
    }

    /* From react chat:
    setSteppedJobDataState((prevSteppedJobData) =>
        prevSteppedJobData.length === 0
            ? jobData
            : prevSteppedJobData.concat(jobData)
    );*/
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


export default SteppedGraph;