class CreateNewDataForEvaluationGraphs {
    constructor(income, expenses, investments, taxes = []) {
        this.income = income;
        this.expenses = expenses;
        this.investments = investments;
        this.taxes = taxes;
        this.cc = console.dir;
    }

    begin(){
        this.cc(this.investments);

        return {};
    }




}



export default CreateNewDataForEvaluationGraphs;