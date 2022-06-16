import React, {useState} from "react";
import {cc} from "./components/jobssharedfunctions";
import EvaluationForms from "./components/EvaluationForms";
import EvaluationGraphs from "./components/EvaluationGraphs";
import EvaluationGeneralData from "./components/EvaluationGeneralData";

function Options(){
    //let [graphMaxLengthState, setGraphMaxLengthState] = useState()
                //localStorage.removeItem("graphMaxLength");

    return (
        <div className={"container"}>
            <div className={"pairs"}>
                <div className={"left"}>
                    <div className={"inputSet"}>
                        <div className={"inputSelectorsCard"}>
                            <span className={"inputSetTitle"}>Options</span>
                            <form>
                                <span className={"inputTitle"}>Max Length in Years</span>
                                <select className={"inputSelector"} defaultValue={JSON.parse(localStorage.getItem("graphMaxLength")) || 15} onChange={((e) => {
                                    e.preventDefault();
                                        let optionSelected = e.target.value;
                                        optionSelected = +optionSelected
                                        localStorage.setItem("graphMaxLength", JSON.stringify(optionSelected));
                                })}>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>25</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={"right"}>
                    <div className={"graphCard"}>
                    Lorem Ipsum
                    </div>
                </div>
            </div>
            <EvaluationGeneralData />
        </div>


    );
}

export default Options;