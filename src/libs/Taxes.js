import Jobdatahandler from "./jobdatahandler";

class CalculateTaxes {
    constructor(income){
        //this.income = income;
        this.income = {};
        this.income.yearlySums = [35000, 45000, 60000, 80000, 10000, 120000, 150000, 180000, 200000, 200000, 250000,
            400000, 700000, 1000000, 5000000];
        this.income.filingStatus = "Single";
            //"Single", "Married - Joint Return", "Married - Separate Returns", "Head of Household"
        this.income.employmentType = 'Self-Employed';
            //["Employee", "Self-Employed"];
        this.income.stateTaxPercentage = 5
        this.income.taxYear = 22;
        this.income.taxYear = "y" + this.income.taxYear;
        this.brackets = {
            y22: {
                limitsSingleReturn: [0, 10275, 41755, 89075, 170050, 215950, 539900],
                limitsMarriedJointReturn: [0, 20550, 83550, 178150, 340100, 431900, 647850],
                limitsMarriedSeparateReturns: [0, 10275, 41775, 89075, 170050, 215950, 323925],
                limitsHeadOfHouseholdReturn: [0, 14200, 54200, 86350, 164900, 209400, 523600],
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
        this.cc = console.log;
    }

    federalCalculations(){
        let results = {};
        results.stateTaxSums = this.calculateStateTax(this.income.yearlySums, this.income.stateTaxPercentage);
        results.incomeAfterStateTaxes = this.calculateIncomeAfterStateTaxes(this.income.yearlySums, results.stateTaxSums);
        results.federallyTaxableIncomeAfterStandardDeduction = this.calculateTaxableAfterStandardDeduction(
                results.incomeAfterStateTaxes, this.income.taxYear, this.brackets, this.income.filingStatus);
        results.differenceBecauseOfStandardDeduction = this.calculateAmountTaxableIncomeLoweredViaStandardDeduction(
                results.incomeAfterStateTaxes, results.federallyTaxableIncomeAfterStandardDeduction);
        results.ficaTaxSums = this.calculateFICA(results.federallyTaxableIncomeAfterStandardDeduction, this.income.taxYear,
                this.brackets, this.income.employmentType, this.income.filingStatus);

//        this.cc(results);
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

    calculateFICA(income, taxYear, taxBrackets, employmentType, filingStatus){
        let ficaCategory = this.getFicaCategoryBasedOnEmploymentType(employmentType);
        let ficaBracket = taxBrackets[taxYear][ficaCategory];
        let medicareReverseCutoffPoint = this.getMedicareReverseCutoffPoint(taxYear, taxBrackets, filingStatus);
        let medicareReverseCutoffPercentage = this.getMedicareReverseCutoffPercentage(taxYear, taxBrackets, employmentType);
        let ficaTaxes = {};
        ficaTaxes.medicare = this.getMedicareTaxSums(income, medicareReverseCutoffPoint,
                                                        medicareReverseCutoffPercentage, ficaBracket);




        //ficaTaxes.socSec = this.getSocSecTaxSums(income,);
        //this.cc(ficaTaxes.medicare)
        /*
        if (ficaCategory === "ficaW2"){
            for (let i = 0; i < this.length; i++) {
                ficaTaxes.medicare[i] = income[i] * (ficaBracket.medicare.percent / 100);

                //if (income[i] < )

                if (income[i] < ficaBracket.socSec.cutoff) {
                    ficaTaxes.socSec[i] = income[i] * (ficaBracket.socSec.percent / 100);
                } else {
                    ficaTaxes.socSec[i] = ficaBracket.socSec.cutoff * (ficaBracket.socSec.percent / 100);
                }
            }
        } else if (ficaCategory === "fica1099"){
            for (let i = 0; i < this.length; i++){
                /!*ficaTaxes.medicare[i] =
                ficaTaxes.socSec[i] =*!/
            }
        }
*/

        return ficaTaxes
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

    getMedicareTaxSums(income, medicareReverseCutoffPoint, medicareReverseCutoffPercentage, ficaBracket) {
        let ficaTaxes = {};
        ficaTaxes.medicare = [];

        for (let i = 0; i < this.length; i++) {
            if (income[i] < medicareReverseCutoffPoint) {
                ficaTaxes.medicare[i] = income[i] * (ficaBracket.medicare.percent / 100);
            } else {
                ficaTaxes.medicare[i] = (medicareReverseCutoffPoint * (ficaBracket.medicare.percent / 100)) +
                    (income[i] - medicareReverseCutoffPoint) * (medicareReverseCutoffPercentage / 100);
            }
        }

        return ficaTaxes;
    }



}

export default CalculateTaxes;