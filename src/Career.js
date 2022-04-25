import React from "react";
import {useState} from "react";
import LinearGraph, {handleLinearJobSubmission} from "./components/LinearJobComponent";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";
import SteppedJobComponent, {ListJobIncomeForms, addSteppedIncomeField, removeSteppedIncomeField, handleSteppedJobSubmission} from "./components/SteppedJobComponent";

//TODO Display job title in graph
//TODO Create a Youtube video demonstrating this app.
//TODO Make formcontainer show as a pseudo-popup.

let cc = console.log;
var steppedIncomeFormKey = 0;
export var jobListIncomeFormKey = 200;

function FormContainer({linearJobDataState, setLinearJobDataState, steppedJobDataState,
                           setSteppedJobDataState}) {

    return (
        <div id={"formContainer"}>
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
    let formType = "linearincome";

    return (
        <>
            <form>
                <input type={"text"} id={"linearJobTitle"}></input> Job Title <br />
                <input type={"text"} id={"incomeImmediate"}></input> Starting income
                <CreateOptionForms
                    formTitle={"Year income begins"}
                    id={"yearIncomeBegins"}
                />
                <input type={"text"} id={"incomeCeiling"}></input> Ceiling income
                <CreateOptionForms
                    formTitle={"Year to income ceiling"}
                    id={"yearToIncomeCeiling"}
                />
                <button type={"click"} id={"submitLinearJob"} onClick={(e) => {
                    e.preventDefault(); handleLinearJobSubmission(linearJobDataState,
                        setLinearJobDataState) }}>
                    Submit
                </button>
            </form>
        </>
    );
}

function SteppedIncomeForms({steppedJobDataState, setSteppedJobDataState}) {
    let initialIncomeFormState = [{key: steppedIncomeFormKey}];
    const [steppedIncomeFormState, setSteppedIncomeFormState] = useState(initialIncomeFormState);

    return (
        <>
            <form>
                <input type={"text"} id={"steppedJobTitle"}></input> Job Title <br/>

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
                    Add income change
                </button>
                &nbsp;

                <button type={"click"} id={"deleteSteppedIncome"} onClick={(e) => {
                    e.preventDefault();
                    removeSteppedIncomeField(steppedIncomeFormState,
                        setSteppedIncomeFormState)
                }}>
                    Delete income change
                </button>
                <br/>
                <button type={"click"} id={"submitSteppedJob"} onClick={(e) => {
                    e.preventDefault();
                    handleSteppedJobSubmission(steppedJobDataState,
                        setSteppedJobDataState)
                }}>
                    Submit
                </button>

            </form>
        </>
    )
}

export function CreateSteppedJobIncomeForm({id}){
    return(
        <>
            <input type={"text"} className={"incomeSteppedJob"}></input> Income from this year
            onward: &nbsp;
            <CreateOptionForms
                id = {id}
            />
        </>
    )
}

function CreateOptionForms({formTitle, id, steppedIncomeFormKey}) {
    const numberOfYearsToGraph = createArrayWithNumberOfYearsToGraph();
    const optionElements = numberOfYearsToGraph.map((year) =>
        ( <option value={year} key={year}></option> )
    );

    // TODO Remove ID
    return (
        <>
            <select className={"text-slate-500 "+ id} id={id} key={steppedIncomeFormKey}>
                {optionElements}
            </select>
            <label> {formTitle} </label><br />
        </>
    );
}


function Career() {
    const [linearJobDataState, setLinearJobDataState] = useState([]);
    const [steppedJobDataState, setSteppedJobDataState] = useState([]);


    return (
      <>
          <FormContainer
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />
          <br />

          <LinearGraph
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
          />

          <SteppedJobComponent
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />
      </>
    );
}

export default Career;



