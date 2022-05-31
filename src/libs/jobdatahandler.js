
class JobDataHandler {

    constructor(jobsData){
        this.jobsData = jobsData;
        this.cc = console.log;
        this.graphMaxNumberOfYears = 15;
        this.inflationRate = 1.038;
    }

    findLinear(){
        let linearJobs = this.findLinearIncomeJobs();
        return (this.beginLinear(linearJobs));
    }

    findStepped(){
        let steppedJobs = this.findSteppedIncomeJobs();
        return (this.beginStepped(steppedJobs));
    }

    beginLinear(jobs){
        jobs = this.calculateLinearIncomeIncreaseEachYear(jobs);
        jobs = this.createLinearIncomeArrayWithGraphYearsNumberOfSteps(jobs);
        jobs = this.adjustForInflation(jobs);
        jobs = this.sumIncomeFromLinearJob(jobs);
        jobs = this.addArrayOfNumberedYears(jobs);
        jobs = this.sumIncomeFromLinearJobByYear(jobs);
        return(jobs);
    }

    beginStepped(jobs){
        jobs = this.calculateSteppedIncomeIncreaseEachYear(jobs);
        jobs = this.adjustForInflation(jobs);
        jobs = this.addArrayOfNumberedYears(jobs);
        jobs = this.createSteppedSumArrayWithGraphYearsNumberOfSteps(jobs);
        jobs = this.sumSteppedJobIncome(jobs);
        return(jobs);
    }

    findSteppedIncomeJobs() {
        let steppedIncomeJobs = [];

        this.jobsData.forEach(job => {
            if (job.title) {
                steppedIncomeJobs.push(job);
            }
        });

        if (steppedIncomeJobs.length >= 1) {
            return steppedIncomeJobs;
        }
    }
    //TODO combine ^ into single loop logic

    calculateSteppedIncomeIncreaseEachYear(jobs){
        let salaryAmounts = [];

        jobs.forEach(job => {
            for (let i = 0; i < job.salaryYears[0] -1; i++){
                salaryAmounts.push(0);
            }
        });

        jobs.forEach(job => {
            for (let i = 0; i < job.salaryYears.length; i++) {
                for (let j = job.salaryYears[i] -1; j <= this.graphMaxNumberOfYears -1; j++) {
                    salaryAmounts[j] = job.salaryAmounts[i];
                }
            }
        });

        jobs[0].salaryAmounts = salaryAmounts;
        return jobs;
    }

    createSteppedSumArrayWithGraphYearsNumberOfSteps(jobs){
        let salarySumByYear = [];

        jobs.forEach(job => {

            salarySumByYear[0] = job.salaryAmounts[0];

           for (let i = 1; i < this.graphMaxNumberOfYears ; i++) {
               salarySumByYear[i] = +salarySumByYear[i -1] + +job.salaryAmounts[i];
           }
        });

        jobs[0].salarySumByYear = salarySumByYear;
        return jobs;
    }

    sumSteppedJobIncome(jobs){
        let sum = 0;

        jobs.forEach(job => {
           for (let i = 0; i < this.graphMaxNumberOfYears; i++) {
               sum = sum + job.salaryAmounts[i];
           }
        });

        jobs[0].sum = +sum;
        return jobs;
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

    calculateLinearIncomeIncreaseEachYear(jobs){
        let incomeIncreaseOverCareer;
        let jobsToBeReturned = [];

        jobs.forEach(job => {
            if ((job.yearToIncomeCeiling - job.yearIncomeBegins) >= 1) {
                incomeIncreaseOverCareer = job.incomeCeiling - job.incomeImmediate;
                job.incomeIncreasePerYear = (incomeIncreaseOverCareer /
                    (job.yearToIncomeCeiling - job.yearIncomeBegins)).toFixed(2);
                job.incomeIncreasePerYear = +job.incomeIncreasePerYear
                jobsToBeReturned.push(job);
            } else {
                job.incomeIncreasePerYear = 0;
                jobsToBeReturned.push(job);
            }
        });
            //TODO Add UI limiter; ceiling cannot be >= immediate.
            //TODO Ceiling year cannot be greater than 13 (14).
        return jobsToBeReturned;
    }

    createLinearIncomeArrayWithGraphYearsNumberOfSteps(jobs){
        let incomeInGraphYearsNumberOfSteps = [];
        let runningTotalSalary = 0 ;
        let jobsToBeReturned = [];
        let roundedValue;

        jobs.forEach(job => {
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
            jobsToBeReturned.push(job);
            runningTotalSalary = 0
            incomeInGraphYearsNumberOfSteps = [];
        });

        return jobsToBeReturned;
    }

    sumIncomeFromLinearJob(jobs){
        let countSum = 0;
        let jobsToBeReturned = [];

        jobs.forEach(job => {
            for (let i = 0; i < this.graphMaxNumberOfYears; i++){
                countSum = countSum + job.incomeInGraphYearsNumberOfSteps[i];
            }

            job.sum = countSum;
            jobsToBeReturned.push(job);
            countSum = 0;
        });

        return jobsToBeReturned;
    }

    sumIncomeFromLinearJobByYear(jobs){
        let jobsToBeReturned = [];
        let currentIterationSum = 0;
        let sumIncomeByYear = [];

        jobs.forEach(job => {
            for (let i = 0; i < 15; i++){
                currentIterationSum = (currentIterationSum + job.incomeInGraphYearsNumberOfSteps[i]);
                sumIncomeByYear[i] = currentIterationSum;
            }

            job.sumIncomeByYear = sumIncomeByYear;
            jobsToBeReturned.push(job);
            currentIterationSum = 0;
        });

        return jobsToBeReturned
    }

    addArrayOfNumberedYears(jobs){
        let jobsToBeReturned = [];
        let yearNumbers = [];

        jobs.forEach(job => {
            for (let i = 0; i <= (this.graphMaxNumberOfYears - 1); i++){
                yearNumbers[i] = "Year " + (i + 1);
            }

            job.yearsNumbered = yearNumbers;
            jobsToBeReturned.push(job);
        });

        return jobsToBeReturned;
    }

    adjustForInflation(jobs){

        if (jobs[0].adjustForInflation === true && jobs[0].salaryAmounts){
            for (let i = jobs[0].salaryYears[0]; i < this.graphMaxNumberOfYears; i++) {
                jobs[0].salaryAmounts[i] = Math.round((jobs[0].salaryAmounts[i] * this.getInflationPercentage([i])));
            }
        } else if (jobs[0].adjustForInflation === true && jobs[0].incomeInGraphYearsNumberOfSteps){
            for (let i = jobs[0].yearIncomeBegins; i < this.graphMaxNumberOfYears; i++) {
                jobs[0].incomeInGraphYearsNumberOfSteps[i]
                    = Math.round((jobs[0].incomeInGraphYearsNumberOfSteps[i] * this.getInflationPercentage([i])));
            }
        }

        return jobs;
    }

    getInflationPercentage(iterations, percentage = 1){
        percentage = (percentage * this.inflationRate);

        if (iterations > 0){
            iterations--
            percentage = this.getInflationPercentage(iterations, percentage);
        }

        return percentage;
    }





}

export default JobDataHandler;