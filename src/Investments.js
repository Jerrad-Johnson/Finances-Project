import Investmentdatahandler from "./libs/investmentdatahandler";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";

function Investments(){
    return (
      <div id={"investmentcontainer"}>
        <FormContainer />
      </div>
    );
}

var formLength = [0];

export function FormContainer(){
    return (
        <div id="formcontainer">
            <form>
                <br />
                <input type="text" className={"inputfield investmentstitle"}/> Title
                <br />
                <br />
                <InvestmentForms />
            </form>
        </div>
    );
}

function InvestmentForms(){
    let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

    let optionElements = lengthOfGraphInYears.map(entry => {
        return(
            <option value={entry} key={entry}>{entry}</option>
        );
    });

        let printToDom = formLength.map((e, index) => {
        return (
            <>
                <input type="text" className={"inputfield amount"}></input>

                <select className={"yearBegin ml-2 text-black"}>
                    {optionElements}
                </select> Invest

                <select className={"yearWithdraw ml-2 text-black mb-10"}>
                    {optionElements}
                </select> Withdraw

                <select className={"yearCeaseReinvesting ml-2 text-black"}>
                    {optionElements}
                </select> Cease Reinvesting

                <br />

                <input type="text" className={"inputfield percentreturn w-8"}></input>Percent Return &nbsp;
                <input type="text" className={"inputfield percentpull w-8"}></input>Percent Pull

            </>
        );
    });

    return (
        <>
            {printToDom}
        </>
    );
}

export default Investments;