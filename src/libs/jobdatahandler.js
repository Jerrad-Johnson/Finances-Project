
class JobDataHandler {

    constructor(jobsData){
        this.jobsData = jobsData;
        this.cc = console.log;
        this.graphMaxNumberOfYears = 15;
    }



    beginLinear(){
        let job = this.jobsData;
        job = this.calculateLinearIncomeIncreaseEachYear(job);
        job = this.createLinearIncomeArrayWithGraphYearsNumberOfSteps(job);
        job = this.sumIncomeFromLinearJob(job);
        job = this.addArrayOfNumberedYears(job);
        job = this.sumIncomeFromLinearJobByYear(job);
        return(job);
    }

    beginStepped(){
        let job = this.jobsData;
        job = this.calculateSteppedIncomeIncreaseEachYear(job);
        job = this.addArrayOfNumberedYears(job);
        job = this.createSteppedSumArrayWithGraphYearsNumberOfSteps(job);
        job = this.sumSteppedJobIncome(job);
        return(job);
    }

    calculateSteppedIncomeIncreaseEachYear(job){
        let salaryAmounts = [];

            for (let i = 0; i < job.salaryYears[0] -1; i++){
                salaryAmounts.push(0);
            }

            for (let i = 0; i < job.salaryYears.length; i++) {
                for (let j = job.salaryYears[i] -1; j <= this.graphMaxNumberOfYears -1; j++) {
                    salaryAmounts[j] = job.salaryAmounts[i];
                }
            }

        job.salaryAmounts = salaryAmounts;

        return job;
    }

    createSteppedSumArrayWithGraphYearsNumberOfSteps(job){
        let salarySumByYear = [];

        salarySumByYear[0] = job.salaryAmounts[0];

       for (let i = 1; i < this.graphMaxNumberOfYears ; i++) {
           salarySumByYear[i] = +salarySumByYear[i -1] + +job.salaryAmounts[i];
       }

        job.salarySumByYear = salarySumByYear;
        return job;
    }

    sumSteppedJobIncome(job){
        let sum = 0;

           for (let i = 0; i < this.graphMaxNumberOfYears; i++) {
               sum = sum + job.salaryAmounts[i];
           }

        job.sum = +sum;
        return job;
    }

    findLinearIncomeJobs() {
        let linearIncomeJobs = [];

        this.jobsData.forEach(job => {
            if (job.incomeImmediate) {
                linearIncomeJobs.push(job);
            }
        });

        if (linearIncomeJobs.length >= 1){
            return linearIncomeJobs;
        }
    }

    calculateLinearIncomeIncreaseEachYear(job){
        let incomeIncreaseOverCareer;

            if ((job.yearToIncomeCeiling - job.yearIncomeBegins) >= 1) {
                incomeIncreaseOverCareer = job.incomeCeiling - job.incomeImmediate;
                job.incomeIncreasePerYear = (incomeIncreaseOverCareer /
                    (job.yearToIncomeCeiling - job.yearIncomeBegins)).toFixed(2);
                job.incomeIncreasePerYear = +job.incomeIncreasePerYear
            } else {
                job.incomeIncreasePerYear = 0;
            }

            //TODO Add UI limiter; ceiling cannot be >= immediate.
            //TODO Ceiling year cannot be greater than 13 (14).
        return job;
    }

    createLinearIncomeArrayWithGraphYearsNumberOfSteps(job){
        let incomeInGraphYearsNumberOfSteps = [];
        let runningTotalSalary = 0 ;
        let roundedValue;

        for (let i = 0; i <= job.yearIncomeBegins; i++){
            incomeInGraphYearsNumberOfSteps[i] = 0;
        }

        for (let i = job.yearIncomeBegins; i <= job.yearToIncomeCeiling; i++){
            roundedValue = Math.round(job.incomeImmediate + +runningTotalSalary)
            incomeInGraphYearsNumberOfSteps[i] = roundedValue
            runningTotalSalary = (runningTotalSalary + job.incomeIncreasePerYear);
        }

        for (let i = job.yearToIncomeCeiling +1; i <= 14; i++){
            incomeInGraphYearsNumberOfSteps[i] = job.incomeCeiling;
        }

        job.incomeInGraphYearsNumberOfSteps = incomeInGraphYearsNumberOfSteps;
        runningTotalSalary = 0;
        incomeInGraphYearsNumberOfSteps = [];

        return job;
    }

    sumIncomeFromLinearJob(job){
        let countSum = 0;

        for (let i = 0; i < this.graphMaxNumberOfYears; i++){
            countSum = countSum + job.incomeInGraphYearsNumberOfSteps[i];
        }

        job.sum = countSum;
        countSum = 0;

        return job;
    }

    sumIncomeFromLinearJobByYear(job){
        let currentIterationSum = 0;
        let sumIncomeByYear = [];

        for (let i = 0; i < 15; i++){
            currentIterationSum = (currentIterationSum + job.incomeInGraphYearsNumberOfSteps[i]);
            sumIncomeByYear[i] = currentIterationSum;
        }

        job.sumIncomeByYear = sumIncomeByYear;
        currentIterationSum = 0;

        return job;
    }

    addArrayOfNumberedYears(job){
        let yearNumbers = [];

        for (let i = 0; i <= (this.graphMaxNumberOfYears - 1); i++){
            yearNumbers[i] = "Year " + (i + 1);
        }

        job.yearsNumbered = yearNumbers;

        return job;
    }

}

export default JobDataHandler;