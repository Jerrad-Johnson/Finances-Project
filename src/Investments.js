import {useState} from "react";
import {createArrayWithNumberOfYearsToGraph, isNumeric} from "./components/jobssharedfunctions";
import {InvestmentRunningValueBarChart} from "./graphs/InvestmentGraphs";
import {SubmitButton, DeleteThisGraph, DeleteButton} from "./components/InvesmentGraphHandler";
import {getOptionElements, getOptionElementsForReinvesting, AddInvestmentFieldButton, DeleteInvestmentFieldButton} from "./components/InvestmentForms";
import {useLocalStorage} from "./hooks/useLocalStorage";

let cc = console.log;

function Investments(){
    let [investmentsState, setInvestmentsState] = useLocalStorage("investmentdata", localStorage.getItem("investmentdata") ?? []);
    let [graphKey, setGraphKey] = useLocalStorage("investmentgraphkey", localStorage.getItem("investmentgraphkey") ?? 0);

        return (
      <div className={"container"}>
          <div className={"pairs"}>
              <div className={"left"}>
                <FormContainer
                    investmentsState = {investmentsState}
                    setInvestmentsState = {setInvestmentsState}
                    graphKey = {graphKey}
                    setGraphKey = {setGraphKey}
                />
              </div>

              <div className={"right"}>
                <InvestmentGraph
                    investmentsState = {investmentsState}
                    setInvestmentsState = {setInvestmentsState}
                    graphKey = {graphKey}
                />
              </div>
          </div>
      </div>
    );
}

export function FormContainer({investmentsState, setInvestmentsState, graphKey, setGraphKey}){
    let [formKey, setFormKey] = useState(1);
    let [formLengthState, setFormLengthState] = useState([{
        formIndex: 0,
    }]);

    return (
        <>
            <form>
                {/*Note that the graphed values do not include adjustment for inflation or taxes and are correct only as relative values, but are highly inaccurate as absolute values. The appropriate adjustments will be made on the final page.*/}
                <div className={"inputSet"}>
                    <div className={"inputSelectorsCard"}>
                        <span className={"inputSetTitle"}>Investments Sheet</span>
                        <span className={"inputTitle"}>Title</span>
                        <input type="text" className={"investmentstitle inputTextFieldLong"}/>
                    </div>
                </div>


                <InvestmentForms
                    formLengthState = {formLengthState}
                    setFormLengthState = {setFormLengthState}
                    formKey = {formKey}
                    setFormKey= {setFormKey}
                />

                <div className={"inputSet"}>
                    <div className={"inputSelectorsCard"}>
                        <AddInvestmentFieldButton
                            formLengthState = {formLengthState}
                            setFormLengthState = {setFormLengthState}
                            formKey = {formKey}
                            setFormKey = {setFormKey}
                        />
                        <SubmitButton
                            investmentsState = {investmentsState}
                            setInvestmentsState = {setInvestmentsState}
                            graphKey = {graphKey}
                            setGraphKey = {setGraphKey}
                        />
                    </div>
                </div>
            </form>
        </>
    );
}

function InvestmentForms({formLengthState, setFormLengthState, formKey, setFormKey}){
    let lengthOfGraphInYears = createArrayWithNumberOfYearsToGraph();

    let optionElements = getOptionElements(lengthOfGraphInYears);
    let optionElementsIncludingNever = getOptionElementsForReinvesting(lengthOfGraphInYears);

        let printToDom = formLengthState.map((e, index) => {
        return (
            <div key={e.formIndex} className={"inputSet"}>
                <div className={"inputSelectorsCard"}>
                    <span className={"inputSetTitle"}>Investment Data</span>
                    <span className={"inputTitle"}>Name</span>
                    <input type="text" className={"inputTextFieldLong label"}/>
                    <span className={"inputTitle"}>Amount to Invest</span>
                    <input type="text" className={"inputTextFieldLong amount"}/>
                    <span className={"inputTitle"}>Yearly Ad'l Investment</span>
                    <input type="text" className={"inputTextFieldLong additionalinvestment"}/>
                    <span className={"inputTitle"}>Choose Preset Values</span>
                    <select className={"presetinvestment + e inputSelector"}>
                    <option></option>
                    <option>TBA</option>
                    {/*TODO Map options*/}
                </select>
                <span className={"inputTitle"}>Year to Invest</span>
                <select className={"yearBegin inputSelector"}>
                    {optionElements}
                </select>

                <span className={"inputTitle"}>Year to Withdraw</span>
                <select className={"yearWithdraw inputSelector"}>
                    {optionElementsIncludingNever}
                </select>

                <span className={"inputTitle"}>Year to Stop Reinvesting</span>
                <select className={"yearCeaseReinvesting inputSelector"}>
                    {optionElementsIncludingNever}
                </select>

                <span className={"inputTitle"}>Expected Return Percent</span>
                <input type="text" className={"inputTextFieldShort percentreturn"}></input>
                <span className={"inputTitle"}>Percent to Withdraw Each Year (from return)</span>
                <input type="text" className={"inputTextFieldShort percentpull"} defaultValue={30}></input>

                <DeleteInvestmentFieldButton
                    formLengthState = {formLengthState}
                    setFormLengthState = {setFormLengthState}
                    index = {e.formIndex}
                />

            </div>

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

function InvestmentGraph({investmentsState, setInvestmentsState, graphKey}){
    let printToDom = [];
    console.log(investmentsState);

        printToDom = investmentsState.map((e, key) => {
            return (
                <div key={key} className={"graphCard"}>
                    <InvestmentRunningValueBarChart
                        key={key}
                        investmentSheet={e}
                    />
                    <button className={"submitInvestments"} type={"submit"} key={graphKey} onClick={(f) => {
                        f.preventDefault();
                        deleteThisGraph(investmentsState, setInvestmentsState, e.key)
                    }}
                    >Delete sheet
                    </button>

                </div>
            );
        });

    return  (
        <>
            {printToDom}
        </>
    );
}

function deleteThisGraph(investmentsState, setInvestmentsState, key){
    let newState = [...investmentsState];
    let keyPositionInArray = newState.findIndex(o => o.key === key);
    newState.splice(keyPositionInArray, 1);
    setInvestmentsState(newState);
}


export default Investments;