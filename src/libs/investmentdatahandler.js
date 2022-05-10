import jobdatahandler from "./jobdatahandler";

class InvestmentDataHandler {

    constructor(investmentData){
        this.investmentData = investmentData;
        this.graphMaxNumberOfYears = new jobdatahandler().graphMaxNumberOfYears;
        this.cc = console.log;
        this.length = this.investmentData.labels.length;

    }

    beginCalculations(){
        this.calculatePercentagePulled(this.investmentData);
        this.calculatePercentageReinvested(this.investmentData);
        this.createArraysOfZero(this.investmentData);
        this.addArrayOfNumberedYears(this.investmentData);
        this.withdrawOrReinvest(this.investmentData);
        this.calculateValuesAcrossTheYears(this.investmentData);
        this.createArraysAdditionalInvestmentValues(this.investmentData);
        this.runningInvestmentValue(this.investmentData);
        //this.createArraysSansSameYearAdlInvestment(this.investmentData);
        this.investmentIncreaseByYear(this.investmentData);
        this.pullValueByYear(this.investmentData);
        this.runningPullSum(this.investmentData);
        this.withdrawlValue(this.investmentData);
        this.updateArrayForWithdrawl(this.investmentData)
        this.roundArrayNumbers(this.investmentData)
        return this.investmentData;
    }


    calculatePercentagePulled(investmentData){
        investmentData.percentagePulled = [];

        for (let i = 0; i < this.length; i++) {
            if (investmentData.percentToPull[i] !== 0) {
                investmentData.percentagePulled[i] = investmentData.percentReturn[i]
                    * (investmentData.percentToPull[i] * .01);
            } else {
                investmentData.percentagePulled[i] = 0;
            }
        }

        return investmentData;
    }

    calculatePercentageReinvested(investmentData){
        investmentData.percentageReinvested = [];

        for (let i = 0; i < this.length; i++){
            investmentData.percentageReinvested[i] = investmentData.percentReturn[i]
                - investmentData.percentagePulled[i];
        }
        return investmentData;
    }

    createArraysOfZero(investmentData){
        investmentData.arrayReinvestPercentagesByYear = [];
        investmentData.arrayPullPercentagesByYear = [];
        investmentData.arrayRunningInvestmentValue = [];
        investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment = [];
        investmentData.arrayInvestmentIncreaseByYearMinusSameYearAdlInvestment = []
        investmentData.arrayPullValueByYear = [];
        investmentData.arrayRunningPullSums = [];
        investmentData.arrayInvestmentIncreaseByYear = [];
        investmentData.arrayAdditionalInvestment = [];
        investmentData.withdrawlValue = [];

        for (let i = 0; i < this.length; i++){
            investmentData.arrayPullPercentagesByYear[i] = []
            investmentData.arrayReinvestPercentagesByYear[i] = [];
            investmentData.arrayRunningInvestmentValue[i] = [];
            investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment[i] = [];
            investmentData.arrayInvestmentIncreaseByYearMinusSameYearAdlInvestment[i] = [];
            investmentData.arrayPullValueByYear[i] = [];
            investmentData.arrayRunningPullSums[i] = [];
            investmentData.arrayInvestmentIncreaseByYear[i] = [];
            investmentData.arrayAdditionalInvestment[i] = [];
            investmentData.withdrawlValue[i] = 0;
            for (let j = 0; j < this.graphMaxNumberOfYears; j++) {
                investmentData.arrayPullPercentagesByYear[i][j] = 0;
                investmentData.arrayReinvestPercentagesByYear[i][j] = 0;
                investmentData.arrayRunningInvestmentValue[i][j] = 0;
                investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment[i][j] = 0;
                investmentData.arrayInvestmentIncreaseByYearMinusSameYearAdlInvestment[i][j] = 0;
                investmentData.arrayPullValueByYear[i][j] = 0;
                investmentData.arrayRunningPullSums[i][j] = 0;
                investmentData.arrayInvestmentIncreaseByYear[i][j] = 0;
                investmentData.arrayAdditionalInvestment[i][j] = 0;
            }
        }

        return investmentData;
    }

    addArrayOfNumberedYears(investmentData){
        investmentData.yearsNumbered = [];

        for (let i = 0; i <= (this.graphMaxNumberOfYears - 1); i++) {
            investmentData.yearsNumbered[i] = "Year " + (i + 1);
        }

        return investmentData;
    }

    withdrawOrReinvest(investmentData){
        let withdrawOrReinvest = [];

        for (let i = 0; i < this.length; i++){
            if (investmentData.yearsCeaseReinvesting[i] === "Never" && investmentData.yearsWithdraw[i] === "Never"){
                withdrawOrReinvest[i] = "Neither";
            } else if (investmentData.yearsWithdraw[i] !== "Never" && investmentData.yearsCeaseReinvesting[i] !== "Never"){
                withdrawOrReinvest[i] = "Both";
            } else if (investmentData.yearsWithdraw[i] === "Never"){
                withdrawOrReinvest[i] = "CeaseReinvest";
            } else if (investmentData.yearsCeaseReinvesting[i] === "Never"){
                withdrawOrReinvest[i] = "Withdraw";
            }
        }

        investmentData.withdrawOrReinvest = withdrawOrReinvest;
        return investmentData;
    }

    calculateValuesAcrossTheYears(investmentData){
        for (let i = 0; i < this.length; i++){
            investmentData.arrayRunningInvestmentValue[i][investmentData.yearsBegin[i]-1] = +investmentData.amounts[i];

            if (investmentData.withdrawOrReinvest[i] == "Neither") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    investmentData.arrayPullPercentagesByYear[i][j] = investmentData.percentagePulled[i];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Both") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i]; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    for (let k = investmentData.yearsBegin[i]; k < investmentData.yearsWithdraw[i]; k++) {
                        investmentData.arrayPullPercentagesByYear[i][k] = investmentData.percentagePulled[i];
                    }
                    for (let l = investmentData.yearsCeaseReinvesting[i]; l < investmentData.yearsWithdraw[i]; l++){
                        investmentData.arrayPullPercentagesByYear[i][l] = investmentData.percentReturn[i];
                    }
                }
            } else if (investmentData.withdrawOrReinvest[i] == "CeaseReinvest") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i]; j++){
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    investmentData.arrayPullPercentagesByYear[i][j] = investmentData.percentagePulled[i];
                }
                for (let l = investmentData.yearsCeaseReinvesting[i]; l < investmentData.yearsWithdraw[i]; l++){
                    investmentData.arrayPullPercentagesByYear[i][l] = investmentData.percentReturn[i];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Withdraw") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsWithdraw[i]; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    investmentData.arrayPullPercentagesByYear[i][j] = investmentData.percentagePulled[i];
                }
            }
        }
        return investmentData;
    }

    createArraysAdditionalInvestmentValues(investmentData){
        for (let i = 0; i < this.length; i++) {
            if (investmentData.additionalInvestment[i] !== 0){
                if (investmentData.withdrawOrReinvest[i] == "Neither") {
                    for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                        investmentData.arrayAdditionalInvestment[i][j] = investmentData.additionalInvestment[i];
                    }
                } else if (investmentData.withdrawOrReinvest[i] == "CeaseReinvest"
                            || investmentData.withdrawOrReinvest[i] === "Both"){
                    for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i] -1; j++) {
                        investmentData.arrayAdditionalInvestment[i][j] = investmentData.additionalInvestment[i];
                    }
                } else if (investmentData.withdrawOrReinvest[i] === "Withdraw"){
                    for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsWithdraw[i] -1; j++) {
                        investmentData.arrayAdditionalInvestment[i][j] = investmentData.additionalInvestment[i];
                    }
                }
            }
        }

        return investmentData;
    }


    runningInvestmentValue(investmentData){
        for (let i = 0; i < this.length; i++) {
            if (investmentData.withdrawOrReinvest[i] == "Neither") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                        * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                    investmentData.arrayRunningInvestmentValue[i][j] += investmentData.arrayAdditionalInvestment[i][j];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Both") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i]; j++) {
                    investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                        * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                        investmentData.arrayRunningInvestmentValue[i][j] += investmentData.arrayAdditionalInvestment[i][j];
                }
                for (let k = investmentData.yearsCeaseReinvesting[i]; k < this.graphMaxNumberOfYears; k++) {
                    if (k < investmentData.yearsWithdraw[i]){
                        investmentData.arrayRunningInvestmentValue[i][k] = (investmentData.arrayRunningInvestmentValue[i][k-1]);
                        investmentData.arrayRunningInvestmentValue[i][k] += investmentData.arrayAdditionalInvestment[i][k];
                    } else { /* // This isn't reached if withdraw year is 15. Could fix, but currently using updateArrayForWithdrawl instead
                        investmentData.arrayRunningInvestmentValue[i][k] = 0;*/
                    }
                }
            } else if (investmentData.withdrawOrReinvest[i] == "CeaseReinvest") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    if (j < investmentData.yearsCeaseReinvesting[i]) {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                            * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                        investmentData.arrayRunningInvestmentValue[i][j] += investmentData.arrayAdditionalInvestment[i][j];
                    } else {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]);
                        investmentData.arrayRunningInvestmentValue[i][j] += investmentData.arrayAdditionalInvestment[i][j];
                    }
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Withdraw") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    if (j < investmentData.yearsWithdraw[i]) {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                            * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                        investmentData.arrayRunningInvestmentValue[i][j] += investmentData.arrayAdditionalInvestment[i][j];
                    } else { /* // This isn't reached if withdraw year is 15. Could fix, but currently using updateArrayForWithdrawl instead
                        investmentData.arrayRunningInvestmentValue[i][j] = 0;*/
                    }

                }
            }
        }
        return investmentData;
    }

    createArraysSansSameYearAdlInvestment(investmentData){ // Note: Created these by mistake and currently unused. But may be useful for some graphs.
        for (let i = 0; i < this.length; i++){
            investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment[i][investmentData.yearsBegin[i] -1]
                = +investmentData.amounts[i];
        }

        for (let i = 0; i < this.length; i++){
            for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++){
                if (investmentData.arrayRunningInvestmentValue[i][j] > investmentData.additionalInvestment[i]){
                    investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment[i][j]
                        = (investmentData.arrayRunningInvestmentValue[i][j] - investmentData.additionalInvestment[i]);
                }
            }
        }

        for (let i = 0; i < this.length; i++) {
            for (let j = 1; j < this.graphMaxNumberOfYears; j++) {
                investmentData.arrayInvestmentIncreaseByYearMinusSameYearAdlInvestment[i][j] =
                    investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment[i][j] -
                    investmentData.arrayRunningInvestmentValueMinusSameYearAdlInvestment[i][j - 1];
            }
        }

        return investmentData;
    }


    investmentIncreaseByYear(investmentData){
        for (let i = 0; i < this.length; i++){
            for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++){
                let x = investmentData.arrayRunningInvestmentValue[i][j] - investmentData.arrayRunningInvestmentValue[i][j-1];

                if (x >= 0) {
                    investmentData.arrayInvestmentIncreaseByYear[i][j] = x;
                }
            }
        }

        return investmentData;
    }

    pullValueByYear(investmentData){
        for (let i = 0; i < this.length; i++) {
            for (let j = 1; j < this.graphMaxNumberOfYears; j++) {
                investmentData.arrayPullValueByYear[i][j] = investmentData.arrayRunningInvestmentValue[i][j]
                    * (investmentData.arrayPullPercentagesByYear[i][j] / 100);
            }
        }

        return investmentData;
    }

    runningPullSum(investmentData){
        for (let i = 0; i < this.length; i++) {
            let sum = 0;
            for (let j = 1; j < this.graphMaxNumberOfYears; j++) {
                if (investmentData.arrayPullValueByYear[i][j] != 0){
                    sum = sum + investmentData.arrayPullValueByYear[i][j];
                    investmentData.arrayRunningPullSums[i][j] = sum;
                }
            }
        }
        return investmentData;
    }

    withdrawlValue(investmentData){
        for (let i = 0; i < this.length; i++) {
            if (investmentData.withdrawOrReinvest[i] === "Withdraw" || investmentData.withdrawOrReinvest[i] === "Both"){
                investmentData.withdrawlValue[i] =
                    investmentData.arrayRunningInvestmentValue[i][investmentData.yearsWithdraw[i] -1];
            }
        }
        return investmentData;
    }

   updateArrayForWithdrawl(investmentData){
        for (let i = 0; i < this.length; i++){
            if (investmentData.withdrawOrReinvest[i] === "Withdraw" || "Both"){
                investmentData.arrayRunningInvestmentValue[i][investmentData.yearsWithdraw[i] -1] = 0; // TODO This seems related to the bug in runningInvestmentValue
            }
        }

        return investmentData;
   }

   roundArrayNumbers(investmentData){
       investmentData.arrayAdditionalInvestment = applyRoundingTwoDepthArray(investmentData.arrayAdditionalInvestment);
       investmentData.arrayInvestmentIncreaseByYear = applyRoundingTwoDepthArray(investmentData.arrayInvestmentIncreaseByYear);
       investmentData.arrayPullValueByYear = applyRoundingTwoDepthArray(investmentData.arrayPullValueByYear);
       investmentData.arrayRunningInvestmentValue = applyRoundingTwoDepthArray(investmentData.arrayRunningInvestmentValue);
       investmentData.arrayRunningPullSums = applyRoundingTwoDepthArray(investmentData.arrayRunningPullSums);
       investmentData.arrayRunningInvestmentValue = applyRoundingTwoDepthArray(investmentData.arrayRunningInvestmentValue);
       investmentData.withdrawlValue = applyRoundingSingleDepthArray(investmentData.withdrawlValue);

       function applyRoundingSingleDepthArray(arr){
           for (let i = 0; i < arr.length; i++) {
               arr[i] = Math.round(arr[i]);
           }
           return arr;
       }

       function applyRoundingTwoDepthArray(arr){
           for (let i = 0; i < arr.length; i++){
               for (let j = 0; j < arr[i].length; j++){
                   arr[i][j] = Math.round(arr[i][j]);
               }
           }
           return arr;
       }

       return investmentData;
   }
}

    //TODO Add array of running Add'l investment that I can use as an expense point.
export default InvestmentDataHandler;