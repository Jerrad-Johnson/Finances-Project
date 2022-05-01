import Jobdatahandler from "./jobdatahandler";

class ExpenseDataHandler{
    constructor(expenseData) {
        this.expenseData = expenseData;
        this.cc = console.log;
        this.graphMaxNumberOfYears = new Jobdatahandler();
        this.graphMaxNumberOfYears = this.graphMaxNumberOfYears.graphMaxNumberOfYears;
        this.key = 0;
    }

    beginCalculations(){
        let sheet = this.expenseData;
        sheet.numberOfEntries = sheet.amount.length;
        sheet = this.convertMonthlyExpenseToYearly(sheet);
        //sheet = this.entryYearRange(sheet);
        sheet = this.addArrayOfNumberedYearsForGraph(sheet);
        sheet = this.runningSumEachEntry(sheet);
        sheet = this.finalSumEachEntry(sheet);
        sheet = this.createRunningSumObjectForGraph(sheet);
        sheet = this.createSumObjectForGraph(sheet);
        sheet = this.createYearsForSumEachEntry(sheet);
        sheet = this.finalSumPerExpense(sheet);
        this.cc(sheet);

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


        for (let i = 0; i < sheet.numberOfEntries; i++){
            for (let j = 0; j < this.graphMaxNumberOfYears; j++){
                if ((j+1) < sheet.beginYears[i]){
                    placeholder.push(0);
                } else if ((j) < sheet.endYears[i]) {
                    j > 0 ? placeholder.push(sheet.calculatedAmount[i] + +placeholder[j - 1]) : placeholder.push(sheet.calculatedAmount[i]);
                } else {
                    placeholder.push(placeholder[j - 1]);
                }
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


    createRunningSumObjectForGraph(sheet){
        let x = [];
        sheet.graphRunningSumObject = []

        for (let i = 0; i < sheet.numberOfEntries; i++){
            x = {};
            x.name = sheet.label[i];
            x.data = [];
            for (let j = 0; j < this.graphMaxNumberOfYears; j++){
                x.data.push(sheet.runningSumsByYear[i][j]);
            }
            sheet.graphRunningSumObject[i] = x;
        }
        return sheet;
    }

    createSumObjectForGraph(sheet){
        sheet.graphSumObject = []

        for (let i = 0; i < sheet.numberOfEntries; i++){
            sheet.graphSumObject[i] = {};
            sheet.graphSumObject[i].name = ""
            sheet.graphSumObject[i].name = sheet.label[i];
        }

        return sheet;
    }

    createYearsForSumEachEntry(sheet){
        let x = {};

        for (let i = 0; i < sheet.numberOfEntries; i++){
            x.sumByYear = []
            for (let j = 0; j < this.graphMaxNumberOfYears; j++) {
                if ((j + 1) < sheet.beginYears[i]) {
                    x.sumByYear.push(0);
                } else if ((j+1) > sheet.endYears[i]) {
                    x.sumByYear.push(0);
                } else {
                    x.sumByYear.push(sheet.calculatedAmount[i]);
                }
            }
            sheet.graphSumObject[i].data = x.sumByYear;
        }
        return sheet;
    }

    finalSumPerExpense(sheet){
        sheet.graphSumEachExpense = {};
        let x = {};
        x.data = [];

        for (let i = 0; i < sheet.numberOfEntries; i++){
            x.name = sheet.label[i];
            x.data[i] = sheet.calculatedAmount[i];
            sheet.graphSumEachExpense[i] = x;
            x.data = [];
            x.name = "";

        }

        return sheet;
    }
}

export default ExpenseDataHandler;