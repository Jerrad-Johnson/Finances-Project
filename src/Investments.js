import {useState} from "react";
import Investmentdatahandler from "./libs/investmentdatahandler";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";

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
            </form>
        </div>
    );
}

function InvestmentForms({formLengthState}){
    let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

    let optionElements = getOptionElements(lengthOfGraphInYears);
    let optionElementsForReinvesting = getOptionElementsForReinvesting(lengthOfGraphInYears);

        let printToDom = formLengthState.map((e, index) => {
        return (
            <div key={index}>
                <hr />
                <br />
                <input type="text" className={"inputfield amount mb-8 ml-2"}></input> Label for This Investment

                <br />

                <select className={"yearBegin ml-2 text-black"}>
                    {optionElements}
                </select> Invest

                <select className={"yearWithdraw ml-2 text-black mb-10"}>
                    {optionElements}
                </select> Withdraw

                <select className={"yearCeaseReinvesting ml-2 text-black"}>
                    {optionElementsForReinvesting}
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
    let optionElementsForReinvesting = []

    lengthOfGraphInYears.forEach((e) => {
        optionElementsForReinvesting.push(e);
    });
    optionElementsForReinvesting = ["Never", ...optionElementsForReinvesting];

    optionElementsForReinvesting = optionElementsForReinvesting.map(entry => {
        return(
            <option value={entry} key={entry}>{entry}</option>
        );
    });

    return optionElementsForReinvesting;
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

export default Investments;