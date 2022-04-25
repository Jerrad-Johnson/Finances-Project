//TODO Add delete confirmation.
import JobDataHandler from "../libs/jobdatahandler";

var lengthOfGraphInYears = new JobDataHandler();
lengthOfGraphInYears = lengthOfGraphInYears.graphMaxNumberOfYears;

export function handleJobDelete(key, jobDataState, setJobDataState){
    let arrayToBeReturned = [];
    arrayToBeReturned = [...jobDataState]
    let keyPositionInArray = arrayToBeReturned.findIndex(o => o.key === key);
    arrayToBeReturned.splice(keyPositionInArray, 1);
    setJobDataState(arrayToBeReturned);
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

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}