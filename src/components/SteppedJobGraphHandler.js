import React from "react";
import CareerDataHandler from "../libs/datahandlers/CareerDataHandler";
import {handleJobDelete, isNumeric} from "../libs/genericFunctions";
import {SteppedBarChart, SteppedSumBarChart} from "../graphs/CareerGraphs";
import {CreateSteppedJobIncomeForm} from "../Career";
import {errorHandler} from "../libs/errorHandler";

let cc = console.log;
var steppedKey = 0;
let lengthOfGraphInYears = new CareerDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;

export function ListJobIncomeForms({steppedIncomeFormState}){

    let printToDom = steppedIncomeFormState.map((entry, key) => {
        return(
            <CreateSteppedJobIncomeForm
                id = {"yearThisSteppedIncomeBegins"}
                key = {key}
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

    try {
        jobData = checkSteppedData(jobData);
    } catch (err) {
        return errorHandler(err);
    }
    if (jobData.passed === true) {
        jobData = runCalculationsOnSteppedData(jobData);
        updateSteppedJobDataState(jobData, steppedJobDataState, setSteppedJobDataState);
    }
}

function setSteppedData(){
    let jobDataToBeReturned = {};
    jobDataToBeReturned.title = document.querySelector('#steppedJobTitle').value;
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

    if ((jobData.title === undefined) || (jobData.title === '')) {
        throw new Error("Job Title not set.");
    }

    for (let i = 0; i < jobData.salaryAmounts.length; i++) {
        if (!isNumeric(jobData.salaryAmounts[i]) || jobData.salaryAmounts[i] === 0) {
            throw new Error("Set all salary fields to a number greater than 0.");
        }
    }

    for (let i = 0; i < jobData.salaryYears.length; i++) {
        if ((i >= 1) && (+jobData.salaryYears[i] <= +jobData.salaryYears[i -1])){
            throw new Error("Year in field " +i+ " is less than or equal to the year in the previous field.");
        }
    }
     //TODO Add catch somewhere

    jobData.passed = true;
    jobData.key = steppedKey++;
    //jobData = {};

    return jobData;
    //TODO Split this into check and set
}

export function runCalculationsOnSteppedData(jobData){
    let jobDataToBeReturned = new CareerDataHandler(jobData).beginStepped();

    return jobDataToBeReturned;
}

function updateSteppedJobDataState(jobData, steppedJobDataState, setSteppedJobDataState){
    let extantJobs = [...steppedJobDataState];

    if (steppedJobDataState.length === 0){
        setSteppedJobDataState([jobData]);
    } else {
        let combinedJobs = [...extantJobs, jobData];
        setSteppedJobDataState(combinedJobs);
    }
}

function SteppedGraph({steppedJobDataState, setSteppedJobDataState}){
    if (steppedJobDataState.length !== 0) {
        const steppedIncomeBarGraph = steppedJobDataState.map((job) => (
            <div className={"graphCard"}>
                <div className={"steppedJobBarGraph steppedJobKey" + job.key } key={job.key}>
                    <SteppedBarChart job={job}/>
                    <span className={"inputSetTitle graphTitle"}>Running Sum</span>
                    <SteppedSumBarChart job={job}/>
                    <button type={"click"} className={"deleteSteppedJobKey" + job.key}
                            onClick={(e) => {
                                e.preventDefault();
                                handleJobDelete(job.key, steppedJobDataState, setSteppedJobDataState);
                            }} >
                        Delete Sheet
                    </button>
                </div>
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