import {isNumeric} from "../libs/genericFunctions";
import Investmentdatahandler from "../libs/datahandlers/InvestmentDataHandler";
import {errorHandler} from "../libs/errorHandler";
let cc = console.log;

export function SubmitButton({investmentsState, setInvestmentsState, graphKey, setGraphKey}){

    return (
        <>
            <br />
            <button className={"submitinvestment"} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmission(investmentsState, setInvestmentsState, graphKey, setGraphKey);
            }}>Submit</button>
        </>
    );
}

function handleSubmission(investmentsState, setInvestmentsState, graphKey, setGraphKey){
    let investmentData = getInvestmentDataFromFields();
        investmentData = castInvestmentData(investmentData);
        try {
            investmentData = checkInvestmentData(investmentData);
        } catch (e) {
            return errorHandler(e);
        }

        investmentData = runCalculationsOnInvestmentData(investmentData);
    addInvestment(investmentData, investmentsState, setInvestmentsState, graphKey, setGraphKey);
}

function getInvestmentDataFromFields(){
    let title = document.querySelector(".investmentstitle");
    let labels = document.querySelectorAll(".label");
    let amounts = document.querySelectorAll(".amount");
    let yearsBegin = document.querySelectorAll(".yearBegin");
    let yearsWithdraw = document.querySelectorAll(".yearWithdraw");
    let yearsCeaseReinvesting = document.querySelectorAll(".yearCeaseReinvesting");
    let percentReturn = document.querySelectorAll(".percentreturn");
    let percentToPull = document.querySelectorAll(".percentpull");
    let additionalInvestment = document.querySelectorAll(".additionalinvestment");

    let investmentData = {
        title: title.value,
        additionalInvestment: [],
        amounts: [],
        labels: [],
        percentReturn: [],
        percentToPull: [],
        yearsBegin: [],
        yearsCeaseReinvesting: [],
        yearsWithdraw: [],
    };

    labels.forEach((e) => {
        investmentData.labels.push(e.value);
    });

    amounts.forEach((e) => {
        investmentData.amounts.push(+e.value);
    });

    yearsBegin.forEach((e) => {
        investmentData.yearsBegin.push(+e.value);
    });

    yearsWithdraw.forEach((e) => {
        investmentData.yearsWithdraw.push(e.value);
    });

    yearsCeaseReinvesting.forEach((e) => {
        investmentData.yearsCeaseReinvesting.push(e.value);
    });

    percentReturn.forEach((e) => {
        investmentData.percentReturn.push(+e.value);
    });

    percentToPull.forEach((e) => {
        investmentData.percentToPull.push(+e.value);
    });

    additionalInvestment.forEach((e) => {
        investmentData.additionalInvestment.push(+e.value);
    });

    return investmentData;
}

function castInvestmentData(investmentData){
    let length = investmentData.labels.length;

    for (let i = 0; i < length; i++) {
        if (investmentData.yearsWithdraw[i] !== "Never") {
            investmentData.yearsWithdraw[i] = +investmentData.yearsWithdraw[i];
        }

        if (investmentData.yearsCeaseReinvesting[i] !== "Never") {
            investmentData.yearsCeaseReinvesting[i] = +investmentData.yearsCeaseReinvesting[i];
        }
    }

    return investmentData;
}


export function checkInvestmentData(investmentData){
    let length = investmentData.labels.length;

    if (investmentData.title == '' || undefined){
        throw new Error("Please enter a title.");
    }

    for (let i = 0; i < length; i++){
        if (investmentData.labels[i] == '' || undefined){
            throw new Error("Please enter a label for every investment.");
        }
    }

    for (let i = 0; i < length; i++){
        if (investmentData.amounts[i] == '' || undefined) {
            throw new Error("Please enter an amount to invest in every investment field.");
        } else if (!isNumeric(investmentData.amounts[i])) {
            throw new Error("Please use only numbers in the amount field.");
        }
    }

    for (let i = 0; i < length; i++){
        if (investmentData.yearsBegin[i] >= investmentData.yearsWithdraw[i]){
            throw new Error("Please do not withdraw your money until at least one year after investing it.");
        } else if (investmentData.yearsBegin[i] >= investmentData.yearsCeaseReinvesting[i] -1) {
            throw new Error("Please do not stop reinvesting your money until at least two years after investing it.");
        }

        if (investmentData.yearsWithdraw[i] !== "Never") {
            if ((investmentData.yearsWithdraw[i] < investmentData.yearsCeaseReinvesting[i])
                && (investmentData.yearsCeaseReinvesting[i] !== "Never")) {
                throw new Error("Please do not withdraw your money before you stop reinvesting it.");
            }
        }
    }

    for (let i = 0; i < length; i++){
        if (!isNumeric(investmentData.percentReturn[i]) || investmentData.percentReturn[i] === ''){
            throw new Error("Please enter a number in the percent return field.");
        } else if (investmentData.percentReturn[i] === 0){
            throw new Error("Please enter a number greater than 0 in the expected return percentage field.");
        }
    }

    for (let i = 0; i < length; i++){
        if (!isNumeric(investmentData.percentToPull[i])){
            throw new Error("Please only enter numbers in the percent-to-pull field, or leave it blank.");
        } else if (isNumeric(investmentData.percentToPull[i]) && investmentData.percentToPull[i] > 100){
            throw new Error("Percent to pull cannot be greater than 100.");
        }
    }

    for (let i = 0; i < length; i++) {
        if (!isNumeric(investmentData.additionalInvestment[i])) {
            throw new Error("Please only enter numbers in the additional investment field.");
        } else if ((investmentData.yearsBegin[i] >= investmentData.yearsWithdraw[i] - 1) && investmentData.additionalInvestment !== 0) {
            throw new Error("You can input additional investments only if there's at least a two-year gap from the year of your first investment to the year that you withdraw your money.");
        } else if (investmentData.yearsBegin[i] >= 14 && investmentData.additionalInvestment[i] !== 0) {
            throw new Error("The year of your first investment must be before 14 if you'd like to have additional investments.");
        }
    }

    return investmentData;
}

function runCalculationsOnInvestmentData(investmentData){
    let calculator = new Investmentdatahandler(investmentData);
    investmentData = calculator.beginCalculations();
    return investmentData;
}

function addInvestment(investmentData, investmentsState, setInvestmentsState, graphKey, setGraphKey){
    investmentData.key = graphKey;
    setGraphKey(graphKey+1);

    let newState = [];
    investmentData = [investmentData];

    if (investmentsState !== undefined) {
        newState = [...investmentData, ...investmentsState];
    }

    setInvestmentsState(newState);
}