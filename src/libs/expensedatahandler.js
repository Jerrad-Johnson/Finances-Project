import Jobdatahandler from "./jobdatahandler";

class ExpenseDataHandler{
    constructor(expenseData) {
        this.expenseData = expenseData;
        this.cc = console.log;
        this.graphMaxNumberOfYears = new Jobdatahandler();
        this.graphMaxNumberOfYears = this.graphMaxNumberOfYears.graphMaxNumberOfYears;
    }

    beginCalculations(){
        let sheet = this.expenseData;
        sheet.numberOfEntries = sheet.amount.length;
        sheet = this.convertMonthlyExpenseToYearly(sheet);
        sheet = this.entryYearRange(sheet);
        sheet = this.addArrayOfNumberedYearsForGraph(sheet);
        sheet = this.runningSumEachEntry(sheet);
        sheet = this.finalSumEachEntry(sheet);

        return sheet;
    }

    convertMonthlyExpenseToYearly(sheet){
        sheet.calculatedAmount = [];
        for (let i = 0; i < sheet.numberOfEntries; i++){
            if (sheet.frequency[i] == 'mo'){
                sheet.calculatedAmount[i] = sheet.amount[i] * 12;
            } else {
                sheet.calculatedAmount[i] = sheet.amount[i];
            }
        }

        return sheet;
    }

    entryYearRange(sheet){
        sheet.yearRangeForEachEntry = [];
        let placeholder = [];

        for (let i = 0; i < sheet.numberOfEntries; i++){
            for (let j = 1; j < sheet.endYears[i] +1; j++) {
                placeholder.push(j);
            }
            sheet.yearRangeForEachEntry.push(placeholder);
            placeholder = [];
        }

        return sheet;
    }

    addArrayOfNumberedYearsForGraph(sheet){
        sheet.yearsNumbered = [];

            for (let i = 0; i <= (this.graphMaxNumberOfYears - 1); i++){
                sheet.yearsNumbered.push("Year " + (i + 1));
            }

        return sheet;
    }

    runningSumEachEntry(sheet){
        sheet.runningSumsByYear = []
        let placeholder = [];

        for (let i = 0; i < sheet.numberOfEntries; i++) {
            for (let j = 0; j < sheet.yearRangeForEachEntry[i].length; j++) {
                j > 0 ? placeholder.push(sheet.calculatedAmount[i] + +placeholder[j - 1]) : placeholder.push(sheet.calculatedAmount[i])
            }
            sheet.runningSumsByYear.push(placeholder);
            placeholder = [];
        }

        return sheet;
    }

    finalSumEachEntry(sheet) {
        sheet.finalSums = [];
        let sum = 0;

        for (let i = 0; i < sheet.numberOfEntries; i++) {
            sheet.finalSums.push(sheet.runningSumsByYear[i].at(-1));
        }

        return sheet;
    }
}


export default ExpenseDataHandler;