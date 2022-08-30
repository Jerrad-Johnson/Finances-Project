import jobdatahandler from "./CareerDataHandler";
import {
    cc,
    combineSinglePropertySubArrays,
    isNumeric,
    isObject,
    isEmptyArray,
    createArrayOfZeros,
    applyRoundingSingleDepthArray,
} from "../utilities/genericFunctions";
import CalculateTaxes from "./TaxesCalculator";

class EvaluationGraphsDataHandler {
    constructor(income, expenses, investments, employmentState = [],
                filingStatusState = [], stTaxState = [], taxYearState = 22) {
        this.inflationRate = 1.038;
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
        console.log(this.income, this.expenses, this.investments, this.taxesOnIncomeAndInvestmentIncreases, this.taxesOnIncomeOnly, this.newGraphData)
    }

    getAllData(){
        return [this.newGraphData, this.expenses, this.taxesOnIncomeAndInvestmentIncreases,
            this.taxesOnIncomeOnly, this.income, this.investments, this.length]
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
            newData = this.addRunningIlliquidAssets(newData, investments);
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
            newData = this.addCombinedRunningAssetsLiquidAndIlliquid(newData);
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

        if (Array.isArray(newData.combinedRunningAssetsLiquidAndIlliquid)){
            newData = this.addAssetsAfterInflation(newData);
        } else if (Array.isArray(newData.runningLiquidAssetsAfterExpenses)){
            newData = this.addAssetsAfterInflation(newData);
        }

        if ((Array.isArray(newData.combinedRunningAssetsLiquidAndIlliquid)
            || Array.isArray(newData.runningLiquidAssetsAfterExpenses))
            && Array.isArray(newData.combinedRunningAssetsAfterInflation)) {
            newData = this.addDifferenceAfterInflation(newData);
        }

        if (isObject(investments)){
            newData = this.addInitialInvestments(newData, investments);
            newData = this.combineAdditionalInvestments(newData, investments);
            newData = this.addReinvestedEachYear(newData, investments);
            newData = this.addCombinedInvestmentExpenses(newData, investments);
            newData = this.addCombinedInvestmentPulls(newData, investments);
            newData = this.addInvestmentCombinedIncomeByYearSansAddlInvestments(newData);
            newData = this.addWithdrawlValues(newData, investments);
        }

        if (isObject(investments) || isObject(income)){
            newData = this.combinedIncome(newData, income || []);
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

    addRunningIlliquidAssets(newData, investments){
        newData.runningIlliquidAssets = createArrayOfZeros(this.length);

        for (let j = 0; j < investments.arrayRunningInvestmentValue.length; j++){
            for (let i = 0; i < this.length; i++){
                newData.runningIlliquidAssets[i] = newData.runningIlliquidAssets[i]
                + (investments.arrayRunningInvestmentValue[j][i] || 0);
            }
        }

        return newData;
    }

    addCombinedRunningAssetsLiquidAndIlliquid(newData){
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

    addAssetsAfterInflation(newData){
        newData.combinedRunningAssetsAfterInflation = createArrayOfZeros(this.length);

        if (newData.combinedRunningAssetsLiquidAndIlliquid){
            newData.combinedRunningAssetsAfterInflation[0] = newData.combinedRunningAssetsLiquidAndIlliquid[0];
        } else if (newData.runningLiquidAssetsAfterExpenses){
            newData.combinedRunningAssetsAfterInflation[0] = newData.runningLiquidAssetsAfterExpenses[0];
        }

        for (let i = 1; i < this.length; i++) {
            if (newData.combinedRunningAssetsLiquidAndIlliquid) {
                newData.combinedRunningAssetsAfterInflation[i]
                = (newData.combinedRunningAssetsLiquidAndIlliquid[i] / this.getPercentageAfterInflation([i]));
            } else if (newData.runningLiquidAssetsAfterExpenses){
                newData.combinedRunningAssetsAfterInflation[i]
                = (newData.runningLiquidAssetsAfterExpenses[i] / this.getPercentageAfterInflation([i]));
            }
        }

        newData.combinedRunningAssetsAfterInflation = applyRoundingSingleDepthArray(newData.combinedRunningAssetsAfterInflation);
        return newData;
    }

    addDifferenceAfterInflation(newData){
        newData.combinedRunningAssetsDifferenceAfterInflation = createArrayOfZeros(this.length);

        for (let i = 1; i < this.length; i++) {
            newData.combinedRunningAssetsDifferenceAfterInflation[i]
            = (newData.combinedRunningAssetsLiquidAndIlliquid?.[i] || newData.runningLiquidAssetsAfterExpenses?.[i])
            - newData.combinedRunningAssetsAfterInflation[i];
        }

        return newData;
    }

    addInitialInvestments(newData, investments){
        newData.initialInvestments = createArrayOfZeros(this.length);

        for (let i = 0; i < investments.amounts.length; i++) {
            newData.initialInvestments[investments.yearsBegin[i] -1] = investments.amounts[i];
        }

        return newData;
    }

    combineAdditionalInvestments(newData, investments){
        newData.combinedAdditionalInvestments = combineSinglePropertySubArrays(investments.arrayAdditionalInvestment, this.length);

        return newData;
    }

    addReinvestedEachYear(newData, investments){
        newData.reinvestedEachYear = createArrayOfZeros(this.length);
        let investmentIncrease = combineSinglePropertySubArrays(investments.arrayInvestmentIncreaseByYearMinusAllYearAdlInvestment, this.length);
        let pullValue = combineSinglePropertySubArrays(investments.arrayPullValueByYear, this.length);

        for (let i = 0; i < this.length; i++){
            newData.reinvestedEachYear[i] = investmentIncrease[i];
        }

        return newData;
    }

    addCombinedInvestmentExpenses(newData, investments) {
        newData.combinedInvestmentExpenses = createArrayOfZeros(this.length);
        newData.combinedInvestmentExpenses = combineSinglePropertySubArrays(investments.arrayAdditionalInvestment, this.length);

        for (let i = 0; i < investments.amounts.length; i++) {
            newData.combinedInvestmentExpenses[investments.yearsBegin[i] -1] += investments.amounts[i]
        }

        for (let i = 0; i < this.length; i++){
            newData.combinedInvestmentExpenses[i] += newData.reinvestedEachYear[i];
        }

        return newData;
    }

    addCombinedInvestmentPulls(newData, investments){
        newData.combinedInvestmentPulls = combineSinglePropertySubArrays(investments.arrayPullValueByYear, this.length);

        return newData;
    }

    addInvestmentCombinedIncomeByYearSansAddlInvestments(newData){
        newData.investmentCombinedIncomeByYearSansAddlInvestments = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++){
            newData.investmentCombinedIncomeByYearSansAddlInvestments[i]
            = newData.combinedInvestmentPulls[i]
            + newData.reinvestedEachYear[i];
        }

        return newData;
    }

    addWithdrawlValues(newData, investments){
        newData.investmentWithdrawlValues = createArrayOfZeros(this.length);

        for (let i = 0; i < investments.yearsWithdraw.length; i++){
            if (investments.yearsWithdraw[i] !== 'Never'){
                newData.investmentWithdrawlValues[investments.yearsWithdraw[i]] = investments.withdrawlValue[i];
            }
        }

        return newData;
    }

    combinedIncome(newData, income){
        newData.combinedIncome = createArrayOfZeros(this.length);

        for (let i = 0; i < this.length; i++){
            newData.combinedIncome[i]
            = (income?.sumByYear?.[i] || 0)
            + (newData.combinedInvestmentPulls?.[i] || 0)
            + (newData.reinvestedEachYear?.[i] || 0)
            + (newData.investmentWithdrawlValues?.[i] || 0);
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
            let investmentIncreases = createArrayOfZeros(this.length);
            let investmentPulls = createArrayOfZeros(this.length);
            let investmentProfits = createArrayOfZeros(this.length);

            if (!isEmptyArray(investments)) {
                investmentIncreases = combineSinglePropertySubArrays(this.investments.arrayInvestmentIncreaseByYearMinusAllYearAdlInvestment, this.length);
                investmentPulls = combineSinglePropertySubArrays(this.investments.arrayPullValueByYear, this.length);
            }

            for (let i = 0; i < this.length; i++){
                investmentProfits[i] = investmentIncreases[i] + investmentPulls[i]
            }

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

    getPercentageAfterInflation(iterations, percentage = 1){
        percentage = (percentage * this.inflationRate);

        if (iterations > 1){
            iterations--
            percentage = this.getPercentageAfterInflation(iterations, percentage);
        }

        return percentage;
    }

    logData(){
        cc(this.income)
        cc(this.expenses)
        cc(this.investments)
        cc(this.taxesOnIncomeAndInvestmentIncreases)
        cc(this.taxesOnIncomeOnly)
        cc(this.newGraphData)
    }
}

export default EvaluationGraphsDataHandler;