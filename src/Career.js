let jobsData =
[{
    yearsOfExperienceAtEachStep:
        [0, 4, 5, 8],
    incomeAtBeginningOfEachStep:
        [60000, 120000, 150000, 300000],
},{
    immediateIncome: 35000,
    incomeCeiling: 70000,
    yearIncomeBegins: 5,
    yearsToIncomeCeiling: 5,
}];

let graphMaxNumberOfYears = 15 - 1;



var cc = console.log;

function JobContainer({jobsData}) {
    //let x = separateLinearAndSteppedIncomeJobs(jobsData);

/*    function separateLinearAndSteppedIncomeJobs(jobsData){
        let steppedIncomeJobs = [], linearIncomeJobs = [];

        jobsData.forEach(job => {
            if (job.yearsOfExperienceAtEachStep){
                steppedIncomeJobs.push(job);
            } else if (job.immediateIncome) {
                linearIncomeJobs.push(job);
            }
        });

        return [steppedIncomeJobs, linearIncomeJobs];
    }*/

    let y = findLinearIncomeJobs(jobsData);
    let z = findSteppedIncomeJobs(jobsData);

    cc( y, z );

    function findLinearIncomeJobs(jobsData){
        let linearIncomeJobs = [];

        jobsData.forEach(job => {
            if (job.immediateIncome) {
                linearIncomeJobs.push(job);
            }
        });

        return [linearIncomeJobs];
    }

    function findSteppedIncomeJobs(jobsData){
        let steppedIncomeJobs = [];

        jobsData.forEach(job => {
            if (job.yearsOfExperienceAtEachStep) {
                steppedIncomeJobs.push(job);
            }
        });

        return [steppedIncomeJobs];
    }



    function doesLinearIncomeTimeframeExceedLimit(job){
        cc(job);
        if ((job.yearIncomeBegins + job.yearsToIncomeCeiling) <= graphMaxNumberOfYears){
        } else {
            //throw error: exceeds graph's limit
        }
    }

    function calculateLinearIncomeEachYear(){

    }


    function sumLinearIncome(job){

    }

    function calculateSteps(){

    }

    return (
      <>
          <span></span>
      </>
    );

}

function Career() {
    return (
      <>
          <span>Test</span>
          <br />
          <JobContainer
               jobsData = {jobsData}
          />
      </>
    );
}

export default Career;