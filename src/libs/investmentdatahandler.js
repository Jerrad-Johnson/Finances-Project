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
        investmentData.percentagePulled = 0;

        if (investmentData.percentToPull != 0){
            investmentData.percentagePulled = investmentData.percentReturn * (investmentData.percentToPull * .01);
        }

        return investmentData;
    }

    calculatePercentageReinvested(investmentData){
        investmentData.percentageReinvested = investmentData.percentReturn - investmentData.percentagePulled;
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
        let results = [];

        this.cc(investmentData)

        for (let i = 0; i < this.length; i++){
            if (investmentData.yearsCeaseReinvesting[i] === "Never" && investmentData.yearsWithdraw[i] === "Never"){
                results[i] = "Neither";
            } else if (investmentData.yearsWithdraw[i] === "Never"){
                results[i] = "Reinvest"
            } else if (investmentData.yearsCeaseReinvesting[i] === "Never"){
                results[i] = "Withdraw"
            }
        }

        this.cc(results);

        return investmentData;
    }


    calculateReturn(investmentData){

        return investmentData;
    }
}

export default InvestmentDataHandler;