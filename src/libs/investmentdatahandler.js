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
            investmentData.arrayPullPercentagesByYear[i] = Array(this.graphMaxNumberOfYears);
            investmentData.arrayReinvestPercentagesByYear[i] = Array(this.graphMaxNumberOfYears);
        }

        return investmentData;
    }

    calculateCorrectEntriesToReinvestmentYears(investmentData){
        let withdrawOrReinvest = [];

        for (let i = 0; i < this.length; i++){
            if (investmentData.yearsCeaseReinvesting[i] === "Never" && investmentData.yearsWithdraw[i] === "Never"){
                withdrawOrReinvest[i] = "Neither";
            } else if (investmentData.yearsWithdraw[i] === "Never"){
                withdrawOrReinvest[i] = "Reinvest"
            } else if (investmentData.yearsCeaseReinvesting[i] === "Never"){
                withdrawOrReinvest[i] = "Withdraw"
            }
        }

        investmentData.withdrawOrReinvest = withdrawOrReinvest;

        return investmentData;
    }


    calculateReturn(investmentData){

        return investmentData;
    }
}

export default InvestmentDataHandler;