let cc = console.log

function SelectOptions({financialData}){
    let printToDom = financialData.map((e, index) => {
        return(
           <option key={index}>{e.title}</option>
        );
    });
    
    return(
        <>
            {printToDom}
        </>
    );
}

function Evaluate(){
    let linearJob = JSON.parse(localStorage.getItem("linearjob"));
    let steppedJob = JSON.parse(localStorage.getItem("steppedjob"));
    let investmentData = JSON.parse(localStorage.getItem("investmentdata"));
    let expenseData = JSON.parse(localStorage.getItem("expensedata"));
    let incomeData = [...linearJob, ...steppedJob];

    cc(incomeData)

    return (
        <div className={"container"}>
            <br />
            <form>
                <select>
                    <SelectOptions
                        financialData = {incomeData}
                    />
                </select>
                Income &nbsp;

                <select>
                    <option>2</option>
                </select>&nbsp;
                Expenses&nbsp;
                <select>
                    <option>3</option>
                </select>&nbsp;
                Investments&nbsp;
                <br />
                <br />
                <select>
                    <option>4</option>
                </select>&nbsp;
                Graph Type&nbsp;
            </form>
            <br />
            <br />
            <span>Sums</span>
            <br />
            <span>Income $, Expenses $, Investment Value $</span>
            <br />
            <span>Difference $</span>
            <br />
            <br />
            <span>Graph Here</span>


        </div>
    );
}

export default Evaluate;