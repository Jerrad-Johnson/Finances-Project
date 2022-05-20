import React from "react";

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