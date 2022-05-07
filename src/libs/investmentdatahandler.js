import jobdatahandler from "./jobdatahandler";

class InvestmentDataHandler {

    constructor(investmentData){
        this.investmentData = investmentData;
        this.graphMaxNumberOfYears = new jobdatahandler().graphMaxNumberOfYears;
        this.cc = console.log;
        this.length = this.investmentData.labels.length;
    }

    beginCalculations(){
        this.calculateReturnPercentageAfterPullPercentage(this.investmentData);
        this.calculatePercentageReinvested(this.investmentData);
        this.createArraysOfZero(this.investmentData);
        this.calculateCorrectArrayEntriesByYears(this.investmentData);
        this.runningInvestmentValue(this.investmentData);
        return this.investmentData;
    }


    calculateReturnPercentageAfterPullPercentage(investmentData){
        investmentData.percentagePulled = [];

        for (let i = 0; i < this.length; i++) {
            if (investmentData.percentToPull[i] !== 0) {
                investmentData.percentagePulled[i] = investmentData.percentReturn[i] * (investmentData.percentToPull[i] * .01);
            } else {
                investmentData.percentagePulled[i] = 0;
            }
        }

        return investmentData;
    }

    calculatePercentageReinvested(investmentData){
        investmentData.percentageReinvested = [];

        for (let i = 0; i < this.length; i++){
            investmentData.percentageReinvested[i] = investmentData.percentReturn[i] - investmentData.percentagePulled[i];
        }
        return investmentData;
    }

    createArraysOfZero(investmentData){
        investmentData.arrayReinvestPercentagesByYear = [];
        investmentData.arrayPullPercentagesByYear = [];
        investmentData.arrayRunningInvestmentValue = [];
        investmentData.arrayPullValueByYear = [];
        investmentData.arrayRunningPullSums = [];
        investmentData.arrayRunningInvestmentIncrease = [];


        for (let i = 0; i < this.length; i++){
            investmentData.arrayPullPercentagesByYear[i] = []
            investmentData.arrayReinvestPercentagesByYear[i] = [];
            investmentData.arrayRunningInvestmentValue[i] = [];
            investmentData.arrayPullValueByYear[i] = [];
            investmentData.arrayRunningPullSums[i] = [];
            investmentData.arrayRunningInvestmentIncrease[i] = [];
            for (let j = 0; j < this.graphMaxNumberOfYears; j++) {
                investmentData.arrayPullPercentagesByYear[i][j] = 0;
                investmentData.arrayReinvestPercentagesByYear[i][j] = 0;
                investmentData.arrayRunningInvestmentValue[i][j] = 0;
                investmentData.arrayPullValueByYear[i][j] = 0;
                investmentData.arrayRunningPullSums[i][j] = 0;
                investmentData.arrayRunningInvestmentIncrease[i][j] = 0;
            }
        }

        return investmentData;
    }

    calculateCorrectArrayEntriesByYears(investmentData){
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

        for (let i = 0; i < this.length; i++){
            investmentData.arrayRunningInvestmentValue[i][investmentData.yearsBegin[i]-1] = +investmentData.amounts[i];

            if (investmentData.withdrawOrReinvest[i] == "Neither") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    investmentData.arrayPullPercentagesByYear[i][j] = investmentData.percentagePulled[i];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Both") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsWithdraw[i]; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    for (let k = investmentData.yearsBegin[i]; k < investmentData.yearsCeaseReinvesting[i]; k++) {
                        investmentData.arrayPullPercentagesByYear[i][k] = investmentData.percentagePulled[i];
                    }
                }
            } else if (investmentData.withdrawOrReinvest[i] == "CeaseReinvest") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i]; j++){
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                    investmentData.arrayPullPercentagesByYear[i][j] = investmentData.percentagePulled[i];
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

    runningInvestmentValue(investmentData){

        for (let i = 0; i < this.length; i++) {
            if (investmentData.withdrawOrReinvest[i] == "Neither") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                        * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Both") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i]; j++) {
                    investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                        * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                }
                for (let k = investmentData.yearsCeaseReinvesting[i]; k < this.graphMaxNumberOfYears; k++) {
                    if (k < investmentData.yearsWithdraw[i]){
                        investmentData.arrayRunningInvestmentValue[i][k] = (investmentData.arrayRunningInvestmentValue[i][k-1]);
                    } else {
                        investmentData.arrayRunningInvestmentValue[i][k] = 0;
                    }
                }
            } else if (investmentData.withdrawOrReinvest[i] == "CeaseReinvest") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    if (j < investmentData.yearsCeaseReinvesting[i]) {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                            * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                    } else {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]);
                    }
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Withdraw") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    if (j < investmentData.yearsWithdraw) {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1]
                            * (investmentData.percentageReinvested[i] / 100)) + investmentData.arrayRunningInvestmentValue[i][j - 1];
                    } else {
                        investmentData.arrayRunningInvestmentValue[i][j] = (investmentData.arrayRunningInvestmentValue[i][j - 1] = 0);
                    }
                }
            }
        }

        return investmentData;
    }



}

export default InvestmentDataHandler;