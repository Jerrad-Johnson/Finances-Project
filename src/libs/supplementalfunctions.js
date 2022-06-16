import {createArrayOfZeros} from "../components/jobssharedfunctions";

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

export function findCurrentFinancialSheets(sheets, current){
    return sheets.filter((sheet) => {
        return sheet.title === current;
    });
}