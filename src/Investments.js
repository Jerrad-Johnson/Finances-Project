import {useState} from "react";
import {createArrayWithNumberOfYearsToGraph, isNumeric} from "./components/jobssharedfunctions";
import {InvestmentRunningValueBarChart} from "./graphs/InvestmentGraphs";
import {SubmitButton} from "./components/InvesmentGraphHandler";
import {getOptionElements, getOptionElementsForReinvesting, AddInvestmentFieldButton, DeleteInvestmentFieldButton} from "./components/ExpenseForms";

let cc = console.log;

function Investments(){
    let [investmentsState, setInvestmentsState] = useState([]);

    return (
      <div id={"investmentcontainer"}>
        <FormContainer
            investmentsState = {investmentsState}
            setInvestmentsState = {setInvestmentsState}
        />
        <InvestmentGraph
            investmentsState = {investmentsState}
        />
      </div>
    );
}

export function FormContainer({investmentsState, setInvestmentsState}){
    let [formLengthState, setFormLengthState] = useState([0]);

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
                <input type="text" className={"inputfield label mb-8 ml-2 w-30"}></input> Label
                &nbsp;
                <input type="text" className={"inputfield amount mb-8 ml-2 w-20"}></input> Amount to Invest
                <br />
                <input type="text" className={"inputfield additionalinvestment mb-8 ml-2 w-20"}></input> Yearly Add'l Investment
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
    //TODO Limit "Invest" max year to graphMax -1
    //TODO Add useEffect for "from Return"

    return (
        <>
            {printToDom}
        </>
    );
}

function InvestmentGraph({investmentsState}){

    let printToDom = [];

    printToDom = investmentsState.map((e, key) => {
            return (
                <div key={key}>
                    <InvestmentRunningValueBarChart
                        key = {key}
                        investmentSheet = {e}
                    />
                </div>
            );
        });

    return  (
        <>
            {printToDom}
        </>
    );
}


export default Investments;