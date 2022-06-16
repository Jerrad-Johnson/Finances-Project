import React, {useContext, useState} from "react";
import LinearGraph, {handleLinearJobSubmission} from "./components/LinearJobComponent";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";
import SteppedGraph, {ListJobIncomeForms, addSteppedIncomeField, removeSteppedIncomeField, handleSteppedJobSubmission} from "./components/SteppedJobComponent";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {setSampleValues} from "./libs/sampleValues";

//TODO Create a Youtube video demonstrating this app.
//TODO Make formcontainer show as a pseudo-popup.

let cc = console.log;
var steppedIncomeFormKey = 0;
export var jobListIncomeFormKey = 200;
//setSampleValues()

function FormContainer({linearJobDataState, setLinearJobDataState, steppedJobDataState, setSteppedJobDataState}) {

    return (
        <div className={"inputSet"}>
            <LinearIncomeForms
                linearJobDataState = {linearJobDataState}
                setLinearJobDataState = {setLinearJobDataState}
            /> <br />
            <SteppedIncomeForms
                steppedJobDataState = {steppedJobDataState}
                setSteppedJobDataState = {setSteppedJobDataState}
            />
        </div>
    );
}

function LinearIncomeForms({linearJobDataState, setLinearJobDataState}) {

    return (
        <div className={"inputSelectorsCard"}>
            <span className={"inputSetTitle"}>Consistently-Progressing Income</span>

            <form>
                <span className={"inputTitle"}>Job Title</span>
                <input type={"text"} id={"linearJobTitle"} className={"inputTextFieldLong"}></input>
                <span className={"inputTitle"}>Starting Income</span>
                <input type={"text"} id={"incomeImmediate"} className={"inputTextFieldLong"}></input>
                <span className={"inputTitle"}>Ceiling income</span>
                <input type={"text"} id={"incomeCeiling"} className={"inputTextFieldLong"}></input>
                <span className={"inputTitle"}>Begin and end years
                </span>
                <CreateOptionForms
                    id={"yearIncomeBegins"}
                />
                <CreateOptionForms
                    id={"yearToIncomeCeiling"}
                />
                <button type={"click"} id={"submitLinearJob"} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLinearJobSubmission(linearJobDataState, setLinearJobDataState);
                }}>
                    Submit
                </button>
            </form>
        </div>
    );
}

function SteppedIncomeForms({steppedJobDataState, setSteppedJobDataState}) {
    let initialIncomeFormState = [{key: steppedIncomeFormKey}];
    const [steppedIncomeFormState, setSteppedIncomeFormState] = useState(initialIncomeFormState);

    return (
        <div className={"inputSelectorsCard"}>
            <span className={"inputSetTitle"}>Income with Defined Steps</span>
            <form>
                <span className={"inputTitle"}>Job Title</span>
                <input type={"text"} id={"steppedJobTitle"} className={"inputTextFieldLong"}></input>

                <ListJobIncomeForms
                    steppedIncomeFormState={steppedIncomeFormState}
                />

                <button type={"click"} id={"addSteppedIncome"} onClick={(e) => {
                    e.preventDefault();
                    steppedIncomeFormKey = steppedIncomeFormKey + 1;
                    jobListIncomeFormKey = steppedIncomeFormKey +90010;
                    addSteppedIncomeField(steppedIncomeFormState,
                        setSteppedIncomeFormState, steppedIncomeFormKey)
                }}>
                    Add step
                </button>
                &nbsp;

                <button type={"click"} id={"deleteSteppedIncome"} onClick={(e) => {
                    e.preventDefault();
                    removeSteppedIncomeField(steppedIncomeFormState,
                        setSteppedIncomeFormState)
                }}>
                    Delete step
                </button>
                <br/>
                <button type={"click"} id={"submitSteppedJob"} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSteppedJobSubmission(steppedJobDataState, setSteppedJobDataState)
                }}>
                    Submit
                </button>

            </form>
        </div>
    )
}

export function CreateSteppedJobIncomeForm({id}){
    return(
        <>
            <span className={"inputTitle"}>Income from this year onward:</span>
            <input type={"text"} className={"incomeSteppedJob inputTextFieldLong"}></input>
            <span className={"inputTitle"}>Year this income begins:</span>
            <CreateOptionForms
                id = {id}
            />
            <hr className={"jobIncomeSeparator"}/>
        </>
    )
}

function CreateOptionForms({id, steppedIncomeFormKey}) {
    const numberOfYearsToGraph = createArrayWithNumberOfYearsToGraph();
    const optionElements = numberOfYearsToGraph.map((year) =>
        ( <option value={year} key={year}>{year}</option> )
    );

    // TODO Remove ID
    return (
        <>
            <select className={"inputSelectorShortSidebySide "+ id} id={id} key={steppedIncomeFormKey}>
                {optionElements}
            </select>
        </>
    );
}


function Career() {
    const [linearJobDataState, setLinearJobDataState] = useLocalStorage("linearjob", localStorage.getItem("linearjob") ?? []);
    const [steppedJobDataState, setSteppedJobDataState] = useLocalStorage("steppedjob", localStorage.getItem("steppedjob") ?? []);

    return (
      <div className={"container"}>
          <div className={"pairs"}>
              <div className={"left"}>
                  <FormContainer
                      linearJobDataState = {linearJobDataState}
                      setLinearJobDataState = {setLinearJobDataState}
                      steppedJobDataState = {steppedJobDataState}
                      setSteppedJobDataState = {setSteppedJobDataState}
                  />
              </div>

              <div className={"right"}>
                  <LinearGraph
                      linearJobDataState = {linearJobDataState}
                      setLinearJobDataState = {setLinearJobDataState}
                  />
                  <SteppedGraph
                      steppedJobDataState = {steppedJobDataState}
                      setSteppedJobDataState = {setSteppedJobDataState}
                  />
              </div>
          </div>
      </div>
    );
}

export default Career;



