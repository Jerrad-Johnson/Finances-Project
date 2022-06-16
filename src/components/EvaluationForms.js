import React from "react";
import {cc} from "./jobssharedfunctions";


export function sortFinancialData(financialData){
    if (financialData !== null) {
        financialData.sort((a, b) => {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            return (x > y ? 1 : -1);
        });
    }

    return financialData;
}

export function SelectOptions({financialData}){
    let printToDom = financialData.map((entry, index) => {
        return(
            <option key={index}>{entry.title}</option>
        );
    });

    return(
        <>
            {printToDom}
            <option>No Data</option>
        </>
    );
}

export function GraphOptions(){
    return (
        <>
            <option>Running Liquid Assets Sums vs. Yearly Expenses</option>
            <option>Total Assets</option>
            <option>-----</option>
            <option>Assets vs. Inflation</option>
            <option>Combined Investment Expenses</option>
            <option>Expenses by Group</option>
            <option>Income by Group</option>
            <option>Investment Income</option>
            <option>Same Year Expendable</option>
            <option>Taxes by Category</option>
            <option>Tax Percentage by Year</option>
        </> //Always update Cypress test when adding or removing a graph option.
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

function OptionsForYearRange(){
    let graphMaxLength = JSON.parse(localStorage.getItem("graphMaxLength"));
    let options = [];

    for (let i = 0; i < graphMaxLength; i = i + 5){
        options.push(`${i}-${i+5}`);
    }

    options = options.map((e, key) => {
       return ( <option key={key}>{e}</option> );
    });

    return (
        <>
            <option>Default</option>
            {options}
        </>
    );
}


function EvaluationForms({employmentState, incomeOptionState, setIncomeOptionState, incomeData, expenseOptionState,
                             setExpenseOptionState, setInvestmentOptionState, setGraphOptionState, setSecondGraphOptionState, setEmploymentState,
                             setFilingStatusState, setStTaxState, expenseData, investmentData, graphRangeState, setGraphRangeState}){

    return (
        <div className={"inputSet"}>
            <div className={"inputSelectorsCard"}>
                <span className={"inputSetTitle"}>Choose Dataset</span>
                <form>
                    <span className={"inputTitle"}>Income</span>
                    <select className={"inputSelector incomeDataset"} onChange={(event) => {
                        setIncomeOptionState(event.target.value);
                    }}>
                        <SelectOptions
                            financialData = {incomeData}
                        />
                    </select>

                    <span className={"inputTitle"}>Expenses</span>
                    <select className={"inputSelector expensesDataset"} onChange={(event) => {
                        setExpenseOptionState(event.target.value);
                    }}>
                        <SelectOptions
                            financialData = {expenseData}
                        />
                    </select>

                    <span className={"inputTitle"}>Investments</span>
                    <select className={"inputSelector investmentDataset"} onChange={(event) => {
                        setInvestmentOptionState(event.target.value);
                    }}>
                        <SelectOptions
                            financialData = {investmentData}
                        />
                    </select>

                    <span className={"inputTitle"}>Display Year Range</span>
                    <select className={"inputSelector graphRange"} onChange={(event) => {
                        setGraphRangeState(event.target.value);
                    }}>
                        <OptionsForYearRange />
                    </select>

                </form>
            </div>

            <div className={"inputSelectorsCard"}>
                <span className={"inputSetTitle"}>Additional Tax Info</span>
                <form>
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
                    <input type={"text"} className={"inputTextFieldShort"} onChange={(event) => {
                        setStTaxState(event.target.value)
                    }} />
                </form>
            </div>

            <div className={"inputSelectorsCard"}>
                <span className={"inputSetTitle"}>Graph Options</span>
                <form>
                    <span className={"inputTitle"}>First Graph</span>
                    <select className={"inputSelector firstGraph"} defaultValue={"Running Liquid Assets Sums vs. Yearly Expenses"} onChange={(event) => {
                        if (event.target.value !== "-----") setGraphOptionState(event.target.value);
                    }}>
                        <GraphOptions />
                    </select>
                </form>

                <form>
                    <span className={"inputTitle"}>Second Graph</span>
                    <select className={"inputSelector secondGraph"} defaultValue={"Total Assets"} onChange={(event) => {
                        if (event.target.value !== "-----") setSecondGraphOptionState(event.target.value);
                    }}>
                        <GraphOptions />
                    </select>
                </form>
            </div>
        </div>
    );
}

export default EvaluationForms;