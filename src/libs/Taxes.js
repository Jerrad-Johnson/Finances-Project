import Jobdatahandler from "./jobdatahandler";
import {applyRoundingSingleDepthArray, applyRoundingSingleDepthArrayTwoDecimals} from "../components/jobssharedfunctions";

class CalculateTaxes {
    constructor(moneyIn, employmentState, filingStatusState, stTaxState, taxYearState){
        this.income = {};
        this.income.yearlySums = moneyIn;
        this.income.employmentType = employmentState;
        this.income.filingStatus = filingStatusState;
        this.income.stateTaxPercentage = stTaxState;
        this.income.taxYear = taxYearState;
        this.income.taxYear = "y" + this.income.taxYear;
        this.brackets = {
            y22: {
                limitsSingleReturn: [10275, 41755, 89075, 170050, 215950, 539900, "over"],
                limitsMarriedJointReturn: [20550, 83550, 178150, 340100, 431900, 647850, "over"],
                limitsMarriedSeparateReturns: [10275, 41775, 89075, 170050, 215950, 323925, "over"],
                limitsHeadOfHouseholdReturn: [14200, 54200, 86350, 164900, 209400, 523600, "over"],
                rates: [10, 12, 22, 24, 32, 35, 37],
                standardDeduction: {
                    marriedJointReturn: 25900,
                    marriedSeparateReturns: 12950,
                    headOfHousehold: 19400,
                    singleReturn: 12950,
                },
                medicareCutoffs: {
                        reverseCutoffSingleReturns: 200000,
                        reverseCutoffJointReturn: 250000,
                        reverseCutoffHoh: 250000,
                        reverseCutoffSeparateReturns: 125000,
                },
                ficaW2: {
                    medicare: {
                        percent: 1.45,
                        percentageAfterReverseCutoff: 2.35,
                    },
                    socSec: {
                        percent: 6.2,
                        cutoff: 147000,
                    }
                },
                fica1099: {
                    medicare: {
                        percent: 2.9,
                        percentageAfterReverseCutoff: 3.8,
                    },
                    socSec: {
                        percent: 12.4,
                        cutoff: 147000,
                    }
                },
            },
        }

        this.length = new Jobdatahandler();
        this.length = this.length.graphMaxNumberOfYears;
        this.cc = console.dir;
    }

    federalCalculations(){
        let results = {};
        results.stateTaxSums = this.calculateStateTax(this.income.yearlySums, this.income.stateTaxPercentage);
        results.incomeAfterStateTaxes = this.calculateIncomeAfterStateTaxes(this.income.yearlySums, results.stateTaxSums);
        results.federallyTaxableIncomeAfterStandardDeduction = this.calculateTaxableAfterStandardDeduction(
            results.incomeAfterStateTaxes, this.income.taxYear, this.brackets, this.income.filingStatus);
        results.differenceBecauseOfStandardDeduction = this.calculateAmountTaxableIncomeLoweredViaStandardDeduction(
            results.incomeAfterStateTaxes, results.federallyTaxableIncomeAfterStandardDeduction);
        [results.ficaTaxSums, results.taxableIncomeAfterFICA] = this.calculateFICA(results.federallyTaxableIncomeAfterStandardDeduction, this.income.taxYear,
            this.brackets, this.income.employmentType, this.income.filingStatus);
        [results.federalIncomeTax, results.incomeAfterFederalTaxes, results.effectiveTaxPercentages] =
            this.calculateFederalIncomeTax(this.income.taxYear, this.brackets, results.taxableIncomeAfterFICA,
            this.income.filingStatus, results.differenceBecauseOfStandardDeduction, this.income.yearlySums);
        results = this.addIncomeBeforeTaxesToObject(results, this.income.yearlySums);
        results = this.addTotalTaxes(results);
        results = this.roundEverything(results);

        return results;
    }

    calculateStateTax(income, stateTaxPercentage){
        let toBeReturned = [];

        for (let i = 0; i < this.length; i++){
            toBeReturned[i] = income[i] * (stateTaxPercentage / 100);
        }

        return toBeReturned;
    }

    calculateIncomeAfterStateTaxes(income, stateTaxSums){
        let toBeReturned = [];

        for (let i = 0; i < this.length; i++){
            toBeReturned[i] = (income[i] - stateTaxSums[i]);
        }

        return toBeReturned;
    }

    calculateTaxableAfterStandardDeduction(incomeAfterStateTaxes, taxYear, taxBrackets, filingStatus){
        let deductionAmount = this.getDeductionAmountBasedOnFilingStatus(taxYear, taxBrackets, filingStatus);
        let calculated = [];

        for (let i = 0; i < this.length; i++){
            if (incomeAfterStateTaxes[i] - deductionAmount > 0){
                calculated[i] = incomeAfterStateTaxes[i] - deductionAmount;
            } else {
                calculated[i] = 0;
            }
        }

        return calculated;
    }

    getDeductionAmountBasedOnFilingStatus(taxYear, taxBrackets, filingStatus){
        let currentYear = taxBrackets[taxYear];
        let mapStatusToDeduction = {
            "Single": "singleReturn",
            "Married - Joint Return": "marriedJointReturn",
            "Married - Separate Returns": "marriedSeparateReturns",
            "Head of Household": "headOfHousehold",
        };

        return currentYear.standardDeduction[mapStatusToDeduction[filingStatus]];
    }

    calculateAmountTaxableIncomeLoweredViaStandardDeduction(incomeAfterStateTaxes, incomeAfterDeduction){
        let difference = [];

        for (let i = 0; i < this.length; i++){
            difference[i] = incomeAfterStateTaxes[i] - incomeAfterDeduction[i];
        }

        return difference;
    }

    calculateFICA(taxableIncome, taxYear, taxBrackets, employmentType, filingStatus){
        let ficaCategory = this.getFicaCategoryBasedOnEmploymentType(employmentType);
        let ficaBracket = taxBrackets[taxYear][ficaCategory];
        let medicareReverseCutoffPoint = this.getMedicareReverseCutoffPoint(taxYear, taxBrackets, filingStatus);
        let medicareReverseCutoffPercentage = this.getMedicareReverseCutoffPercentage(taxYear, taxBrackets, employmentType);
        let ficaTaxes = {};
        ficaTaxes.medicare = this.getMedicareTaxSums(taxableIncome, medicareReverseCutoffPoint,
            medicareReverseCutoffPercentage, ficaBracket);
        let socSecTaxPercentage = taxBrackets[taxYear][ficaCategory].socSec.percent;
        let socSecCutoffPoint = taxBrackets[taxYear][ficaCategory].socSec.cutoff;
        ficaTaxes.socSec = this.getSocSecTaxSums(taxableIncome, socSecTaxPercentage, socSecCutoffPoint);

        let taxableIncomeAfterFICA = this.getTaxableIncomeAfterFICA(taxableIncome, ficaTaxes.medicare, ficaTaxes.socSec);

        return [ficaTaxes, taxableIncomeAfterFICA]
    }

    getFicaCategoryBasedOnEmploymentType(employmentType){
        let ficaCategory;

        if (employmentType === 'Employee'){
            ficaCategory = "ficaW2";
        } else if (employmentType === 'Self-Employed'){
            ficaCategory = "fica1099";
        }

        if (ficaCategory !== undefined) return ficaCategory;
    }

    getMedicareReverseCutoffPoint(taxYear, taxBrackets, filingStatus){
        let currentYear = taxBrackets[taxYear];
        let mapStatusToDeduction = {
            "Single": "reverseCutoffSingleReturns",
            "Married - Joint Return": "reverseCutoffJointReturn",
            "Married - Separate Returns": "reverseCutoffSeparateReturns",
            "Head of Household": "reverseCutoffHoh",
        };

        return currentYear.medicareCutoffs[mapStatusToDeduction[filingStatus]];
    }

    getMedicareReverseCutoffPercentage(taxYear, taxBrackets, employmentType){
        let currentYear = taxBrackets[taxYear];

        let mapEmploymentToDeduction = {
            "Employee": "ficaW2",
            "Self-Employed": "fica1099",
        }

        return currentYear[mapEmploymentToDeduction[employmentType]].medicare.percentageAfterReverseCutoff;
    }

    getMedicareTaxSums(income, medicareReverseCutoffPoint, medicareReverseCutoffPercentage, ficaBracket){
        let sums = [];

        for (let i = 0; i < this.length; i++) {
            if (income[i] <= medicareReverseCutoffPoint) {
                sums[i] = income[i] * (ficaBracket.medicare.percent / 100);
            } else {
                sums[i] = (medicareReverseCutoffPoint * (ficaBracket.medicare.percent / 100)) +
                    (income[i] - medicareReverseCutoffPoint) * (medicareReverseCutoffPercentage / 100);
            }
        }

        return sums;
    }

    getSocSecTaxSums(income, socSecTaxPercentage, socSecCutoffPoint){
        let sums = [];

        for (let i = 0; i < this.length; i++) {
            if (income[i] <= socSecCutoffPoint) {
                sums[i] = income[i] * (socSecTaxPercentage / 100);
            } else {
                sums[i] = socSecCutoffPoint * (socSecTaxPercentage / 100);
            }
        }

        return sums;
    }

    getTaxableIncomeAfterFICA(taxableIncome, medicareTaxes, socSecTaxes){
        let sums = [];

        for (let i = 0; i < this.length; i++){
            sums[i] = taxableIncome[i] - (medicareTaxes[i] + socSecTaxes[i]);
        }

        return sums;
    }

    calculateFederalIncomeTax(taxYear, brackets, income, filingStatus, standardDeductionActualReduction, incomeBeforeAnyTaxes){
        let cutoffs = this.getBracketCutoffs(taxYear, brackets, filingStatus);
        let percentages = brackets[taxYear].rates;
        let federalTaxTotals = this.getSumOfTaxes(cutoffs, percentages, income);
        let incomeAfterTaxes = this.getIncomeAfterTaxes(income, federalTaxTotals, brackets, taxYear, standardDeductionActualReduction);
        let effectiveTaxPercentages = this.getEffectiveTaxPercentage(incomeAfterTaxes, incomeBeforeAnyTaxes);
        return [federalTaxTotals, incomeAfterTaxes, effectiveTaxPercentages];
    }

    getBracketCutoffs(taxYear, brackets, filingStatus){
        const mapFilingStatusToObject = {
            "Single":"limitsSingleReturn",
            "Married - Joint Return":"limitsMarriedJointReturn",
            "Married - Separate Returns":"limitsMarriedSeparateReturns",
            "Head of Household":"limitsHeadOfHouseholdReturn",
        }

        return brackets[taxYear][mapFilingStatusToObject[filingStatus]];
    }

    getSumOfTaxes(cutoffs, percentages, income){
        let sums = [];

        for (let i = 0 ; i < this.length; i++) {
            if (income[i] > cutoffs[0]){
                sums[i] = cutoffs[0] * (percentages[0] / 100);
            } else {
                sums[i] = income[i] * (percentages[0] / 100);
                continue;
            }

            if (income[i] > cutoffs[1]){
                sums[i] = (cutoffs[1] - cutoffs[0]) * (percentages[1] / 100) + sums[i];
            } else {
                sums[i] = (sums[i] + ((income[i] - cutoffs[0]) * (percentages[1] / 100)));
                continue;
            }

            if (income[i] > cutoffs[2]){
                sums[i] = (cutoffs[2] - cutoffs[1]) * (percentages[2] / 100) + sums[i];
            } else {
                sums[i] = (sums[i] + ((income[i] - cutoffs[1]) * (percentages[2] / 100)));
                continue;
            }

            if (income[i] > cutoffs[3]){
                sums[i] = (cutoffs[3] - cutoffs[2]) * (percentages[3] / 100) + sums[i];
            } else {
                sums[i] = (sums[i] + ((income[i] - cutoffs[2]) * (percentages[3] / 100)));
                continue;
            }

            if (income[i] > cutoffs[4]){
                sums[i] = (cutoffs[4] - cutoffs[3]) * (percentages[4] / 100) + sums[i];
            } else {
                sums[i] = (sums[i] + ((income[i] - cutoffs[3]) * (percentages[4] / 100)));
                continue;
            }

            if (income[i] > cutoffs[5]){
                sums[i] = (cutoffs[5] - cutoffs[4]) * (percentages[5] / 100) + sums[i];
            } else {
                sums[i] = (sums[i] + ((income[i] - cutoffs[4]) * (percentages[5] / 100)));
                continue;
            }

            if (income[i] > cutoffs[5]){
                sums[i] = (sums[i] + ((income[i] - cutoffs[5]) * (percentages[6] / 100)));
            }
        }

        return sums;
    }

    getIncomeAfterTaxes(income, taxValues, brackets, taxYear, standardDeductionActualReduction){
        let sums = [];

        for (let i = 0; i < this.length; i++){
            sums[i] = (income[i] + standardDeductionActualReduction[i]) - taxValues[i];
        }

        return sums;
    }

    getEffectiveTaxPercentage(incomeAfterTaxes, incomeBeforeAnyTaxes){
        let sums = [];

        for (let i = 0; i < this.length; i++) {
            if (incomeAfterTaxes[i] !== 0) {
                sums[i] = 100 - ((incomeAfterTaxes[i] / incomeBeforeAnyTaxes[i]) * 100);
            } else {
                sums[i] = 1;
            }
        }

        //this.cc(sums)
        return sums;
    }

    addIncomeBeforeTaxesToObject(results, income) {
        results.incomeBeforeTaxes = [];

        for (let i = 0; i < this.length; i++) {
            results.incomeBeforeTaxes = income;
        }

        return results;
    }

    addTotalTaxes(results){
        results.totalTaxes = [];

        for (let i = 0; i < this.length; i++) {
            results.totalTaxes[i]
                = results.ficaTaxSums.medicare[i]
                + results.ficaTaxSums.socSec[i]
                + results.federalIncomeTax[i];
        }

        return results;
    }

    roundEverything(results){
        applyRoundingSingleDepthArray(results.differenceBecauseOfStandardDeduction);
        applyRoundingSingleDepthArray(results.federalIncomeTax);
        applyRoundingSingleDepthArray(results.federallyTaxableIncomeAfterStandardDeduction);
        applyRoundingSingleDepthArray(results.ficaTaxSums.medicare);
        applyRoundingSingleDepthArray(results.ficaTaxSums.socSec);
        applyRoundingSingleDepthArray(results.incomeAfterFederalTaxes);
        applyRoundingSingleDepthArray(results.taxableIncomeAfterFICA);
        applyRoundingSingleDepthArray(results.incomeAfterStateTaxes);
        applyRoundingSingleDepthArray(results.stateTaxSums);
        applyRoundingSingleDepthArrayTwoDecimals(results.effectiveTaxPercentages);
        applyRoundingSingleDepthArray(results.totalTaxes);
        return results
    }
}

export default CalculateTaxes;