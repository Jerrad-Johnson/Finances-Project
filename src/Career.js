import React from "react";
import {useState} from "react";
import LinearJobComponent, {handleLinearJobSubmission} from "./components/LinearJobComponent";
import {createArrayWithNumberOfYearsToGraph} from "./components/jobssharedfunctions";
import SteppedJobComponent, {SteppedIncomeForms} from "./components/SteppedJobComponent";

//TODO Display job title in graph
//TODO Create a Youtube video demonstrating this app.
//TODO Make formcontainer show as a pseudo-popup.

var cc = console.log;

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

function CreateOptionForms({formTitle, id, key}) {

    const numberOfYearsToGraph = createArrayWithNumberOfYearsToGraph();
    const optionElements = numberOfYearsToGraph.map((year) =>
        ( <option value={year} key={year}></option> )
    );
    // TODO Remove ID
    return (
        <>
            <select className={"text-slate-500 "+ id} id={id} key={key}>
                {optionElements}
            </select>
            <label> {formTitle} </label><br />
        </>
    );
} //TODO Turn into class; will be reused


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

          <LinearJobComponent
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
          />
          {/*<LinearGraph
              linearJobDataState = {linearJobDataState}
              setLinearJobDataState = {setLinearJobDataState}
           />*/}

          <SteppedJobComponent
              steppedJobDataState = {steppedJobDataState}
              setSteppedJobDataState = {setSteppedJobDataState}
          />


      </>
    );
}

export default Career;



