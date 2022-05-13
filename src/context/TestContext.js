import {createContext} from "react";
let cc = console.log

export const TestC = createContext();

export const TestProvider = (props) => {
    return (
        <TestC.Provider value={"5"}>
            {props.children}
        </TestC.Provider>
    );
}

