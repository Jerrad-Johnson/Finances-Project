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
        this.income = this.addValuesToIncome(this.income);
        this.expenses = this.addValuesToExpenses(this.expenses);
        this.investments = this.addValuesToInvestments(this.investments);

        if (this.isObject(this.expenses)) this.expenses = this.combineExpenseSums(this.expenses);

        let newGraphData = {};
        newGraphData.yearlyInPocket = this.makeYearlyInPocket(this.income, this.expenses, this.investments);
        //newGraphData.runningSums = this.makeRunningSums(this.income, this.expenses, this.investments);

        return newGraphData;
    }

    makeYearlyInPocket(income, expenses, investments){
        let x = [];
        let y = {};

        y = this.addIncomeData(income, income?.sumByYear);
        if (!this.isEmptyObject(y)) x.push(y); y = {};

        y = this.addExpenseData(expenses, expenses.combinedSumByYear);
        if (!this.isEmptyObject(y)) x.push(y); y = {};

        y = this.addInvestmentData(investments, investments.arrayPullValueByYear, "Investment Pulls");
        if (!this.isEmptyObject(y)) x.push(y); y = {};

        return x;
    }

    addIncomeData(income, incomeValueArray, sheetType = "Income"){
        if (this.isObject(income)){
           return this.addGraphNecessities(incomeValueArray, sheetType, this.colors[0]);
        }
    }

    addInvestmentData(income, incomeValueArray, sheetType = "Investment"){
        if (this.isObject(income)){
            return this.addGraphNecessities(incomeValueArray, sheetType, this.colors[1]);
        }
    }

    addExpenseData(income, incomeValueArray, sheetType = "Expenses"){
        if (this.isObject(income)){
            return this.addGraphNecessities(incomeValueArray, sheetType, this.colors[2]);
        }
    }

    addValuesToIncome(income){
        if (this.isObject(income)) {
            income = this.makeLinearAndSteppedJobKeyNamingConsistent(income);
        }

        return income;
    }

    addValuesToExpenses(expenses){
        if (this.isObject(expenses)) {
            expenses = this.combineExpenseSums(expenses);
        }

        return expenses;
    }

    addValuesToInvestments(investments){
        if (this.isObject(investments)) {

        }

        return investments;
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

    isEmptyObject(obj) {
        if (this.isObject(obj)) {
            return Object.keys(obj).length === 0;
        } else {
            return true;
        }
    }

    checkIfEmptyArray(x) {
        return (Array.isArray(x) && x.length === 0);
    }
}

export default CreateNewDataForEvaluationGraphs;