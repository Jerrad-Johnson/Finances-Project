import React, {useState} from "react";
import {sortFinancialData, SelectOptions, GraphOptions, PrintSum} from "./components/EvaluationForms";
import EvaluationGraphs from "./components/EvaluationGraphs";
import EvaluationGeneralData from "./components/EvaluationGeneralData";
import EvaluationForms from "./components/EvaluationForms";
let cc = console.dir

function Evaluate(){
    let incomeData = [];
    let linearJob = JSON.parse(localStorage.getItem("linearjob")) ?? [];
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob")) ?? [];
    let investmentData = sortFinancialData(JSON.parse(localStorage.getItem("investmentdata"))) ?? [];
    let expenseData = sortFinancialData(JSON.parse(localStorage.getItem("expensedata"))) ?? [];
    if (linearJob || steppedJob) { incomeData = sortFinancialData([...linearJob, ...steppedJob]) ?? []; }
    let [incomeOptionState, setIncomeOptionState] = useState(checkExistence(incomeData));
    let [expenseOptionState, setExpenseOptionState] = useState(checkExistence(expenseData));
    let [investmentOptionState, setInvestmentOptionState] = useState(checkExistence(investmentData));
    let [graphOptionState, setGraphOptionState] = useState("Expenses by Group");
    let [secondGraphOptionState, setSecondGraphOptionState] = useState("Expenses by Group");
    let [employmentState, setEmploymentState] = useState("Employee");
    let [filingStatusState, setFilingStatusState] = useState("Single");
    let [stTaxState, setStTaxState] = useState("0");

    return(
        <div className={"container"}>
            <div className={"pairs"}>
                <div className={"left"}>
                    <EvaluationForms
                        employmentState = {employmentState}
                        incomeOptionState = {incomeOptionState}
                        setIncomeOptionState = {setIncomeOptionState}
                        incomeData = {incomeData}
                        expenseOptionState = {expenseOptionState}
                        setExpenseOptionState = {setExpenseOptionState}
                        setInvestmentOptionState = {setInvestmentOptionState}
                        setGraphOptionState = {setGraphOptionState}
                        setSecondGraphOptionState = {setSecondGraphOptionState}
                        setEmploymentState = {setEmploymentState}
                        setFilingStatusState = {setFilingStatusState}
                        setStTaxState = {setStTaxState}
                        expenseData = {expenseData}
                        investmentData = {investmentData}
                    />
                </div>

                <div className={"right"}>
                    <EvaluationGraphs
                        incomeOptionState = {incomeOptionState}
                        expenseOptionState = {expenseOptionState}
                        investmentOptionState = {investmentOptionState}
                        graphOptionState = {graphOptionState}
                        secondGraphOptionState = {secondGraphOptionState}
                        incomeData = {incomeData}
                        expenseData = {expenseData}
                        investmentData = {investmentData}
                        employmentState = {employmentState}
                        filingStatusState = {filingStatusState}
                        stTaxState = {stTaxState}
                    />
                </div>
            </div>
            <EvaluationGeneralData />
        </div>
    );
}

function checkExistence(financialData){
    let toBeReturned;

    financialData[0]?.title ? toBeReturned = financialData[0].title : toBeReturned = "No Data";

    return toBeReturned;
}

export default Evaluate;