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
        this.doesLinearIncomeTimeframeExceedGraphLimit(jobs);
        return(jobs);
    }

    beginStepped(jobs){
        return(jobs);
    }

    findLinearIncomeJobs() {
        let linearIncomeJobs = [];
        let testObj = {};

        this.jobsData.forEach(job => {
            if (job.immediateIncome) {
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

    doesLinearIncomeTimeframeExceedGraphLimit(jobs) {
        let jobsToBeReturned = [];
        this.cc(jobs);

        jobs.forEach(job => {
            //this.cc(job);
            if ((job.yearIncomeBegins + job.yearsToIncomeCeiling) <= this.graphMaxNumberOfYears) {
                jobsToBeReturned.push(job);
                this.cc(jobsToBeReturned);

            } else {
                throw new Error("Total years in occupation exceeds " +this.graphMaxNumberOfYears + " which" +
                    " is the graph's limit. Job by key " +  job.key + " removed from array.");
            }
        });
        return jobsToBeReturned;
    }

    calculateLinearIncomeEachYear() {

    }


    sumLinearIncome(job) {

    }

    calculateSteps() {

    }
}

export default JobDataHandler;