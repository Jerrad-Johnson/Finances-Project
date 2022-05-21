import jobdatahandler from "./jobdatahandler";
import {applyRoundingSingleDepthArray, cc, createArrayOfZeros, isNumeric} from "../components/jobssharedfunctions";
import expenses from "../Expenses";
import CalculateTaxes from "./Taxes";
import investments from "../Investments";

class CreateNewDataForEvaluationGraphs {
    constructor(income, expenses, investments, taxes = [], employmentState = [],
                filingStatusState = [], stTaxState = [], taxYearState = 22) {
        this.cc = console.dir;
        this.income = this.addValuesToIncome(income);
        this.expenses = this.addValuesToExpenses(expenses);
        this.investments = this.addValuesToInvestments(investments);
        this.taxesOnIncomeOnly = taxes;
        this.taxesOnIncomeAndInvestmentIncreases = this.combineIncomeAndInvestmentIncreases(this.income, this.investments, employmentState, filingStatusState, stTaxState, taxYearState);
        this.newGraphData = this.addNewData(this.income, this.expenses, this.investments, this.taxesOnIncomeOnly);
        this.length = new jobdatahandler().graphMaxNumberOfYears;
        this.colors = ["#ff0000", "#00ff00", "#0000ff"]
    }


    makeYearlyInPocket(){
        let x = [];
        let y = {};

        //this.cc(this.investments)
        /*
        this.cc(this.taxesOnIncomeOnly);*/

        y = this.addIncomeData(this.income, this.income?.sumByYear);
        if (!this.isEmptyObject(y)) x.push(y); y = {};

        y = this.addExpenseData(this.expenses, this.expenses.combinedSumByYear);
        if (!this.isEmptyObject(y)) x.push(y); y = {};

        y = this.addInvestmentData(this.investments, this.investments.arrayPullValueByYearPlusWithdrawl, "Investment Pulls");
        if (!this.isEmptyObject(y)) x.push(y); y = {};

     /*   this.cc(this.income);
        this.cc(this.expenses);
        this.cc(this.investments);
        this.cc(this.taxes);*/

        return x;
    }

    addIncomeData(income, incomeValueArray, sheetType = "Income"){
        if (this.isObject(income)){
           return this.addGraphNecessities(incomeValueArray, sheetType, this.colors[0]);
        }
    }

    addInvestmentData(investment, investmentValueArray, sheetType = "Investment"){
        if (this.isObject(investment)){
            return this.addGraphNecessities(investmentValueArray, sheetType, this.colors[1]);
        }
    }

    addExpenseData(expense, expenseValueArray, sheetType = "Expenses"){
        if (this.isObject(expense)){
            return this.addGraphNecessities(expenseValueArray, sheetType, this.colors[2]);
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
            expenses = this.combineSums(expenses, "graphSumObject", "combinedSumByYear");
        }

        return expenses;
    }

    addValuesToInvestments(investments){
        if (this.isObject(investments)) {
            this.combineSums(investments, "arrayPullValueByYear", "arrayCombinedPullValuesByYear");
            this.combineInvestmentsAndAdlInvestments(investments);
        }

        return investments;
    }

    addNewData(income, expenses, investments, taxes){
        let newData = {};

        //newData.expensesWithTaxes = this.addValuesInTwoArrays(income.sumByYear, expenses.sumByYear);

    }

    addValuesInTwoArrays(a, b){
        let length = a.length;
        let newArr = [];

        for (let i = 0; i < length; i++){
            newArr[i] = a[i] + b[i];
        }

        return newArr;
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

    combineIncomeAndInvestmentIncreases(income, investments, employmentState, filingStatusState, stTaxState, taxYearState){
        let length = new jobdatahandler().graphMaxNumberOfYears;
        let investmentProfits = this.combineSinglePropertyArrays(this.investments.arrayInvestmentIncreaseByYearMinusAllYearAdlInvestment);
        let incomeTogether = [];
        incomeTogether.push(income.sumByYear);
        incomeTogether.push(investmentProfits);
        let incomeCombined = [];

        for (let j = 0; j < incomeTogether.length; j++){
            for (let i = 0; i < length; i++){
                if (isNumeric(incomeCombined[i])) {
                    incomeCombined[i] = incomeCombined[i] + incomeTogether[j][i];
                } else {
                    incomeCombined[i] = incomeTogether[j][i];
                }
            }
        }

        let x = new CalculateTaxes(incomeCombined, employmentState, filingStatusState, stTaxState, taxYearState).federalCalculations();

        return x;
    }

    combineInvestmentsAndAdlInvestments(investments){
        let moneyInvested = this.combineSinglePropertyArrays(investments.arrayAdditionalInvestment);

        for (let i = 0; i < investments.amounts.length; i++){
            moneyInvested[investments.yearsBegin[i] -1] = moneyInvested[investments.yearsBegin[i] -1] + investments.amounts[i];
        }

        return moneyInvested;
    }


    combineSums(arrs, oldKey, newKey){
        let length = new jobdatahandler().graphMaxNumberOfYears;
        arrs[newKey] = [];

        for (let j = 0; j < arrs[oldKey].length; j++){
            for (let i = 0; i < length; i++) {
                if (isNumeric(arrs[newKey][i])){
                    arrs[oldKey][j].data?.[i]
                    ? arrs[newKey][i] = arrs[newKey][i] + arrs[oldKey][j].data[i]
                    : arrs[newKey][i] = arrs[newKey][i] + arrs[oldKey][j][i];
                } else {
                    arrs[oldKey][j].data?.[i]
                    ? arrs[newKey][i] = arrs[oldKey][j].data[i]
                    : arrs[newKey][i] = arrs[oldKey][j][i];
                }
            }
        }

        return arrs;
    }

    combineSinglePropertyArrays(financialDataProperty){
        let length = new jobdatahandler().graphMaxNumberOfYears;
        let x = [];


        for (let j = 0; j < length; j++) {
            x[j] = 0;
        }

        for (let i = 0; i < financialDataProperty.length; i++) {
            for (let j = 0; j < length; j++) {
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