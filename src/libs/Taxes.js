class CalculateTaxes {
    constructor(income){
        //this.income = income;
        this.income = [35000, 45000, 60000, 80000, 10000, 120000, 150000, 180000, 200000, 200000, 250000, 400000, 700000, 1000000, 5000000];
        this.filingStatus = ["Single", "Married - Joint Return", "Married - Separate Returns", "Head of Household"];
        this.employmentType = ["Employee", "Business"];
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
                ficaW2: {
                    medicare: {
                        percent: 1.45,
                    },
                    socSec: {
                        percent: 6.2,
                        cutoff: 147000,
                    }
                },
                fica1099: {
                    medicare: {
                        percent: 2.9,
                        reverseCutoffMarriedJointReturn: 250000,
                        reverseCutoffMarriedSeparateReturns: 125000,
                        reverseCutoffSingleHohReturn: 200000,
                        reverseCutoffPercent: 0.9,
                    },
                    socSec: {
                        percent: 12.4,
                        cutoff: 147000,
                    }
                },
            },
        }

        this.cc = console.log;
    }

    federalCalculations(){
        //this.income = ()
        this.cc(this.brackets);
    }

}

export default CalculateTaxes;