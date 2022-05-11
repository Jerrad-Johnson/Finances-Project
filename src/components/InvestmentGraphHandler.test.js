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
/*
    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");

    expect(() => {
        checkInvestmentData(investmentData);
    }).toThrow("Please enter a title.");*/
});