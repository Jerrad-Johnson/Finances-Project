class JobDataHandler {

    constructor(jobsData){
        this.jobsData = jobsData;
        this.cc = console.log;
        this.graphMaxNumberOfYears = 15;
    }

    findLinear(){
        let linearJobs = this.findLinearIncomeJobs(this.jobsData);
        return (this.begin(linearJobs));
    }

    findStepped(){
        let steppedJobs = this.findSteppedIncomeJobs(this.jobsData);
        return (this.begin(steppedJobs));
    }

    begin(jobs){
        return(jobs);
    }

    findLinearIncomeJobs(jobsData) {
        let linearIncomeJobs = [];

        jobsData.forEach(job => {
            if (job.immediateIncome) {
                linearIncomeJobs.push(job);
            }
        });
        if (linearIncomeJobs.length >= 1){
            return [linearIncomeJobs];
        }
    }

    findSteppedIncomeJobs(jobsData) {
        let steppedIncomeJobs = [];

        jobsData.forEach(job => {
            if (job.yearsOfExperienceAtEachStep) {
                steppedIncomeJobs.push(job);
            }
        });
        if (steppedIncomeJobs.length >= 1){
            return [steppedIncomeJobs];
        }
    }

    doesLinearIncomeTimeframeExceedLimit(job) {
        if ((job.yearIncomeBegins + job.yearsToIncomeCeiling) <= this.graphMaxNumberOfYears) {
        } else {
            //throw error: exceeds graph's limit
        }
    }

    calculateLinearIncomeEachYear() {

    }


    sumLinearIncome(job) {

    }

    calculateSteps() {

    }
}

export default JobDataHandler;