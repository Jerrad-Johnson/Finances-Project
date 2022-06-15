//TODO Hide submit button for two seconds after click.
import React from "react";
import JobDataHandler from "../libs/jobdatahandler";
import {LinearBarChart, LinearSumBarChart} from "../graphs/IncomeGraphs";
import {handleJobDelete, isNumeric} from "./jobssharedfunctions";
import {errorHandler} from "../libs/errorHandler";
let cc = console.log;
var linearKey = 0;

export function handleLinearJobSubmission(linearJobDataState, setLinearJobDataState){
    let jobData = undefined;

    jobData = setLinearJobData();

    try {
        jobData = checkLinearJobData(jobData);
    } catch (err) {
        return errorHandler(err);
    }

    if (jobData.passed === true) {
        jobData = runCalculationsOnLinearData(jobData);
        updateLinearJobDataState(jobData, linearJobDataState, setLinearJobDataState);
    }
}

function setLinearJobData(){
    let jobDataToBeReturned = {};
    jobDataToBeReturned.yearToIncomeCeiling = +document.querySelector('#yearToIncomeCeiling').value -1;
    jobDataToBeReturned.yearIncomeBegins = +document.querySelector('#yearIncomeBegins').value -1;
    jobDataToBeReturned.title = document.querySelector('#linearJobTitle').value;
    jobDataToBeReturned.incomeCeiling = +document.querySelector('#incomeCeiling').value;
    jobDataToBeReturned.incomeImmediate = +document.querySelector('#incomeImmediate').value;

    return jobDataToBeReturned;
}

export function checkLinearJobData(jobData){

        if ((jobData.title === undefined) || (jobData.title === '')){ //TODO Should be !==
            throw new Error("Job Title not set.");
        } else if (!isNumeric(jobData.incomeCeiling) || jobData.incomeCeiling === 0) {
            throw new Error("Set ceiling income to a number greater than 0.");
        } else if (!isNumeric(jobData.incomeImmediate) || jobData.incomeImmediate === 0) {
            throw new Error("Set starting income to a number greater than 0.");
        } else if (!isNumeric(jobData.yearToIncomeCeiling)) {
            throw new Error("Year to income ceiling not set.");
        } else if (!isNumeric(jobData.yearIncomeBegins)) {
            throw new Error("Year to beginning of income not set.");
        } else if (+jobData.yearIncomeBegins >= +jobData.yearToIncomeCeiling) {
            throw new Error("Beginning income year is later than or equal to ceiling income year.");
        }
        //TODO Add catch somewhere

    jobData.passed = true;
    jobData.key = linearKey;
    linearKey++;
    return jobData;
    //TODO Allow user to skip Starting Income field
}

export function runCalculationsOnLinearData(jobData){
    jobData = new JobDataHandler(jobData).beginLinear();
    return jobData;
}

function updateLinearJobDataState(jobData, jobDataState, setJobDataState) {
    let extantJobs = [...jobDataState];

    if (jobDataState.length === 0) {
        setJobDataState([jobData]);
    } else {
        let combinedJobs = [...extantJobs, jobData];
        setJobDataState(combinedJobs);
    }
}

function LinearGraph({linearJobDataState, setLinearJobDataState}) {
    if (linearJobDataState.length !== 0) {
        const linearIncomeBarGraph = linearJobDataState.map((job) => (
            <div className={"graphCard"}>
                <div id="linearJob" className={"linearJobKey" + job.key } key={job.key}>
                    Job title: {job.title} <br />
                    <span className={"inputSetTitle graphTitle"}>Yearly Income</span>
                    <LinearBarChart job={job}/>
                    <span className={"inputSetTitle graphTitle"}>Running Sum</span>
                    <LinearSumBarChart job={job}/>
                    <button type={"click"} className={"deleteLinearJobKey" + job.key}
                            onClick={(e) => {
                                e.preventDefault();
                                handleJobDelete(job.key, linearJobDataState, setLinearJobDataState);
                            }} >
                        Delete
                    </button>
                </div>
            </div>
        ));

        return (
            <>
                {(linearJobDataState.length !== 0) && linearIncomeBarGraph}
            </>
        );
    }
}

export default LinearGraph;