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
        sheet = this.addArrayOfNumberedYears(sheet);


        //for (let i = 0; i < length; i++){
        //}
        this.entryYearRange(sheet);


        //this.cc(sheet)
        return sheet;
    }

    convertMonthlyExpenseToYearly(sheet){
        for (let i = 0; i < sheet.numberOfEntries; i++){
            if (sheet.frequency[i] == 'mo'){
                this.cc(5);
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

    addArrayOfNumberedYears(sheet){
        sheet.yearsNumbered = [];

            for (let i = 0; i <= (this.graphMaxNumberOfYears - 1); i++){
                sheet.yearsNumbered.push("Year " + (i + 1));
            }

        return sheet;
    }

}



export default ExpenseDataHandler;