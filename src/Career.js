let jobsData = [{
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

let cc = console.log;

function JobContainer({jobsData}) {
    cc(jobsData);
    checkIsIncomeLinearOrStepped(jobsData);

    function checkIsIncomeLinearOrStepped(jobsData){
        jobsData.forEach(job => {
            if (job.yearsOfExperienceAtEachStep){
                cc("stepped");
            } else if (job.yearsOfExperienceAtEachStep) {
                sumLinearIncome(job);
            } else {
                //throw error: value not set
            }
        });
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