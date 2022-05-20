import React, {useState} from "react";
import {sortFinancialData, SelectOptions, GraphOptions, PrintSum} from "./components/EvaluationForms";
import EvaluationGraphs from "./components/EvaluationGraphs";
let cc = console.dir

function Evaluate(){
    let linearJob = JSON.parse(localStorage.getItem("linearjob"));
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob"));
    let investmentData = sortFinancialData(JSON.parse(localStorage.getItem("investmentdata"))) ?? [];
    let expenseData = sortFinancialData(JSON.parse(localStorage.getItem("expensedata"))) ?? [];
    let incomeData = sortFinancialData([...linearJob, ...steppedJob]) ?? [];
    let [incomeOptionState, setIncomeOptionState] = useState(checkExistence(incomeData));
    let [expenseOptionState, setExpenseOptionState] = useState(checkExistence(expenseData));
    let [investmentOptionState, setInvestmentOptionState] = useState(checkExistence(investmentData));
    let [graphOptionState, setGraphOptionState] = useState("Yearly In Pocket");
    let [employmentState, setEmploymentState] = useState("Employee");
    let [filingStatusState, setFilingStatusState] = useState("Single");
    let [stTaxState, setStTaxState] = useState("0");

    return(
        <div className={"container"}>
            <button onClick={(e) => {
                e.preventDefault();
                cc(employmentState);
            }}>Log</button>
            <br />

            <form>
                <select className={"text-black"} onChange={(event) => {
                    setIncomeOptionState(event.target.value);
                }}>
                    <SelectOptions
                        financialData = {incomeData}
                    />
                </select> &nbsp;
                Income &nbsp;

                <select className={"text-black"} onChange={(event) => {
                    setExpenseOptionState(event.target.value);
                }}>
                    <SelectOptions
                        financialData = {expenseData}
                    />
                </select>&nbsp;
                Expenses&nbsp;

                <select className={"text-black"} onChange={(event) => {
                    setInvestmentOptionState(event.target.value);
                }}>
                    <SelectOptions
                        financialData = {investmentData}
                    />
                </select>&nbsp;
                Investments&nbsp;
                <br />
                <br />

                <select className={"text-black"} onChange={(event) => {
                    setGraphOptionState(event.target.value);
                }}>
                    <GraphOptions />
                </select>&nbsp;
                Graph Type&nbsp;
                <br />
                <br />

                <select className={"text-black"} onChange={(event) => {
                    setEmploymentState(event.target.value);
                }}>
                    <option>Employee</option>
                    <option>Self-Employed</option>
                </select>&nbsp;
                Employment Type&nbsp;
                <br />

                <select className={"text-black"} onChange={(event) => {
                    setFilingStatusState(event.target.value);
                }}>
                    <option>Single</option>
                    <option>Married - Joint Return</option>
                    <option>Married - Separate Returns</option>
                    <option>Head of Household</option>
                </select>&nbsp;
                Filing Status&nbsp;
                <br />

                <input type={"text"} onChange={(event) => {
                    setStTaxState(event.target.value)
                }} />
                State Income Tax&nbsp;
                <br />

            </form>
            <br />
            <br />
            <PrintSum
                title = {incomeOptionState}
                financialData = {incomeData}
                typeOfFinancialData = {"income"}
            /> Income
            <br />
            <PrintSum
                title = {expenseOptionState}
                financialData = {expenseData}
                typeOfFinancialData = {"expense"}
            /> Expenses
            <br />
            <span>Income $, Expenses $, Investment Value $</span>
            <br />
            <span>Difference $</span>
            <br />
            <br />
            <EvaluationGraphs
                incomeOptionState = {incomeOptionState}
                expenseOptionState = {expenseOptionState}
                investmentOptionState = {investmentOptionState}
                graphOptionState = {graphOptionState}
                incomeData = {incomeData}
                expenseData = {expenseData}
                investmentData = {investmentData}
                employmentState = {employmentState}
                filingStatusState = {filingStatusState}
                stTaxState = {stTaxState}
            />
        </div>
    );
}

function checkExistence(financialData){
    let toBeReturned;

    financialData[0]?.title ? toBeReturned = financialData[0].title : toBeReturned = "No Data";

    return toBeReturned;
}

export default Evaluate;