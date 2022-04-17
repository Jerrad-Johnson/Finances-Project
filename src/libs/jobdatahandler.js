class JobDataHandler {

    constructor(jobsData){
        this.jobsData = jobsData;
        this.cc = console.log;
        this.graphMaxNumberOfYears = 15;
    }

    findLinear(){
        let linearJobs = this.findLinearIncomeJobs();
        return (this.beginLinear(linearJobs));
    }

    findStepped(){
        let steppedJobs = this.findSteppedIncomeJobs(this.jobsData);
        return (this.beginStepped(steppedJobs));
    }

    beginLinear(jobs){
        jobs = this.calculateLinearIncomeIncreaseEachYear(jobs);
        jobs = this.createIncomeArrayWithGraphYearsNumberOfSteps(jobs);
        jobs = this.sumIncomeFromLinearJob(jobs);
        jobs = this.addArrayOfNumberedYears(jobs);
        jobs = this.sumIncomeFromLinearJobByYear(jobs);
        return(jobs);
    }

    beginStepped(jobs){
        return(jobs);
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

    findSteppedIncomeJobs() {
        let steppedIncomeJobs = [];

        this.jobsData.forEach(job => {
            if (job.yearsOfExperienceAtEachStep) {
                steppedIncomeJobs.push(job);
            }
        });

        if (steppedIncomeJobs.length >= 1){
            return steppedIncomeJobs;
        }
    }

    //TODO combine ^ into single loop logic

    calculateLinearIncomeIncreaseEachYear(jobs) {
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


    createIncomeArrayWithGraphYearsNumberOfSteps(jobs) {
        this.cc(jobs)
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
        let sum = 0;
        let jobsToBeReturned = [];

        jobs.forEach(job => {
            for (let i = 0; i < 15; i++){
                sum = sum + job.incomeInGraphYearsNumberOfSteps[i];
            }

            job.linearIncomeSum = sum;
            jobsToBeReturned.push(job);
            sum = 0;
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





}

export default JobDataHandler;