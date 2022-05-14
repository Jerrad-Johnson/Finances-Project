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

function GraphOptions(){
    return (
        <>
            <option>Yearly Sum</option>
            <option>Running Sum</option>
        </>
    );
}


function PrintSum({title, financialData, typeOfFinancialData, valueKeyToFind = "sum"}){
    let getCurrentEntry = financialData.filter((e) => {
       return e.title == title;
    });

    let sum = getCurrentEntry[0][valueKeyToFind];

    return(
      <span className={"sum" + typeOfFinancialData}>
          {sum}
      </span>
    );
}

/*function onChangeFinancialSheet(setCombinedFinancialSheetsState, incomeOptionState, expenseOptionState,
                                investmentOptionState, incomeData, expenseData, investmentData){

    let incomeSheet = incomeData.filter((e) => {
        return e.title == incomeOptionState;
    });

    let expenseSheet = expenseData.filter((e) => {
        return e.title == expenseOptionState;
    });

    let investmentSheet = investmentData.filter((e) => {
        return e.title == investmentOptionState;
    });

    let combinedFinancialSheets = [incomeSheet, expenseSheet, investmentSheet];

    getSingle

    setCombinedFinancialSheetsState(combinedFinancialSheets);

}*/

function EvaluationGraphs({incomeOptionState, expenseOptionState, investmentOptionState, graphOptionState,
                              incomeData, expenseData, investmentData}){



}

function Evaluate(){
    let linearJob = JSON.parse(localStorage.getItem("linearjob"));
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob"));
    let investmentData = sortFinancialData(JSON.parse(localStorage.getItem("investmentdata")));
    let expenseData = sortFinancialData(JSON.parse(localStorage.getItem("expensedata")));
    let incomeData = sortFinancialData([...linearJob, ...steppedJob]);
    //cc(investmentData)
    /*let initialCombinedFinancialSheetState = [
        investmentData[0], expenseData[0], incomeData[0]
    ];*/


    //cc(initialCombinedFinancialSheetState)

    let [incomeOptionState, setIncomeOptionState] = useState(incomeData[0].title ?? []);
    let [expenseOptionState, setExpenseOptionState] = useState(expenseData[0].title ?? []);
    let [investmentOptionState, setInvestmentOptionState] = useState(investmentData[0].title ?? []);
    let [graphOptionState, setGraphOptionState] = useState("Yearly Sum");
    //let [combinedFinancialSheetsState, setCombinedFinancialSheetsState] = useState(initialCombinedFinancialSheetState);

    return (
        <div className={"container"}>
            <button onClick={(e) => {
                e.preventDefault();
                cc(graphOptionState);
            }}>Log</button>
            <br />

            <form>
                <select className={"text-black"} onChange={(event) => {
                    setIncomeOptionState(event.target.value);
                    /*onChangeFinancialSheet(setCombinedFinancialSheetsState, incomeOptionState, expenseOptionState,
                        investmentOptionState, incomeData, expenseData, investmentData);*/
                }}>
                    <SelectOptions
                        financialData = {incomeData}
                    />
                </select> &nbsp;
                Income &nbsp;

                <select className={"text-black"} onChange={(event) => {
                    setExpenseOptionState(event.target.value);
                   /* onChangeFinancialSheet(setCombinedFinancialSheetsState, incomeOptionState, expenseOptionState,
                        investmentOptionState, incomeData, expenseData, investmentData);*/
                }}>
                    <SelectOptions
                        financialData = {expenseData}
                    />
                </select>&nbsp;
                Expenses&nbsp;

                <select className={"text-black"} onChange={(event) => {
                    setInvestmentOptionState(event.target.value);
                    /*onChangeFinancialSheet(setCombinedFinancialSheetsState, incomeOptionState, expenseOptionState,
                        investmentOptionState, incomeData, expenseData, investmentData);*/
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
            />


        </div>
    );
}

export default Evaluate;