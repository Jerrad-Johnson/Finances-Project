import jobdatahandler from "./jobdatahandler";
import {
    cc,
    combineSinglePropertySubArrays,
    isNumeric,
    isObject,
    isEmptyObject,
    isEmptyArray,
    createArrayOfZeros
} from "../components/jobssharedfunctions";
import expenses from "../Expenses";
import CalculateTaxes from "./Taxes";
import investments from "../Investments";

class CreateNewDataForEvaluationGraphs {
    constructor(income, expenses, investments, employmentState = [],
                filingStatusState = [], stTaxState = [], taxYearState = 22) {
        this.length = new jobdatahandler().graphMaxNumberOfYears;
        this.cc = console.dir;
        this.income = this.addValuesToIncome(income, expenses, investments, this.length);
        this.expenses = this.addValuesToExpenses(income, expenses, investments, this.length);
        this.investments = this.addValuesToInvestments(income, expenses, investments, this.length);
        this.taxesOnIncomeOnly = this.getIncomeTaxData(income, employmentState, filingStatusState, taxYearState)
        this.taxesOnIncomeAndInvestmentIncreases = this.combineIncomeAndInvestmentIncreases(this.income, this.investments, employmentState, filingStatusState, stTaxState, taxYearState);
        this.newGraphData = this.addNewData(this.income, this.expenses, this.investments, this.taxesOnIncomeOnly, this.taxesOnIncomeAndInvestmentIncreases);
        this.employmentState = employmentState;
        this.filingState = filingStatusState;
        this.taxYearState = taxYearState;
        this.arrayOfZeros = createArrayOfZeros(this.length);
        this.colors = ["#ff0000", "#00ff00", "#0000ff"]
    }


    makeYearlyInPocket(){
        let x = [];
        let y = {};

        y = this.addIncomeData(this.income, this.income?.sumByYear, this.investments);
        if (!isEmptyObject(y)) x.push(y); y = {};

        y = this.addExpenseData(this.expenses, this.expenses.combinedSumByYear);
        if (!isEmptyObject(y)) x.push(y); y = {};

        y = this.addInvestmentData(this.investments, this.investments.arrayPullValueByYearPlusWithdrawl, "Investment Pulls");
        if (!isEmptyObject(y)) x.push(y); y = {};

        return x;
    }

    makeRunningIncomeSumsAndYearlyExpenses() {
        let x = [];
        let y = {};

        if (!isEmptyArray(this.income) || !isEmptyArray(this.investments)){
            y = this.addIncomeData(this.newGraphData, this.newGraphData.liquidAssetsAfterExpenses, "Liquid Assets");
            if (!isEmptyObject(y)) x.push(y);
            y = {};
        }

        if (!isEmptyArray(this.newGraphData?.combinedExpenses) && Array.isArray(this.newGraphData?.combinedExpenses)
            && JSON.stringify(this.newGraphData?.combinedExpenses) !== this.arrayOfZeros) {

            y = this.addExpenseData(this.newGraphData, this.newGraphData.combinedExpenses, "Expenses by Year");
            if (!isEmptyObject(y)) x.push(y);
            y = {};
        }

        /*cc(this.income)
        cc(this.expenses)
        cc(this.investments)
        cc(this.taxesOnIncomeAndInvestmentIncreases)
        cc(this.newGraphData)*/

        x.explanation = "blah";
        return x;
    }

    makeTotalAssetsLiquidAndIlliquid(){
        let x = [];
        let y = {};

        if (!isEmptyArray(this.income) || !isEmptyArray(this.investments)){
            y = this.addIncomeData(this.newGraphData, this.newGraphData.liquidAssetsAfterExpenses, "Liquid Assets");
            if (!isEmptyObject(y)) x.push(y);
            y = {};
        }

        if (!isEmptyArray(this.investments) && JSON.stringify(this.newGraphData?.illiquidAssets) !== this.arrayOfZeros){
            y = this.addIncomeData(this.newGraphData, this.newGraphData.illiquidAssets, "Illiquid Assets");
            if (!isEmptyObject(y)) x.push(y);
            y = {};
        }

        if (Array.isArray(this.newGraphData?.combinedAssetsLiquidAndIlliquid)
            && JSON.stringify(this.newGraphData?.combinedAssetsLiquidAndIlliquid) !== this.arrayOfZeros){
            y = this.addIncomeData(this.newGraphData, this.newGraphData.combinedAssetsLiquidAndIlliquid, "Total Assets");
            if (!isEmptyObject(y)) x.push(y);
            y = {};
        }

        return x;
    }

    addIncomeData(income, incomeValueArray, sheetType = "Income", investments){
        if (isObject(income) || isObject(investments)){
           return this.addGraphNecessities(incomeValueArray, sheetType, this.colors[0]);
        }
    }

    addInvestmentData(investment, investmentValueArray, sheetType = "Investment"){
        if (isObject(investment)){
            return this.addGraphNecessities(investmentValueArray, sheetType, this.colors[1]);
        }
    }

    addExpenseData(expense, expenseValueArray, sheetType = "Expenses"){
        if (isObject(expense)){
            return this.addGraphNecessities(expenseValueArray, sheetType, this.colors[2]);
        }
    }

    addValuesToIncome(income, expenses, investments, length){
        if (isObject(income)) {
            income = this.makeLinearAndSteppedJobKeyNamingConsistent(income);
        }

        return income;
    }

    addValuesToExpenses(income, expenses, investments, length){
        if (isObject(expenses)) {
            expenses = this.combineObjectArraySums(expenses, "graphSumObject", "combinedSumByYear", length);
        }

        return expenses;
    }

    addValuesToInvestments(income, expenses, investments, length){
        if (isObject(investments)) {
            this.combineObjectArraySums(investments, "arrayPullValueByYear", "arrayCombinedPullValuesByYear", length);
            this.combineInvestmentsAndAdlInvestments(income, investments);
        }

        return investments;
    }

    addNewData(income, expenses, investments, taxesOnIncomeOnly, taxesOnIncomeAndInvestmentIncreases){
        let newData = {};

        if (isObject(income) && isObject(investments)){
            newData = this.addLiquidAssetsIn(newData, income, investments);
        } else if (isObject(income)){
            newData = this.addLiquidAssetsIn(newData, income, []);
        } else if (isObject(investments)){
            newData = this.addLiquidAssetsIn(newData, [], investments);
        }

        if (isObject(investments)){
            newData = this.addIlliquidAssets(newData, investments);
        }

        if (isObject(expenses) || this.taxesOnIncomeAndInvestmentIncreases){
            newData = this.addCombinedExpenses(newData, expenses, taxesOnIncomeAndInvestmentIncreases, investments);
        }

        if (newData.liquidAssetsIn && newData.combinedExpenses){
            newData = this.addLiquidAssetsAfterExpenses(newData);
        }

        if (newData.liquidAssetsAfterExpenses && newData.illiquidAssets){
            newData = this.addCombinedAssetsLiquidAndIlliquid(newData);
        }

        return newData;
        //newData.expensesWithTaxes = this.addValuesInTwoArrays(income.sumByYear, expenses.sumByYear);
    }

    addLiquidAssetsIn(newData, income, investments){
        newData.liquidAssetsIn = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++){
            if (!isEmptyArray(income) && !isEmptyArray(investments)) {
                newData.liquidAssetsIn[i] = income.sumByYear[i] + investments.arrayPullValueByYearPlusWithdrawl[i];
            } else if (!isEmptyArray(income)) {
                newData.liquidAssetsIn[i] = income.sumByYear[i];
            } else if (!isEmptyArray(investments)) {
                newData.liquidAssetsIn[i] = investments.arrayPullValueByYearPlusWithdrawl[i];
            }
        }

        return newData;
    }

    addCombinedExpenses(newData, expenses, taxesOnIncomeAndInvestmentIncreases = [], investments = []){
        let additionalInvestmentsByYear = createArrayOfZeros(this.length)
        if (!isEmptyArray(investments)) additionalInvestmentsByYear = combineSinglePropertySubArrays(investments.arrayAdditionalInvestment, this.length);
        newData.combinedExpenses = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++) {
            newData.combinedExpenses[i]
                = (expenses?.combinedSumByYear?.[i] || 0)
                + ((taxesOnIncomeAndInvestmentIncreases?.incomeBeforeTaxes?.[i] || 0)
                - (taxesOnIncomeAndInvestmentIncreases?.incomeAfterFederalTaxes?.[i] || 0)
                + (additionalInvestmentsByYear?.[i] || 0));
        }

        if (!isEmptyArray(investments)){
            for (let i = 0; i < investments.amounts.length; i++){
                newData.combinedExpenses[investments.yearsBegin[i] -1] = newData.combinedExpenses[investments.yearsBegin[i] -1] + investments.amounts[i];
            }
        }

        return newData;
    }

    addLiquidAssetsAfterExpenses(newData){
        newData.liquidAssetsAfterExpenses = createArrayOfZeros(this.length);

        newData.liquidAssetsAfterExpenses[0] = (newData.liquidAssetsIn?.[0] || 0) - (newData.combinedExpenses?.[0] || 0);

        for (let i = 1; i < this.length; i++){
            newData.liquidAssetsAfterExpenses[i] = (newData.liquidAssetsAfterExpenses?.[i -1] || 0) + (newData.liquidAssetsIn?.[i] || 0) - (newData.combinedExpenses?.[i] || 0);
        }

        return newData;
    }

    addIlliquidAssets(newData, investments){
        newData.illiquidAssets = createArrayOfZeros(this.length);

        for (let j = 0; j < investments.arrayRunningInvestmentValue.length; j++){
            for (let i = 0; i < this.length; i++){
                newData.illiquidAssets[i] = newData.illiquidAssets[i]
                + (investments.arrayRunningInvestmentValue[j][i] || 0);
            }
        }

        return newData;
    }

    addCombinedAssetsLiquidAndIlliquid(newData){
        newData.combinedAssetsLiquidAndIlliquid = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++) {
            newData.combinedAssetsLiquidAndIlliquid[i]
                = (newData.liquidAssetsAfterExpenses[i] || 0)
                + (newData.illiquidAssets[i] || 0);
        }

        return newData;
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

    getIncomeTaxData(income, employmentStatus, filingStatus, stTax){
        let incomeTaxData = [];

        //if (typeof income === 'object' && !Array.isArray(income) && income !== null){ This seems to be replaced effectively by the next line.
        if (!isEmptyArray(income)){
            incomeTaxData = new CalculateTaxes(income.salaryAmounts || income.incomeInGraphYearsNumberOfSteps, employmentStatus,
                filingStatus, stTax, "22");
            incomeTaxData = incomeTaxData.federalCalculations();
        }
        // TODO In the future, add an input so users can change years.

        return incomeTaxData
    }

    makeLinearAndSteppedJobKeyNamingConsistent(oldIncomeData){
        let newIncomeData = {};
        newIncomeData.sumByYear = oldIncomeData.incomeInGraphYearsNumberOfSteps || oldIncomeData.salaryAmounts;
        newIncomeData.runningSumByYear = oldIncomeData.sumIncomeByYear || oldIncomeData.salarySumByYear;
        newIncomeData.sum = oldIncomeData.sum;
        newIncomeData.title = oldIncomeData.title;

        return newIncomeData
    }

    combineIncomeAndInvestmentIncreases(income, investments, employmentState, filingStatusState, stTaxState, taxYearState) {

        if (!isEmptyArray(income) || !isEmptyArray(investments)) {
            let length = new jobdatahandler().graphMaxNumberOfYears;
            let investmentProfits = createArrayOfZeros(this.length);
            if (!isEmptyArray(investments)) investmentProfits = combineSinglePropertySubArrays(this.investments.arrayInvestmentIncreaseByYearMinusAllYearAdlInvestment, this.length);
            let incomeTogether = [];
            if (!isEmptyArray(income)) incomeTogether.push(income.sumByYear);
            if (!isEmptyArray(investments)) incomeTogether.push(investmentProfits);

            let incomeCombined = [];
            for (let j = 0; j < incomeTogether.length; j++) {
                for (let i = 0; i < length; i++) {
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
    }

    combineInvestmentsAndAdlInvestments(income, investments){
        if (!isEmptyArray(income) && !isEmptyArray(investments)) {

        let moneyInvested = combineSinglePropertySubArrays(investments.arrayAdditionalInvestment, this.length);

        for (let i = 0; i < investments.amounts.length; i++){
            moneyInvested[investments.yearsBegin[i] -1] = moneyInvested[investments.yearsBegin[i] -1] + investments.amounts[i];
        }

        return moneyInvested;
        }
    }


    combineObjectArraySums(arrs, oldKey, newKey, length){
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


}

export default CreateNewDataForEvaluationGraphs;