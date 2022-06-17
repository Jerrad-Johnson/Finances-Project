import React, {useState} from "react";
import {cc} from "./utilities/genericFunctions";
import EvaluationGeneralData from "./components/EvaluationGeneralData";
import {removeAllValues} from "./utilities/sharedFunctions.js";

function Options(){

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

                            <span className={"inputTitle"}>Remove All Sheets</span>
                            <button className={"removeValues"} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeAllValues();
                            }}>Delete</button>
                        </div>
                    </div>
                </div>

                <div className={"right"}>
                    <div className={"graphCard"}>
                    After changing your max graph length, you may have to refresh the pages to get them to correctly display the options.
                    </div>
                </div>
            </div>
            <EvaluationGeneralData />
        </div>


    );
}

export default Options;