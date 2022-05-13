import React, {useContext, useState} from "react";
import LinearGraph, {handleLinearJobSubmission} from "./components/LinearJobComponent";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";
import SteppedGraph, {ListJobIncomeForms, addSteppedIncomeField, removeSteppedIncomeField, handleSteppedJobSubmission} from "./components/SteppedJobComponent";
import {useLocalStorage} from "./hooks/useLocalStorage";

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

    return (
        <>
            <br />
            Linear-progression Job
            <br />

            <form>
                <input type={"text"} id={"linearJobTitle"} className={"mb-5 mt-5"}></input> Job Title <br />
                <input type={"text"} id={"incomeImmediate"} className={"mb-5"}></input> Starting income
                &nbsp;
                <CreateOptionForms
                    formTitle={"Year income begins"}
                    id={"yearIncomeBegins"}
                />
                <input type={"text"} id={"incomeCeiling"}></input> Ceiling income
                &nbsp;
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
            <hr className={"mb-5"}/>
            Stepped-progression job
            <br />
            <br />
            <form>
                <input type={"text"} id={"steppedJobTitle"} className={"mb-5"}></input> Job Title <br/>

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
        ( <option value={year} key={year}>{year}</option> )
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
    // const [steppedJobDataState, setSteppedJobDataState] = useState([]);
    // JSON.parse(localStorage.getItem("steppedJob")) || 5

    const [linearJobDataState, setLinearJobDataState] = useState([]);
    const [steppedJobDataState, setSteppedJobDataState] = useState([]);

    //cc(steppedJobDataState)
    //let x = JSON.stringify(steppedJobDataState)
    //cc(steppedJobDataState) //cc = console.log
    //cc(x)

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

          <SteppedGraph
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />
      </>
    );
}

export default Career;



