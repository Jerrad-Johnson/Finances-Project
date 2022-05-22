import React from "react";
import {cc} from "./jobssharedfunctions";

export function sortFinancialData(financialData){
    financialData.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        return (x > y ? 1 : -1);
    });

    return financialData;
}

export function SelectOptions({financialData}){
    if (!financialData[0]) {
        return (
            <>
                <option>No Data</option>
            </>
        );
    }

    let printToDom = financialData.map((entry, index) => {
        return(
            <option key={index}>{entry.title}</option>
        );
    });

    return(
        <>
            {printToDom}
        </>
    );
}

export function GraphOptions(){
    return (
        <>
            <option>Yearly In Pocket</option>
            <option>Running Sum</option>
        </>
    );
}


export function PrintSum({title, financialData, typeOfFinancialData, valueKeyToFind = "sum"}){
    if (!financialData[0]) { return; }

    let getCurrentEntry = financialData.filter((e) => {
        return e.title === title;
    });

    let sum = getCurrentEntry[0][valueKeyToFind];

    return(
        <span className={"sum" + typeOfFinancialData}>
          {sum}
      </span>
    );
}

function EvaluationForms({employmentState, incomeOptionState, setIncomeOptionState, incomeData, expenseOptionState,
                             setExpenseOptionState, setInvestmentOptionState, setGraphOptionState, setEmploymentState,
                             setFilingStatusState, setStTaxState, expenseData, investmentData}){

    return (
        <div className={"inputSet"}>
{/*            <button onClick={(e) => {
                e.preventDefault();
                cc(employmentState);
            }}>Log</button>
            <br />*/}
            <div className={"inputSelectorsCard"}>
                <span className={"inputSetTitle"}>Choose Dataset</span>
                <form>
                    <span className={"inputTitle"}>Income</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setIncomeOptionState(event.target.value);
                    }}>
                        <SelectOptions
                            financialData = {incomeData}
                        />
                    </select>

                    <span className={"inputTitle"}>Expenses</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setExpenseOptionState(event.target.value);
                    }}>
                        <SelectOptions
                            financialData = {expenseData}
                        />
                    </select>

                    <span className={"inputTitle"}>Investments</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setInvestmentOptionState(event.target.value);
                    }}>
                        <SelectOptions
                            financialData = {investmentData}
                        />
                    </select>
                </form>
            </div>

            <div className={"inputSelectorsCard"}>
                <span className={"inputSetTitle"}>Additional Tax Info</span>
                <form>
                    <span className={"inputTitle"}>Graph Type</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setGraphOptionState(event.target.value);
                    }}>
                        <GraphOptions />
                    </select>

                    <span className={"inputTitle"}>Employment Type</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setEmploymentState(event.target.value);
                    }}>
                        <option>Employee</option>
                        <option>Self-Employed</option>
                    </select>

                    <span className={"inputTitle"}>Filing Status</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setFilingStatusState(event.target.value);
                    }}>
                        <option>Single</option>
                        <option>Married - Joint Return</option>
                        <option>Married - Separate Returns</option>
                        <option>Head of Household</option>
                    </select>

                    <span className={"inputTitle"}>State Income Tax</span>
                    <input type={"text"} className={"inputTextField"} onChange={(event) => {
                        setStTaxState(event.target.value)
                    }} />
                </form>
            </div>

            <div className={"inputSelectorsCard"}>
                <span className={"inputSetTitle"}>Graph Options</span>
                <form>
                    <span className={"inputTitle"}>First Graph</span>
                    <select className={"inputSelector"} onChange={(event) => {
                        setGraphOptionState(event.target.value);
                    }}>
                        <GraphOptions />
                    </select>
                </form>

                <form>
                    <span className={"inputTitle"}>Second Graph</span>
                    <select className={"inputSelector"}>
                        <GraphOptions />
                    </select>
                </form>
            </div>


            {/*
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
            <br />*/}
        </div>
    );
}

export default EvaluationForms;