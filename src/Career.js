import JobDataHandler from "./libs/jobdatahandler";

let jobsData =
    [{
        yearsOfExperienceAtEachStep:
            [0, 4, 5, 8],
        incomeAtBeginningOfEachStep:
            [60000, 120000, 150000, 300000],
        key: 0,
    },{
        immediateIncome: 35000,
        incomeCeiling: 70000,
        yearIncomeBegins: 5,
        yearToIncomeCeiling: 10,
        key: 1,
    }];

var cc = console.log;


function JobContainer({jobsData}) {
    const linearIncome = new JobDataHandler(jobsData).findLinear();
    //const steppedIncome = new JobDataHandler(jobsData).findStepped();


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