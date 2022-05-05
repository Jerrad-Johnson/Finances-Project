import jobdatahandler from "./jobdatahandler";

class InvestmentDataHandler {

    constructor(investmentData){
        this.investmentData = investmentData;
        this.graphMaxNumberOfYears = new jobdatahandler().graphMaxNumberOfYears;
        this.cc = console.log;
    }

    beginCalculations(){
        this.calculateReturnPercentageAfterPullPercentage(this.investmentData)
        this.calculatePercentageReinvested(this.investmentData)
        this.calculateReturn(this.investmentData)
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

    calculateReturn(investmentData){


        return investmentData;
    }
}

export default InvestmentDataHandler;