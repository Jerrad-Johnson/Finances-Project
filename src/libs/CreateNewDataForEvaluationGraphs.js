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
        this.taxesOnIncomeOnly = this.getIncomeTaxData(income, employmentState, filingStatusState, stTaxState, taxYearState)
        this.taxesOnIncomeAndInvestmentIncreases = this.combineIncomeAndInvestmentIncreases(this.income, this.investments, employmentState, filingStatusState, stTaxState, taxYearState);
        this.newGraphData = this.addNewData(this.income, this.expenses, this.investments, this.taxesOnIncomeOnly, this.taxesOnIncomeAndInvestmentIncreases);
        this.employmentState = employmentState;
        this.filingState = filingStatusState;
        this.taxYearState = taxYearState;
        this.arrayOfZeros = createArrayOfZeros(this.length);
    }

    makeExpenses(){
        let x = [];
        let y = {};

        if (isObject(this.expenses)
            && this.expenses.combinedSumByYear){
            y = this.addGraphNecessities(this.expenses.combinedSumByYear, "General Expenses", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (Array.isArray(this.taxesOnIncomeAndInvestmentIncreases?.totalTaxes)
            && JSON.stringify(this.taxesOnIncomeAndInvestmentIncreases?.totalTaxes) !== JSON.stringify(this.arrayOfZeros)
            && isObject(this.investments)){
            y = this.addGraphNecessities(this.taxesOnIncomeAndInvestmentIncreases.totalTaxes, "Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        } else if (Array.isArray(this.taxesOnIncomeOnly?.totalTaxes)
            && isObject(this.income)
            && JSON.stringify(this.taxesOnIncomeAndInvestmentIncreases?.totalTaxes) !== JSON.stringify(this.arrayOfZeros)){
            y = this.addGraphNecessities(this.taxesOnIncomeOnly.totalTaxes, "Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.initialAndAdditionalInvestments
            && JSON.stringify(this.newGraphData?.initialAndAdditionalInvestments) !== JSON.stringify(this.arrayOfZeros)){
            y = this.addGraphNecessities(this.newGraphData.initialAndAdditionalInvestments, "Investments", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.combinedExpensesFromInvestmentsTaxesAndGeneral){
            y = this.addGraphNecessities(this.newGraphData.combinedExpensesFromInvestmentsTaxesAndGeneral, "Total Expenses", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "Investment expenses includes initial investments and additional investments, but not re-investments.";
        return x;
    }

    makeRunningIncomeSumsAndYearlyExpenses() {
        let x = [];
        let y = {};

        if (!isEmptyArray(this.income) || !isEmptyArray(this.investments)){
            y = this.addGraphNecessities(this.newGraphData.runningLiquidAssetsAfterExpenses, "Liquid Assets after same-year expenses", "#00ff00"); //TODO shorten this title after implementing description
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (!isEmptyArray(this.newGraphData?.combinedExpenses)
            && Array.isArray(this.newGraphData?.combinedExpenses)
            && JSON.stringify(this.newGraphData?.combinedExpenses) !== JSON.stringify(this.arrayOfZeros)) {

            y = this.addGraphNecessities(this.newGraphData.combinedExpenses, "Expenses by Year", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "Liquid Assets are after same-year expenses";

        cc(this.taxesOnIncomeAndInvestmentIncreases)
        return x;
    }

   makeSameYearExpendable(){
        let x = [];
        let y = {};

        if (this.newGraphData?.yearlyLiquidAfterExpenses){
            y = this.addGraphNecessities(this.newGraphData.yearlyLiquidAfterExpenses, "Same Year Expendable", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.yearlyLiquidAssetsIn){
            y = this.addGraphNecessities(this.newGraphData.yearlyLiquidAssetsIn, "Income by Year", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.combinedExpenses){
            y = this.addGraphNecessities(this.newGraphData?.combinedExpenses, "Expenses by Year", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }
        return x;
    }

    makeTaxesByCategory(){
        let x = [];
        let y = {};
        let taxesCategory = "";
        if (isObject(this.investments) || isObject(this.income)){
            !isObject(this.investments) ? taxesCategory = "taxesOnIncomeOnly" : taxesCategory = "taxesOnIncomeAndInvestmentIncreases";
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.stateTaxSums)){
            y = this.addGraphNecessities(this[taxesCategory].stateTaxSums, "State Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.federalIncomeTax)){
            y = this.addGraphNecessities(this[taxesCategory].federalIncomeTax, "Federal Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.ficaTaxSums?.medicare)){
            y = this.addGraphNecessities(this[taxesCategory].ficaTaxSums.medicare, "Medicare Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.ficaTaxSums?.socSec)){
            y = this.addGraphNecessities(this[taxesCategory].ficaTaxSums.socSec, "SS Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.totalTaxes)){
            y = this.addGraphNecessities(this[taxesCategory].totalTaxes, "Total Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        return x;
    }

    makeTotalAssetsLiquidAndIlliquid(){
        let x = [];
        let y = {};

        if (!isEmptyArray(this.income) || !isEmptyArray(this.investments)){
            y = this.addGraphNecessities(this.newGraphData.runningLiquidAssetsAfterExpenses, "Liquid Assets", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (!isEmptyArray(this.investments)
            && JSON.stringify(this.newGraphData?.runningIlliquidAssets) !== JSON.stringify(this.arrayOfZeros)){

            y = this.addGraphNecessities(this.newGraphData.runningIlliquidAssets, "Illiquid Assets", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (Array.isArray(this.newGraphData?.combinedRunningAssetsLiquidAndIlliquid)
            && JSON.stringify(this.newGraphData?.combinedRunningAssetsLiquidAndIlliquid) !== JSON.stringify(this.arrayOfZeros)){

            y = this.addGraphNecessities(this.newGraphData.combinedRunningAssetsLiquidAndIlliquid, "Total Assets", "#0000ff");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "blah";
        return x;
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
            //this.combineObjectArraySums(investments, "arrayPullValueByYear", "arrayCombinedPullValuesByYear", length);
            //this.combineInvestmentsAndAdlInvestments(income, investments);
        }

        return investments;
    }

    addNewData(income, expenses, investments, taxesOnIncomeOnly, taxesOnIncomeAndInvestmentIncreases){
        let newData = {};

        if (isObject(income) && isObject(investments)){
            newData = this.addYearlyLiquidAssetsIn(newData, income, investments);
        } else if (isObject(income)){
            newData = this.addYearlyLiquidAssetsIn(newData, income, []);
        } else if (isObject(investments)){
            newData = this.addYearlyLiquidAssetsIn(newData, [], investments);
        }

        if (isObject(investments)){
            newData = this.addrunningIlliquidAssets(newData, investments);
        }

        if (isObject(expenses) || this.taxesOnIncomeAndInvestmentIncreases){
            newData = this.addCombinedExpenses(newData, expenses, taxesOnIncomeAndInvestmentIncreases, investments);
        }


        if (isObject(expenses) && isObject(this.taxesOnIncomeOnly)){
            newData = this.addCombinedExpensesMinusInvestmentData(newData, expenses, taxesOnIncomeOnly);
        }

        if (newData.yearlyLiquidAssetsIn && newData.combinedExpenses){
            newData = this.addrunningLiquidAssetsAfterExpenses(newData);
        }

        if (newData.runningLiquidAssetsAfterExpenses && newData.runningIlliquidAssets){
            newData = this.addcombinedRunningAssetsLiquidAndIlliquid(newData);
        }

        if (newData.combinedExpensesMinusInvestmentData){
           newData = this.addYearlyLiquidAfterExpensesMinusInvestmentData(newData, taxesOnIncomeOnly, income);
        }

        if (newData.yearlyLiquidAssetsIn && newData.combinedExpenses){
            newData = this.addYearlyLiquid(newData);
        }

        if (isObject(investments)){
            newData = this.addInitialAndAdditionalInvestments(newData, investments);
        }

        if (isObject(expenses || income || investments)){
            newData = this.addCombinedExpensesFromInvestmentsTaxesAndGeneral(newData, investments, expenses, taxesOnIncomeOnly, taxesOnIncomeAndInvestmentIncreases, income);
        }

        return newData;
    }

    addYearlyLiquidAssetsIn(newData, income, investments){
        newData.yearlyLiquidAssetsIn = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++){
            if (!isEmptyArray(income) && !isEmptyArray(investments)) {
                newData.yearlyLiquidAssetsIn[i] = income.sumByYear[i] + investments.arrayPullValueByYearPlusWithdrawl[i];
            } else if (!isEmptyArray(income)) {
                newData.yearlyLiquidAssetsIn[i] = income.sumByYear[i];
            } else if (!isEmptyArray(investments)) {
                newData.yearlyLiquidAssetsIn[i] = investments.arrayPullValueByYearPlusWithdrawl[i];
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

    addCombinedExpensesMinusInvestmentData(newData, expenses, taxesOnIncomeOnly){
        newData.combinedExpensesMinusInvestmentData = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++){
            newData.combinedExpensesMinusInvestmentData[i] = expenses.combinedSumByYear[i] + taxesOnIncomeOnly.totalTaxes[i]
        }

        return newData;
    }

    addrunningLiquidAssetsAfterExpenses(newData){
        newData.runningLiquidAssetsAfterExpenses = createArrayOfZeros(this.length);

        newData.runningLiquidAssetsAfterExpenses[0] = (newData.yearlyLiquidAssetsIn?.[0] || 0) - (newData.combinedExpenses?.[0] || 0);

        for (let i = 1; i < this.length; i++){
            newData.runningLiquidAssetsAfterExpenses[i] = (newData.runningLiquidAssetsAfterExpenses?.[i -1] || 0) + (newData.yearlyLiquidAssetsIn?.[i] || 0) - (newData.combinedExpenses?.[i] || 0);
        }

        return newData;
    }

    addrunningIlliquidAssets(newData, investments){
        newData.runningIlliquidAssets = createArrayOfZeros(this.length);

        for (let j = 0; j < investments.arrayRunningInvestmentValue.length; j++){
            for (let i = 0; i < this.length; i++){
                newData.runningIlliquidAssets[i] = newData.runningIlliquidAssets[i]
                + (investments.arrayRunningInvestmentValue[j][i] || 0);
            }
        }

        return newData;
    }

    addcombinedRunningAssetsLiquidAndIlliquid(newData){
        newData.combinedRunningAssetsLiquidAndIlliquid = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++) {
            newData.combinedRunningAssetsLiquidAndIlliquid[i]
                = (newData.runningLiquidAssetsAfterExpenses[i] || 0)
                + (newData.runningIlliquidAssets[i] || 0);
        }

        return newData;
    }

    addYearlyLiquidAfterExpensesMinusInvestmentData(newData, taxesOnIncomeOnly, income){
        newData.yearlyLiquidAfterExpensesMinusInvestmentData = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++) {
            newData.yearlyLiquidAfterExpensesMinusInvestmentData[i]
                = income.sumByYear[i] - newData.combinedExpensesMinusInvestmentData[i];
        }

        return newData;
    }

    addYearlyLiquid(newData){
        newData.yearlyLiquidAfterExpenses = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++) {
            newData.yearlyLiquidAfterExpenses[i]
            = newData.yearlyLiquidAssetsIn[i]
            - newData.combinedExpenses[i];
        }

        return newData;
    }

    addInitialAndAdditionalInvestments(newData, investments){
        newData.initialAndAdditionalInvestments = createArrayOfZeros(this.length);
        newData.initialAndAdditionalInvestments = combineSinglePropertySubArrays(investments.arrayAdditionalInvestment, this.length);

        for (let i = 0; i < investments.amounts.length; i++) {
            newData.initialAndAdditionalInvestments[investments.yearsBegin[i]] += investments.amounts[i];
        }

        return newData;
    }

    addCombinedExpensesFromInvestmentsTaxesAndGeneral(newData, investments, expenses, taxesOnIncomeOnly, taxesOnIncomeAndInvestmentIncreases, income){
        newData.combinedExpensesFromInvestmentsTaxesAndGeneral = createArrayOfZeros(this.length);
        let taxes = createArrayOfZeros(this.length);

        if (isObject(investments) || isObject(income)){
            isObject(investments) ? taxes = taxesOnIncomeAndInvestmentIncreases.totalTaxes : taxes = taxesOnIncomeOnly.totalTaxes;
        }

        for (let i = 0; i < this.length; i++) {
            newData.combinedExpensesFromInvestmentsTaxesAndGeneral[i]
            = (expenses?.combinedSumByYear?.[i] || 0)
            + (newData?.initialAndAdditionalInvestments?.[i] || 0)
            + (taxes[i] || 0)
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

    addGraphNecessities(arrayValues, sheetType, color = "#00FF00"){
        let y = {};

        y.data = arrayValues;
        y.name = sheetType;
        y.colors = color;

        return y;
    }

    addThisEntryToArray(x, y){
        if (!isEmptyObject(y)) x.push(y);
        y = {};

        return [x, y];
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
        arrs[newKey] = createArrayOfZeros(length);

        for (let j = 0; j < arrs[oldKey].length; j++){
            for (let i = 0; i < length; i++) {
                isNumeric(arrs[oldKey][j].data?.[i])
                ? arrs[newKey][i] = +arrs[newKey][i] + +arrs[oldKey][j].data[i]
                : arrs[newKey][i] = +arrs[newKey][i] + +arrs[oldKey][j][i];
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

    standardGraphDataCheck(arr){

        return (Array.isArray(arr)
            && !isEmptyArray(arr)
            && JSON.stringify(arr) !== JSON.stringify(this.arrayOfZeros));
    }

    logData(){
        //cc(this.income)
        //cc(this.expenses)
        //cc(this.investments)
        /*cc(this.taxesOnIncomeAndInvestmentIncreases)
        cc(this.taxesOnIncomeOnly)*/
        //cc(this.newGraphData)
    }
}

export default CreateNewDataForEvaluationGraphs;