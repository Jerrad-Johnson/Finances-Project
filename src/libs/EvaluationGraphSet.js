import {isEmptyArray, isEmptyObject, isObject} from "../utilities/genericFunctions";
import EvaluationGraphsDataHandler from "./EvaluationGraphsDataHandler";
import {createArrayOfZeros} from "../utilities/genericFunctions";

class EvaluationGraphSet{
    constructor(income, expenses, investments, employmentState = [],
        filingStatusState = [], stTaxState = [], taxYearState = 22){

        [this.newGraphData, this.expenses, this.taxesOnIncomeAndInvestmentIncreases, this.taxesOnIncomeOnly,
            this.income, this.investments, this.length]
        = new EvaluationGraphsDataHandler(income, expenses, investments, employmentState,
            filingStatusState, stTaxState, taxYearState).getAllData();

        this.arrayOfZeros = createArrayOfZeros(this.length)
    }

    makeAssetsVsInflation(){
        let x = [];
        let y = {};

        if (this.standardGraphDataCheck(this.newGraphData?.combinedRunningAssetsLiquidAndIlliquid)) {
            y = this.addGraphNecessities(this.newGraphData.combinedRunningAssetsLiquidAndIlliquid, "Total Assets", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        } else if (this.standardGraphDataCheck(this.newGraphData?.runningLiquidAssetsAfterExpenses)) {
            y = this.addGraphNecessities(this.newGraphData.runningLiquidAssetsAfterExpenses, "Total Assets", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedRunningAssetsAfterInflation)) {
            y = this.addGraphNecessities(this.newGraphData.combinedRunningAssetsAfterInflation, "Total Assets After Inflation", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedRunningAssetsDifferenceAfterInflation)) {
            y = this.addGraphNecessities(this.newGraphData.combinedRunningAssetsDifferenceAfterInflation, "Difference", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "This takes your total assets after taxes/expenses, both liquid and illiquid, and shows their " +
            "relative value after inflation. To at least beat inflation, consider investing your funds."

        return x;
    }

    makeCombinedInvestmentExpenses(){
        let x = [];
        let y = {};

        if (this.standardGraphDataCheck(this.newGraphData?.initialInvestments)) {
            y = this.addGraphNecessities(this.newGraphData.initialInvestments, "Initial Investments", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedAdditionalInvestments)) {
            y = this.addGraphNecessities(this.newGraphData.combinedAdditionalInvestments, "Additional Investments", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.reinvestedEachYear)) {
            y = this.addGraphNecessities(this.newGraphData.reinvestedEachYear, "Reinvested Each Year", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedInvestmentExpenses)) {
            y = this.addGraphNecessities(this.newGraphData.combinedInvestmentExpenses, "Combined Investment Expenses", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "Your pull % includes your additional investments. If you pull 30% and make an additional " +
            "investment of 100k, you will pull 30k plus 30% of the return.";

        return x;
    }

    makeExpenses()
    {
        let x = [];
        let y = {};

        if (isObject(this.expenses)
            && this.expenses.combinedSumByYear) {
            y = this.addGraphNecessities(this.expenses.combinedSumByYear, "General Expenses", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.taxesOnIncomeAndInvestmentIncreases?.totalTaxes)) {
            y = this.addGraphNecessities(this.taxesOnIncomeAndInvestmentIncreases.totalTaxes, "Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        } else if (this.standardGraphDataCheck(this.taxesOnIncomeAndInvestmentIncreases?.totalTaxes)) {
            y = this.addGraphNecessities(this.taxesOnIncomeOnly.totalTaxes, "Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.initialAndAdditionalInvestments)) {
            y = this.addGraphNecessities(this.newGraphData.initialAndAdditionalInvestments, "Investments", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.combinedExpensesFromInvestmentsTaxesAndGeneral) {
            y = this.addGraphNecessities(this.newGraphData.combinedExpensesFromInvestmentsTaxesAndGeneral, "Total Expenses", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = 'Investment expenses includes initial investments and additional investments, but not re-investments. ' +
            'General expenses includes everything you listed on the "expenses" page, which often includes rent, car payment, etc. ' +
            'It is assumed that you pay taxes on your investment growth, and that is included here.'
        return x;
    }

    makeIncomeByGroup()
    {
        let x = [];
        let y = {};

        if (this.standardGraphDataCheck(this.income?.sumByYear)) {
            y = this.addGraphNecessities(this.income?.sumByYear, "Career", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedInvestmentPulls)) {
            y = this.addGraphNecessities(this.newGraphData?.combinedInvestmentPulls, "Investment Pulls", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.reinvestedEachYear)) {
            y = this.addGraphNecessities(this.newGraphData?.reinvestedEachYear, "Reinvested", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.investmentWithdrawlValues)) {
            y = this.addGraphNecessities(this.newGraphData?.investmentWithdrawlValues, "Investment Withdrawls", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedIncome)) {
            y = this.addGraphNecessities(this.newGraphData?.combinedIncome, "Combined", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "Remember that the amounts you reinvested may not liquid.";
        return x;
    }

    makeInvestmentIncome()
    {
        let x = [];
        let y = {};

        if (this.standardGraphDataCheck(this.newGraphData?.combinedInvestmentPulls)) {
            y = this.addGraphNecessities(this.newGraphData.combinedInvestmentPulls, "Pulls from Investment", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.reinvestedEachYear)) {
            y = this.addGraphNecessities(this.newGraphData.reinvestedEachYear, "Reinvested", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.investmentCombinedIncomeByYearSansAddlInvestments)) {
            y = this.addGraphNecessities(this.newGraphData.investmentCombinedIncomeByYearSansAddlInvestments, "Combined Investment Income", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = `Your pulls are assumed to be liquid, and your reinvestments to be illiquid -- except the portion that you pulled.`;

        return x;
    }

    makeRunningIncomeSumsAndYearlyExpenses()
    {
        let x = [];
        let y = {};

        if (!isEmptyArray(this.income) || !isEmptyArray(this.investments)) {
            y = this.addGraphNecessities(this.newGraphData.runningLiquidAssetsAfterExpenses, "Liquid Assets", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedExpenses)) {
            y = this.addGraphNecessities(this.newGraphData.combinedExpenses, "Expenses by Year", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "This graph assumes that you save all of your earnings from previous years, minus what you explicitly listed as expenses and investments. " +
            "Liquid Assets are after same-year expenses. Expenses include taxes. And it is assumed that your investments are illiquid, except the portion that you pulled."; //TODO Does this include reinvestment as expense? Shouldn't be.
        return x;
    }

    makeSameYearExpendable()
    {
        let x = [];
        let y = {};

        if (this.newGraphData?.yearlyLiquidAfterExpenses) {
            y = this.addGraphNecessities(this.newGraphData.yearlyLiquidAfterExpenses, "Same Year Expendable", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.yearlyLiquidAssetsIn) {
            y = this.addGraphNecessities(this.newGraphData.yearlyLiquidAssetsIn, "Income by Year", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.newGraphData?.combinedExpenses) {
            y = this.addGraphNecessities(this.newGraphData?.combinedExpenses, "Expenses by Year", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "This shows what you spent in each year vs. what you earned in that same year. Savings are not shown here.";

        return x;
    }

    makeTaxesByCategory()
    {
        let x = [];
        let y = {};
        let taxesCategory = "";
        if (isObject(this.investments) || isObject(this.income)) {
            isObject(this.investments) ? taxesCategory = "taxesOnIncomeAndInvestmentIncreases" : taxesCategory = "taxesOnIncomeOnly";
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.stateTaxSums)) {
            y = this.addGraphNecessities(this[taxesCategory].stateTaxSums, "State Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.federalIncomeTax)) {
            y = this.addGraphNecessities(this[taxesCategory].federalIncomeTax, "Federal Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.ficaTaxSums?.medicare)) {
            y = this.addGraphNecessities(this[taxesCategory].ficaTaxSums.medicare, "Medicare Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.ficaTaxSums?.socSec)) {
            y = this.addGraphNecessities(this[taxesCategory].ficaTaxSums.socSec, "SS Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this[taxesCategory]?.totalTaxes)) {
            y = this.addGraphNecessities(this[taxesCategory].totalTaxes, "Total Taxes", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "This assumes that you're paying taxes on your investment growth.";

        return x;
    }

    makeTaxPercentageByYear()
    {
        let x = [];
        let y = {};

        if (this.standardGraphDataCheck(this.taxesOnIncomeAndInvestmentIncreases?.effectiveTaxPercentages)) {
            y = this.addGraphNecessities(this.taxesOnIncomeAndInvestmentIncreases.effectiveTaxPercentages, "Effective Tax Percentage", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        } else if (this.standardGraphDataCheck(this.taxesOnIncomeOnly?.effectiveTaxPercentages)) {
            y = this.addGraphNecessities(this.taxesOnIncomeOnly.effectiveTaxPercentages, "Effective Tax Percentage", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "This assumes that you're paying taxes on your investment growth.";

        return x;
    }

    makeTotalAssetsLiquidAndIlliquid()
    {
        let x = [];
        let y = {};

        if (!isEmptyArray(this.income) || !isEmptyArray(this.investments)) {
            y = this.addGraphNecessities(this.newGraphData.runningLiquidAssetsAfterExpenses, "Liquid Assets", "#ff0000");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (!isEmptyArray(this.investments)
            && JSON.stringify(this.newGraphData?.runningIlliquidAssets) !== JSON.stringify(this.arrayOfZeros)) {
            y = this.addGraphNecessities(this.newGraphData.runningIlliquidAssets, "Illiquid Assets", "#00ff00");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        if (this.standardGraphDataCheck(this.newGraphData?.combinedRunningAssetsLiquidAndIlliquid)) {
            y = this.addGraphNecessities(this.newGraphData.combinedRunningAssetsLiquidAndIlliquid, "Total Assets", "#0000ff");
            [x, y] = this.addThisEntryToArray(x, y);
        }

        x.description = "Assets are your income after expenses, and your investments plus their growth. It is assumed that your investments are illiquid, except the portion that you pulled.";
        return x;
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

    standardGraphDataCheck(arr){
        return (Array.isArray(arr)
            && !isEmptyArray(arr)
            && JSON.stringify(arr) !== JSON.stringify(this.arrayOfZeros));
    }
}

export default EvaluationGraphSet;