import {useState} from "react";
import {cc} from "./components/jobssharedfunctions";

function Options(){
    //let [graphMaxLengthState, setGraphMaxLengthState] = useState()
                //localStorage.removeItem("graphMaxLength");

    return (
      <>
        <form>
            <select defaultValue="Current" onChange={((e) => {
               e.preventDefault();
               if (e.target.value !== "Current") {
                   let optionSelected = e.target.value;
                   optionSelected = +optionSelected
                   localStorage.setItem("graphMaxLength", JSON.stringify(optionSelected));
               }
            })}>
                <option>Current</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
            </select>
        </form>
      </>
    );
}

export default Options;