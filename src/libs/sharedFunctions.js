import {createArrayOfZeros, isNumeric} from "./genericFunctions";
import {errorHandler} from "./errorHandler";

export function changeSheetLength(graphData, graphRangeState, yearsArrayForGraph) {
    let newGraphData = []
    let newYearsArray = []

    let beginningRange = graphRangeState;
    beginningRange = Array.from(beginningRange);
    let indexOfDash = beginningRange.indexOf("-");
    let arrayLength = beginningRange.length
    beginningRange.splice(indexOfDash, (arrayLength -1));
    beginningRange = beginningRange.toString();
    beginningRange = beginningRange.replace(',', '');
    beginningRange = +beginningRange;

    for (let i = 0; i < graphData.length; i++){
        let k = 0;
        newGraphData[i] = {}
        newGraphData[i].data = createArrayOfZeros(5);
        newGraphData[i].name = graphData[i].name;
        newGraphData.description = graphData.description

        for (let j = beginningRange; j < (beginningRange + 5); j++){
            newGraphData[i].data[k] = graphData[i].data[j];
            newYearsArray[k] = yearsArrayForGraph[j];
            k++;
        }
    }

    return [newGraphData, newYearsArray]
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

export function findCurrentFinancialSheets(sheets, current){
    return sheets.filter((sheet) => {
        return sheet.title === current;
    });
}

export function removeAllValues(){
    localStorage.removeItem("linearjob");
    localStorage.removeItem("steppedjob");
    localStorage.removeItem("expensedata");
    localStorage.removeItem("investmentdata");

    if (!localStorage.getItem("linearjob")
        && !localStorage.getItem("steppedjob")
        && !localStorage.getItem("expensedata")
        && !localStorage.getItem("investmentdata")) {
        errorHandler("Old data removed.");
    } else {
        errorHandler("Failed to remove old data.");
    }
}

export function sortFinancialData(financialData){
    if (financialData !== null) {
        financialData.sort((a, b) => {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            return (x > y ? 1 : -1);
        });
    }

    return financialData;
}