import {checkInvestmentData} from "./InvesmentGraphHandler";
let cc = console.log;

test("Error Handling", () => {
    let investmentData = {
        amounts: [500, 250000],
        title: "Whatever",
        labels: ["MFC", "Franchise"],
        yearsBegin: [1, 8],
        yearsWithdraw: [5, 15],
        yearsCeaseReinvesting: [3, 10],
        percentReturn: [5, 10],
        percentToPull: [2, 20],
        additionalInvestment: [1000, 0],
    };

    expect(() => {
        checkInvestmentData(investmentData);
    }).not.toThrow();

    investmentData.title = '';
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    investmentData.title = 'Whatever';
    investmentData.labels = ['', 5];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a label for every investment.");

    investmentData.labels = ["MFC", "Franchise"];
    investmentData.amounts = ['', '500'];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter an amount to invest in every investment field.");

    investmentData.amounts = ['www', '500'];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please use only numbers in the amount field.");

    investmentData.amounts = ['500', '250000'];
    investmentData.yearsBegin = [6, 8];
    investmentData.yearsWithdraw = [5, 15];
    investmentData.yearsCeaseReinvesting = ["Never", "Never"];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please do not withdraw your money until at least one year after investing it.");

    investmentData.yearsBegin = [6, 8];
    investmentData.yearsCeaseReinvesting = [7, 9];
    investmentData.yearsWithdraw = [10, 15];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please do not stop reinvesting your money until at least two years after investing it.");

    investmentData.yearsBegin = [6, 8];
    investmentData.yearsCeaseReinvesting = [10, 15];
    investmentData.yearsWithdraw = [8, 10];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please do not withdraw your money before you stop reinvesting it.");

    investmentData.yearsBegin = [3, 6];
    investmentData.yearsCeaseReinvesting = [5, 8];
    investmentData.yearsWithdraw = [8, 10];
    investmentData.percentReturn = ['', ''];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a number in the percent return field.");

    investmentData.percentReturn = [0, 0];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a number greater than 0 in the expected return percentage field.");

    investmentData.percentReturn = [5, 20];
    investmentData.percentToPull = ["w", 0]
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please only enter numbers in the percent-to-pull field, or leave it blank.");

    investmentData.percentToPull = [150, 0]
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Percent to pull cannot be greater than 100.");

    investmentData.percentToPull = [80, 0]
    investmentData.additionalInvestment = ["w", 5];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please only enter numbers in the additional investment field.");

    investmentData.additionalInvestment = [500, 500];
    investmentData.yearsBegin = [5, 5];
    investmentData.yearsWithdraw = [6, 6];
    investmentData.yearsCeaseReinvesting = ["Never", "Never"];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("You can input additional investments only if there's at least a two-year gap from the year of your first investment to the year that you withdraw your money.");


    investmentData.additionalInvestment = [500, 500];
    investmentData.yearsBegin = [14, 5];
    investmentData.yearsWithdraw = ["Never", "Never"];
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("The year of your first investment must be before 14 if you'd like to have additional investments.");
});