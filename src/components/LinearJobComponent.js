//TODO Hide submit button for two seconds after click.
import React from "react";
import JobDataHandler from "../libs/jobdatahandler";
import {LinearBarChart, LinearSumBarChart} from "../graphs/IncomeGraphs";
import {handleJobDelete, isNumeric} from "./jobssharedfunctions";

let cc = console.log;
var linearKey = 0;
let lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;

export function handleLinearJobSubmission(linearJobDataState, setLinearJobDataState){
    let jobData = undefined;

    jobData = setLinearJobData();
    jobData = checkLinearJobData(jobData);

    if (jobData[0].pass === true) {
        jobData = runCalculationsOnLinearData(jobData);
        updateLinearJobDataState(jobData, linearJobDataState, setLinearJobDataState);
    }
}

export function setLinearJobData(){
    let jobDataToBeReturned = [];
    let jobTitle = document.querySelector('#linearJobTitle').value;
    let incomeCeiling = document.querySelector('#incomeCeiling').value;
    let incomeImmediate = document.querySelector('#incomeImmediate').value;
    let yearToIncomeCeiling = document.querySelector('#yearToIncomeCeiling').value;
    let yearIncomeBegins = document.querySelector('#yearIncomeBegins').value;

    jobDataToBeReturned.jobTitle = jobTitle;
    jobDataToBeReturned.incomeCeiling = +incomeCeiling
    jobDataToBeReturned.incomeImmediate = +incomeImmediate;
    jobDataToBeReturned.yearToIncomeCeiling = --yearToIncomeCeiling;
    jobDataToBeReturned.yearIncomeBegins = --yearIncomeBegins;

    return jobDataToBeReturned;
}

export function checkLinearJobData(jobData){

    let jobDataToBeReturned = [];

        if ((jobData.jobTitle === undefined) || (jobData.jobTitle === '')){ //TODO Should be !==
            throw new Error("Job Title not set.");
        } else if (!isNumeric(jobData.incomeCeiling)) {
            throw new Error("Ceiling Income NaN.");
        } else if (!isNumeric(jobData.incomeImmediate)) {
            throw new Error("Starting income NaN.");
        } else if (!isNumeric(jobData.yearToIncomeCeiling)) {
            throw new Error("Year to income ceiling not set.");
        } else if (!isNumeric(jobData.yearIncomeBegins)) {
            throw new Error("Year to beginning of income not set.");
        } else if (jobData.yearIncomeBegins >= jobData.yearToIncomeCeiling) {
            throw new Error("Beginning income year is later than or equal to ceiling income year.");
        }

        //TODO Add catch somewhere

    jobData.pass = true;
    jobData.key = linearKey;
    jobDataToBeReturned.push(jobData);
    jobData = {};
    linearKey++;
    return jobDataToBeReturned;
    //TODO Allow user to skip Starting Income field
}

function runCalculationsOnLinearData(jobData){
    let jobDataToBeReturned = new JobDataHandler(jobData).findLinear();
    return jobDataToBeReturned;
}

function updateLinearJobDataState(jobData, jobDataState, setJobDataState){
    let extantJobs = [...jobDataState];

    if (jobDataState.length === 0){
        setJobDataState(jobData);
    } else {
        let combinedJobs = [...extantJobs, ...jobData];
        setJobDataState(combinedJobs);
    }
}

function LinearGraph({linearJobDataState, setLinearJobDataState}) {
    if (linearJobDataState.length !== 0) {
        const linearIncomeBarGraph = linearJobDataState.map((job) => (
            <div id="linearJob" className={"linearJobKey" + job.key } key={job.key}>
                Job title: {job.jobTitle} <br />
                <LinearBarChart job={job}/>
                <LinearSumBarChart job={job}/>
                <button type={"click"} className={"deleteLinearJobKey" + job.key}
                        onClick={(e) => {
                            e.preventDefault();
                            handleJobDelete(job.key, linearJobDataState, setLinearJobDataState);
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

export default LinearGraph;