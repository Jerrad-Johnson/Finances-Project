import JobDataHandler from "./libs/jobdatahandler";

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
    const linearIncome = new JobDataHandler(jobsData).findLinear();
    cc(linearIncome);


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