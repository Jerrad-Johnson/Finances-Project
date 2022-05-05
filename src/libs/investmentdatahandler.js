import jobdatahandler from "./jobdatahandler";

class InvestmentDataHandler {

    constructor(investmentData){
        this.investmentData = investmentData;
        this.graphMaxNumberOfYears = new jobdatahandler().graphMaxNumberOfYears;
        this.cc = console.log;
    }

    beginCalculations(){
        this.calculateReturnPercentageAfterPullPercentage(this.investmentData)
        this.calculateReturn(this.investmentData)
        return this.investmentData;
    }

    calculateReturnPercentageAfterPullPercentage(investmentData){


        return investmentData;
    }

    calculateReturn(investmentData){


        return investmentData;
    }
}

export default InvestmentDataHandler;