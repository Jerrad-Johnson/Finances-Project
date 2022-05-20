import jobdatahandler from "./jobdatahandler";

class CreateNewDataForEvaluationGraphs {
    constructor(income, expenses, investments, taxes = []) {
        this.income = this.makeLinearAndSteppedJobKeyNamingConsistent(income);
        this.expenses = expenses;
        this.investments = investments;
        this.taxes = taxes;
        this.cc = console.dir;
        this.length = new jobdatahandler();
        this.length = this.length.graphMaxNumberOfYears;
    }

    begin() {
        let ck = this.checkIfEmptyArray;
        let newGraphData = {};
        newGraphData.yearlyInPocket = this.makeYearlyInPocketGraphData(this.income, this.expenses, this.investments);
        this.cc(newGraphData.yearlyInPocket)

        return {};
    }

    makeYearlyInPocketGraphData(income, expenses, investments) {
        let x = [];
        let y = {};
        y.colors = ["#ff0000", "#00ff00", "#0000ff"];

        if (this.isObject(income)) {
            y.data = this.income.sumByYear;
            y.name = "Income"
            x.push(y);
            y = {};
        }

        if (this.isObject(investments)) {
            y.data = this.combineSinglePropertyArrays(investments.arrayPullValueByYear); // TODO Add withdraw
            y.name = "Investment"
            x.push(y);
            y = {};
        }

        if (this.isObject(expenses)) {
            y.data = this.combineMultiplePropertyArrays(expenses.graphSumObject); // TODO Add investment expense
            y.name = "Expense"
            x.push(y);
            y = {};
        }

        return x;
    }

    makeLinearAndSteppedJobKeyNamingConsistent(oldIncomeData) {
        let newIncomeData = {};
        newIncomeData.sumByYear = oldIncomeData.incomeInGraphYearsNumberOfSteps || oldIncomeData.salaryAmounts;
        newIncomeData.runningSumByYear = oldIncomeData.sumIncomeByYear || oldIncomeData.salarySumByYear;
        newIncomeData.sum = oldIncomeData.sum;
        newIncomeData.title = oldIncomeData.title;

        return newIncomeData
    }

    combineSinglePropertyArrays(financialDataProperty) {
        let x = [];

        for (let j = 0; j < this.length; j++) {
            x[j] = 0;
        }

        for (let i = 0; i < financialDataProperty.length; i++) {
            for (let j = 0; j < this.length; j++) {
                x[j] = x[j] + financialDataProperty[i][j];
            }
        }

        return x;
    }

    combineMultiplePropertyArrays(financialDataProperties) {
        let x = [];

        for (let j = 0; j < this.length; j++) {
            x[j] = 0;
        }

        for (let i = 0; i < financialDataProperties.length; i++) {

            for (let j = 0; j < this.length; j++) {
                x[j] = x[j] + financialDataProperties[i].data[j];
            }
        }

        return x;
    }

    isObject(x) {
        return (typeof x === 'object' && !Array.isArray(x) && x !== null)
    }

    checkIfEmptyArray(x) {
        return (Array.isArray(x) && x.length === 0);
    }
}

export default CreateNewDataForEvaluationGraphs;