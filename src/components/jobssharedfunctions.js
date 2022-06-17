//TODO Add delete confirmation.
import CareerDataHandler from "../libs/CareerDataHandler";
import jobdatahandler from "../libs/CareerDataHandler";

var lengthOfGraphInYears = new CareerDataHandler();
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

export function getYearsNumbered(){
    let years = [];

    for (let i = 0; i <= (lengthOfGraphInYears - 1); i++) {
        years.push("Year " + (i + 1));
    }

    return years;
}

export function applyRoundingSingleDepthArray(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.round(arr[i]);
    }
    return arr;
}

export function applyRoundingTwoDepthArray(arr){
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            arr[i][j] = Math.round(arr[i][j]);
        }
    }
    return arr;
}

export function applyRoundingSingleDepthArrayTwoDecimals(arr){
    for (let i = 0; i < arr.length; i++) {
        arr[i] = +arr[i].toFixed(2);
    }
    return arr;
}

export function createArrayOfZeros(length){
    let arr = [];

    for (let i = 0; i < length; i++){
        arr[i] = 0;
    }

    return arr;
}

export function cc(obj){
    return console.dir(obj);
}

export function isObject(x){
    return (typeof x === 'object' && !Array.isArray(x) && x !== null)
}

export function isEmptyObject(obj) {
    if (isObject(obj)) {
        return Object.keys(obj).length === 0;
    } else {
        return true;
    }
}

export function isEmptyArray(x) {
    return (Array.isArray(x) && x.length === 0);
}

export function combineSinglePropertySubArrays(arrs, lengthOfArray){
    let x = [];

    for (let j = 0; j < lengthOfArray; j++) {
        x[j] = 0;
    }

    for (let i = 0; i < arrs.length; i++) {
        for (let j = 0; j < lengthOfArray; j++) {
            x[j] = x[j] + arrs[i][j];
        }
    }

    return x;
}

export function combineObjectKeySubArraySumsIntoNewKey(arr, oldKey, newKey, lengthOfArray){
    arr[newKey] = [];

    for (let j = 0; j < arr[oldKey].length; j++){
        for (let i = 0; i < lengthOfArray; i++) {
            if (isNumeric(arr[newKey][i])){
                arr[newKey][i] = arr[newKey][i] + arr[oldKey][j][i];
            } else {
                arr[newKey][i] = arr[oldKey][j][i];
            }
        }
    }

    return arr;
}