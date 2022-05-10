export function getOptionElements(lengthOfGraphInYears){
    let optionElements = lengthOfGraphInYears.map(entry => {
        return(
            <option value={entry} key={entry}>{entry}</option>
        );
    });

    return optionElements;
}

export function getOptionElementsForReinvesting(lengthOfGraphInYears){
    let optionElementsIncludingNever = []

    lengthOfGraphInYears.forEach((e) => {
        optionElementsIncludingNever.push(e);
    });
    optionElementsIncludingNever = ["Never", ...optionElementsIncludingNever];

    optionElementsIncludingNever = optionElementsIncludingNever.map(entry => {
        return(
            <option value={entry} key={entry}>{entry}</option>
        );
    });

    return optionElementsIncludingNever;
}

export function AddInvestmentFieldButton({formLengthState, setFormLengthState}){

    return (
        <button className={"addInvestmentFields"} onClick={(e) => {
            e.preventDefault();
            addInvestmentField(formLengthState, setFormLengthState);
        }}>Add Field</button>
    );
}

function addInvestmentField(formLengthState, setFormLengthState){
    let newFormLength = [...formLengthState];
    newFormLength.push(newFormLength.length);

    setFormLengthState(newFormLength);
}

export function DeleteInvestmentFieldButton({formLengthState, setFormLengthState}){
    return (
        <button onClick={(e) => {
            e.preventDefault();
            deleteInvestmentField(formLengthState, setFormLengthState);
        }}>Delete Field</button>
    );
}

function deleteInvestmentField(formLengthState, setFormLengthState){
    let newFormLength = [...formLengthState];
    newFormLength.pop();

    setFormLengthState(newFormLength);
}