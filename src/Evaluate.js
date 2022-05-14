import {useEffect, useState} from "react";
let cc = console.log

function sortFinancialData(financialData){
    financialData.sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        return (x > y ? 1 : -1);
    });

    return financialData;
}


function SelectOptions({financialData}){

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


function IncomeSum({incomeData}){
    //cc(incomeData)

    return(
      <>
      </>
    );
}

function Evaluate(){
    let linearJob = JSON.parse(localStorage.getItem("linearjob"));
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob"));
    let investmentData = sortFinancialData(JSON.parse(localStorage.getItem("investmentdata")));
    let expenseData = sortFinancialData(JSON.parse(localStorage.getItem("expensedata")));
    let incomeData = sortFinancialData([...linearJob, ...steppedJob]);

    let [incomeOptionState, setIncomeOptionState] = useState(incomeData[0].title ?? []);
    let [expenseOptionState, setExpenseOptionState] = useState(expenseData[0].title ?? []);
    let [investmentOptionState, setInvestmentOptionState] = useState(investmentData[0].title ?? []);

    return (
        <div className={"container"}>
            <button onClick={(e) => {
                e.preventDefault();
                cc(incomeOptionState)
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

                <select className={"text-black"}>
                    <SelectOptions
                        financialData = {expenseData}
                    />
                </select>&nbsp;
                Expenses&nbsp;

                <select className={"text-black"}>
                    <SelectOptions
                        financialData = {investmentData}
                    />
                </select>&nbsp;
                Investments&nbsp;

                <br />
                <br />
                <select className={"text-black"}>
                    <option>4</option>
                </select>&nbsp;
                Graph Type&nbsp;

            </form>
            <br />
            <br />
            <IncomeSum
                incomeData = {incomeData}
            />
            <br />
            <span>Income $, Expenses $, Investment Value $</span>
            <br />
            <span>Difference $</span>
            <br />
            <br />
            <span>Graph Here</span>


        </div>
    );
}

export default Evaluate;