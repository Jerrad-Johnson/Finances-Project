import {errorHandler} from "./errorHandler";

export function removeAllValues(){
    localStorage.removeItem("linearjob");
    localStorage.removeItem("steppedjob");
    localStorage.removeItem("expensedata");
    localStorage.removeItem("investmentdata");

    if (!localStorage.getItem("linearjob")
    && !localStorage.getItem("steppedjob")
    && !localStorage.getItem("expensedata")
    && !localStorage.getItem("investmentdata")) {
        errorHandler("Old data removed.");
    } else {
        errorHandler("Failed to remove old data.");
    }

}
