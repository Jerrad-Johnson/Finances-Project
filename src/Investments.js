import {useState} from "react";
import Investmentdatahandler from "./libs/investmentdatahandler";
import {createArrayWithNumberOfYearsToGraph, isNumeric} from "./components/jobssharedfunctions";

let cc = console.log;

function Investments(){
    return (
      <div id={"investmentcontainer"}>
        <FormContainer />
      </div>
    );
}

export function FormContainer(){
    let [formLengthState, setFormLengthState] = useState([0]);
    let [investmentsState, setInvestmentsState] = useState();

    return (
        <div id="formcontainer">
            <form>
                <br />
                Note that the graphed values do not include adjustment for inflation or taxes and are correct only as relative values, but are highly inaccurate as absolute values. The appropriate adjustments will be made on the final page.
                <br />
                <br />
                <input type="text" className={"inputfield investmentstitle ml-2"}/> Title
                <br />
                <br />
                <InvestmentForms
                    formLengthState = {formLengthState}
                />
                <AddInvestmentFieldButton
                    formLengthState = {formLengthState}
                    setFormLengthState = {setFormLengthState}
                />
                &nbsp;
                <DeleteInvestmentFieldButton
                    formLengthState = {formLengthState}
                    setFormLengthState = {setFormLengthState}
                />
                <SubmitButton
                    investmentsState = {investmentsState}
                    setInvestmentsState = {setInvestmentsState}
                />
            </form>
        </div>
    );
}

function InvestmentForms({formLengthState}){
    let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

    let optionElements = getOptionElements(lengthOfGraphInYears);
    let optionElementsIncludingNever = getOptionElementsForReinvesting(lengthOfGraphInYears);

        let printToDom = formLengthState.map((e, index) => {
        return (
            <div key={index}>
                <hr />
                <br />
                <input type="text" className={"inputfield label mb-8 ml-2"}></input> Label for This Investment
                <br />
                <input type="text" className={"inputfield amount mb-8 ml-2 w-20"}></input> Amount to Invest
                &nbsp;
                <select className={"presetinvestment + e"}>
                    <option></option>
                    <option>TBA</option>
                    {/*TODO Map options*/}
                </select> Choose Preset Values


                <br />

                <select className={"yearBegin ml-2 text-black"}>
                    {optionElements}
                </select> Invest

                <select className={"yearWithdraw ml-2 text-black mb-10"}>
                    {optionElementsIncludingNever}
                </select> Withdraw

                <select className={"yearCeaseReinvesting ml-2 text-black"}>
                    {optionElementsIncludingNever}
                </select> Cease Reinvesting

                <br />

                <input type="text" className={"inputfield percentreturn w-8 ml-2"}></input>&nbsp; Expected Percent Return &nbsp;
                <input type="text" className={"inputfield percentpull w-8"}></input>&nbsp; Percent Pull Each Year (from return)
                <br />
                <br />

            </div>
        );
    });

    return (
        <>
            {printToDom}
        </>
    );
}

function getOptionElements(lengthOfGraphInYears){
    let optionElements = lengthOfGraphInYears.map(entry => {
        return(
            <option value={entry} key={entry}>{entry}</option>
        );
    });

    return optionElements;
}

function getOptionElementsForReinvesting(lengthOfGraphInYears){
    let optionElementsIncludingNever = []

    lengthOfGraphInYears.forEach((e) => {
        optionElementsIncludingNever.push(e);
    });
    optionElementsIncludingNever = ["Never", ...optionElementsIncludingNever];

    optionElementsIncludingNever = optionElementsIncludingNever.map(entry => {
        return(
            <option value={entry} key={entry}>{entry}</option>
        );
    });

    return optionElementsIncludingNever;
}

function AddInvestmentFieldButton({formLengthState, setFormLengthState}){

    return (
        <button onClick={(e) => {
           e.preventDefault();
           addInvestmentField(formLengthState, setFormLengthState);
        }}>Add Field</button>
    );
}

function addInvestmentField(formLengthState, setFormLengthState){
    let newFormLength = [...formLengthState];
    newFormLength.push(newFormLength.length);

    setFormLengthState(newFormLength);
}

function DeleteInvestmentFieldButton({formLengthState, setFormLengthState}){
    return (
        <button onClick={(e) => {
            e.preventDefault();
            deleteInvestmentField(formLengthState, setFormLengthState);
        }}>Delete Field</button>
    );
}

function deleteInvestmentField(formLengthState, setFormLengthState){
    let newFormLength = [...formLengthState];
    newFormLength.pop();

    setFormLengthState(newFormLength);
}

function SubmitButton({investmentsState, setInvestmentsState}){

    return (
      <>
          <br />
          <button className={"submitinvestment"} onClick={(e) => {
            e.preventDefault();
            handleSubmission(investmentsState, setInvestmentsState);
          }}>Submit</button>
      </>
    );
}

function handleSubmission(investmentsState, setInvestmentsState){
    let investmentData = getInvestmentDataFromFields();
    investmentData = checkInvestmentData(investmentData);
    investmentData = runCalculationsOnInvestmentData(investmentData);
    cc(investmentData)
    //updateInvestmentData(investmentData);
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

    let investmentData = {
        title: title.value,
        labels: [],
        amounts: [],
        yearsBegin: [],
        yearsWithdraw: [],
        yearsCeaseReinvesting: [],
        percentReturn: [],
        percentToPull: [],
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

    return investmentData;
}

function checkInvestmentData(investmentData){

    let length = investmentData.labels.length;

    if (investmentData.title == '' || undefined){
        throw new Error("Please enter a title.");
    }

    for (let i = 0; i < length; i++){
        if (investmentData.labels[i] == '' || undefined){
            throw new Error("Please enter a label for every investment.");
            return;
        }
    }

    for (let i = 0; i < length; i++){
        if (investmentData.amounts[i] == '' || undefined) {
            throw new Error("Please enter an amount to invest in every investment field.");
        } else if (!isNumeric(investmentData.amounts[i])) {
            throw new Error("Please use only numbers in the amount field.");
            return;
        }
    }

    for (let i = 0; i < length; i++){
        if (investmentData.yearsBegin[i] >= investmentData.yearsWithdraw[i]){
            throw new Error("Please do not withdraw your money until at least one year after investing it.");
            return;
        } else if (investmentData.yearsBegin[i] >= investmentData.yearsCeaseReinvesting[i]) {
            throw new Error("Please do not stop reinvesting your money until at least one year after investing it.");
            return;
        }

        if (investmentData.yearsWithdraw[i] !== "Never") {
            if (investmentData.yearsWithdraw[i] <= investmentData.yearsCeaseReinvesting[i]
            && investmentData.yearsCeaseReinvesting[i] != "Never") {
                throw new Error("Please do not withdraw your money before you stop reinvesting it.");
                return;
            }
        }
    }

    for (let i = 0; i < length; i++){
        if (!isNumeric(investmentData.percentReturn[i])){
            throw new Error("Please enter a number in the percent return field.");
            return;
        }
    }

    for (let i = 0; i < length; i++){
        if (!isNumeric(investmentData.percentToPull[i])){
            throw new Error("Please enter a number in the percent-to-pull field.");
            return;
        } else if (isNumeric(investmentData.percentToPull[i]) && investmentData.percentToPull[i] > 100){
            throw new Error("Percent to pull cannot be greater than 100.");
            return;
        }
    }

    return investmentData;
}

function runCalculationsOnInvestmentData(investmentData){
    let calculator = new Investmentdatahandler(investmentData);
    investmentData = calculator.beginCalculations();
    return investmentData;
}

function updateInvestmentData(){

}



export default Investments;