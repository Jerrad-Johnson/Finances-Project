import jobdatahandler from "./jobdatahandler";
import {isNumeric} from "../components/jobssharedfunctions";

class CreateNewDataForEvaluationGraphs {
    constructor(income, expenses, investments, taxes = []) {
        this.cc = console.dir;
        this.income = income;
        this.expenses = expenses;
        this.investments = investments;
        this.taxes = taxes;
        this.length = new jobdatahandler().graphMaxNumberOfYears;
        this.colors = ["#ff0000", "#00ff00", "#0000ff"]
    }

    begin(){
        let ck = this.checkIfEmptyArray;
        this.income = this.makeLinearAndSteppedJobKeyNamingConsistent(this.income);
        this.expenses = this.combineExpenseSums(this.expenses);

        let newGraphData = {};
        newGraphData.yearlyInPocket = this.makeYearlyInPocket(this.income, this.expenses, this.investments);
        //newGraphData.runningSums = this.makeRunningSums(this.income, this.expenses, this.investments);

        return newGraphData;
    }

    makeYearlyInPocket(income, expenses, investments){
        let x = [];
        let y = {};

        if (this.isObject(income)){
            y = this.addGraphNecessities(income.sumByYear, "Income", this.colors[0])
            x.push(y);
            y = {};
        }

        if (this.isObject(expenses)){
            y = this.addGraphNecessities(expenses.combinedSumByYear, "Expenses", this.colors[2])
            x.push(y);
            y = {};
        }

        if (this.isObject(investments)){
            y = this.addGraphNecessities(investments.arrayPullValueByYear, "Investment Pulls", this.colors[1])
            x.push(y);
            y = {};
        }
        return x;
    }

    addGraphNecessities(arrayValues, sheetType, color){
        let y = {};

        y.data = arrayValues;
        y.name = sheetType;
        y.colors = color;

        return y;
    }

    makeLinearAndSteppedJobKeyNamingConsistent(oldIncomeData){
        let newIncomeData = {};
        newIncomeData.sumByYear = oldIncomeData.incomeInGraphYearsNumberOfSteps || oldIncomeData.salaryAmounts;
        newIncomeData.runningSumByYear = oldIncomeData.sumIncomeByYear || oldIncomeData.salarySumByYear;
        newIncomeData.sum = oldIncomeData.sum;
        newIncomeData.title = oldIncomeData.title;

        return newIncomeData
    }

    combineExpenseSums(expenses){
        expenses.combinedSumByYear = [];

        for (let j = 0; j < expenses.graphSumObject.length; j++){
            for (let i = 0; i < this.length; i++) {
                if (isNumeric(expenses.combinedSumByYear[i])){
                    expenses.combinedSumByYear[i] = expenses.combinedSumByYear[i] + expenses.graphSumObject[j].data[i];
                } else {
                    expenses.combinedSumByYear[i] = expenses.graphSumObject[j].data[i];
                }
            }
        }

        return expenses
    }

    combineSinglePropertyArrays(financialDataProperty){
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

    combineMultiplePropertyArrays(financialDataProperties){
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

    isObject(x){
        return (typeof x === 'object' && !Array.isArray(x) && x !== null)
    }

    checkIfEmptyArray(x) {
        return (Array.isArray(x) && x.length === 0);
    }
}

export default CreateNewDataForEvaluationGraphs;