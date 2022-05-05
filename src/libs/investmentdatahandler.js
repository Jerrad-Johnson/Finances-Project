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
        /*let ceaseReinvestingYear = undefined;
        let withdrawInvestmentYear = undefined;

        if (investmentData.yearsCeaseReinvesting !== "Never"
        && investmentData.yearsWithdraw !== "Never"){
            ceaseReinvesting = investmentData.
        }*/

        let firstStop = [];

        for (let i = 0; i < this.length; i++){
            if (investmentData.yearsCeaseReinvesting[i] !== "Never"
            && investmentData.yearsWithdraw[i] !== "Never"){
                firstStop[i] = investmentData.yearsCeaseReinvesting[i];
            } else {
                firstStop[i] = investmentData.yearsCeaseReinvesting[i];
            }

        }

        /*


        for (let i = 0; i < this.length; i++){
            let firstStop = this.graphMaxNumberOfYears;



            if (){

            }

            for (let j = investmentData.yearsBegin[i]; j < firstStop; j++)

            }*/
    }


    calculateReturn(investmentData){

        return investmentData;
    }
}

export default InvestmentDataHandler;