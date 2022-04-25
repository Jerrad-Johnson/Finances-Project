//TODO Hide submit button for two seconds after click.
import React from "react";
import JobDataHandler from "../libs/jobdatahandler";
import {LinearBarChart, LinearSumBarChart} from "../graphs/IncomeGraphs";
import {handleJobDelete, handleError, isNumeric} from "./jobssharedfunctions";

//let cc = console.log;
var linearKey = 0;
let lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;
//cc(lengthOfGraphInYears)

export function handleLinearJobSubmission(linearJobDataState, setLinearJobDataState){
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
        updateLinearJobDataState(jobData, linearJobDataState, setLinearJobDataState);
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

export function checkLinearData(jobTitle, incomeCeiling, incomeImmediate, yearToIncomeCeiling,
                                yearIncomeBegins){

    let jobData = {};
    let jobDataToBeReturned = [];
    incomeCeiling = +incomeCeiling
    incomeImmediate = +incomeImmediate;
    yearIncomeBegins = +yearIncomeBegins;
    yearToIncomeCeiling = +yearToIncomeCeiling;

    try {

        if ((jobTitle !== undefined) && (jobTitle !== '')){
            jobData.jobTitle = jobTitle;
        } else {
            throw new Error("Job Title not set.");
        }

        if (isNumeric(incomeCeiling)) {
            jobData.incomeCeiling = incomeCeiling;
       } else {
            throw new Error("Ceiling Income NaN.");
        }

        if (isNumeric(incomeImmediate)) {
            jobData.incomeImmediate = incomeImmediate;
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

        if (yearIncomeBegins >= yearToIncomeCeiling) {
            throw new Error("Beginning income year is later than or equal to ceiling income year.");
        }

    } catch (err) {
        let returnObject = {}
        returnObject.fn = (() => { handleError(err.message) }); // TODO FIX THIS
        return returnObject;
    }

    jobData.pass = true;
    jobData.key = linearKey;
    jobDataToBeReturned.push(jobData)
    jobData = {};
    linearKey++;
    return jobDataToBeReturned;
    //TODO Split this into check and set
    //TODO Allow user to skip Starting Income field*/
}

function runCalculationsOnLinearData(linearJobDataState, setLinearJobDataState, jobData){
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

function LinearJobComponent({linearJobDataState, setLinearJobDataState}) {

    return (
        <>
            <LinearGraph
                linearJobDataState = {linearJobDataState}
                setLinearJobDataState = {setLinearJobDataState}
            />
        </>
    );
}

export default LinearJobComponent;