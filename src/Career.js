let jobsData = [{
    job1: {
        yearsOfExperienceAtEachStep:
            [0, 4, 5, 8],
        incomeAtBeginningOfEachStep:
            [60000, 120000, 150000, 300000],
    }
},{
    job2: {
        immediateIncome: 35000,
        incomeCeiling: 70000,
        yearsToIncomeCeiling: 5,
    }
}];

let cc = console.log;

function JobContainer({jobsData}) {

    //let stepsInIncome = 4; array makes this redundant; count via index.
    //let incomeAtEachStep = [60000, 120000, 150000, 300000];
    //let yearsOfExperienceAtEachStep = [0, 4, 5, 8];

    //
    //let beginningSalary = 25000;
    //let endSalary = 80000;

    cc(jobsData);

    function checkIsIncomeLinearOrStepped(){

    }

    function checkIfStepsExist(){

    }

    function sumIncome(){


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