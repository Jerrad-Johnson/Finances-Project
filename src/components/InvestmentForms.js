let cc = console.log;

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

export function AddInvestmentFieldButton({formLengthState, setFormLengthState, formKey, setFormKey}){

    return (
        <button className={"addInvestmentFields"} onClick={(e) => {
            e.preventDefault();
            addInvestmentField(formLengthState, setFormLengthState, formKey, setFormKey);
        }}>Add Field</button>
    );
}

function addInvestmentField(formLengthState, setFormLengthState, formKey, setFormkey){
    let newForm = {
        formIndex: formKey,
    }
    setFormkey(formKey +1);
    let newFormLength = [...formLengthState];
    newFormLength.push(newForm);
    setFormLengthState(newFormLength);
}

export function DeleteInvestmentFieldButton({formLengthState, setFormLengthState, index}){

    return (
        <button className={"removeInvestmentField"} onClick={(e) => {
            e.preventDefault();
            deleteInvestmentField(formLengthState, setFormLengthState, index);
        }}>Delete Field</button>
    );
}

function deleteInvestmentField(formLengthState, setFormLengthState, index){
    let newFormLength = [...formLengthState];

    newFormLength = newFormLength.filter(e => e.formIndex !== index);
    setFormLengthState(newFormLength);
}