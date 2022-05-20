class CreateNewDataForEvaluationGraphs {
    constructor(income, expenses, investments, taxes = []) {
        this.income = this.makeLinearAndSteppedJobKeyNamingConsistent(income);
        this.expenses = expenses;
        this.investments = investments;
        this.taxes = taxes;
        this.cc = console.dir;
    }

    begin(){
        let ck = this.checkIfEmptyArray;

        return {};
    }

    makeLinearAndSteppedJobKeyNamingConsistent(oldIncomeData){
        let newIncomeData = {};
        newIncomeData.incomeSumByYear = oldIncomeData.incomeInGraphYearsNumberOfSteps || oldIncomeData.salaryAmounts;
        newIncomeData.incomeRunningSumByYear = oldIncomeData.sumIncomeByYear || oldIncomeData.salarySumByYear;
        newIncomeData.incomeSum = oldIncomeData.sum;
        newIncomeData.incomeTitle = oldIncomeData.title;

        return newIncomeData
    }

    /*checkIfObject(x){
        if (typeof x === 'object' && !Array.isArray(x) && x !== null){
    }*/

    checkIfEmptyArray(x){
        return (Array.isArray(x) && x.length === 0);
    }

}

export default CreateNewDataForEvaluationGraphs;