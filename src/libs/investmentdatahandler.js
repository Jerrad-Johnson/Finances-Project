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
        this.createArraysOfPercentagesByYear(this.investmentData);
        this.calculateCorrectEntriesToReinvestmentYears(this.investmentData);
        this.calculateReturn(this.investmentData);
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

    createArraysOfPercentagesByYear(investmentData){
        investmentData.arrayReinvestPercentagesByYear = [];
        investmentData.arrayPullPercentagesByYear = [];;

        for (let i = 0; i < this.length; i++){
            investmentData.arrayPullPercentagesByYear[i] = []
            investmentData.arrayReinvestPercentagesByYear[i] = [];
            for (let j = 0; j < this.graphMaxNumberOfYears; j++) {
                investmentData.arrayPullPercentagesByYear[i][j] = 0;
                investmentData.arrayReinvestPercentagesByYear[i][j] = 0;
            }
        }

        return investmentData;
    }

    calculateCorrectEntriesToReinvestmentYears(investmentData){
        let withdrawOrReinvest = [];
        let first = 0;

        for (let i = 0; i < this.length; i++){
            if (investmentData.yearsCeaseReinvesting[i] === "Never" && investmentData.yearsWithdraw[i] === "Never"){
                withdrawOrReinvest[i] = "Neither";
            } else if (investmentData.yearsWithdraw[i] !== "Never" && investmentData.yearsCeaseReinvesting[i] !== "Never"){
                withdrawOrReinvest[i] = "Both";
            } else if (investmentData.yearsWithdraw[i] === "Never"){
                withdrawOrReinvest[i] = "Reinvest";
            } else if (investmentData.yearsCeaseReinvesting[i] === "Never"){
                withdrawOrReinvest[i] = "Withdraw";
            }
        }

        investmentData.withdrawOrReinvest = withdrawOrReinvest;

        for (let i = 0; i < this.length; i++){
            if (investmentData.withdrawOrReinvest[i] == "Neither") {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Both") {
                //investmentData.yearsWithdraw[i] > investmentData.yearsCeaseReinvesting[i] ? first = investmentData.yearsWithdraw[i] : first = investmentData.yearsCeaseReinvesting[i];
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsWithdraw[i]; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Reinvest") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsCeaseReinvesting[i]; j++){
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                }
            } else if (investmentData.withdrawOrReinvest[i] == "Withdraw") {
                for (let j = investmentData.yearsBegin[i]; j < investmentData.yearsWithdraw[i]; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                }
            } else {
                for (let j = investmentData.yearsBegin[i]; j < this.graphMaxNumberOfYears; j++) {
                    investmentData.arrayReinvestPercentagesByYear[i][j] = investmentData.percentageReinvested[i];
                }
            }
        }

        return investmentData;
    }


    calculateReturn(investmentData){

        return investmentData;
    }
}

export default InvestmentDataHandler;