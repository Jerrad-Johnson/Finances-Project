import {getArrayAsString, getKey, resetArr} from "../utilities/jest-supplements";
import investmentdatahandler from "./investmentdatahandler";

let cc = console.log;
var investmentData = {};
investmentData.labels = ["First Label", "Second Label"];
let x = new investmentdatahandler(investmentData);

test("calculatePercentagePulled", () => {
    investmentData.percentReturn = [100, 1];
    investmentData.percentToPull = [10, 99];
    let expectedReturn = [10, 0.99]

    expect(getKey(x.calculatePercentagePulled(investmentData),
        "percentagePulled")).toEqual(expectedReturn);

    investmentData.percentReturn = [100, 100];
    investmentData.percentToPull = [100, 0];
    expectedReturn = [100, 0]

    expect(getKey(x.calculatePercentagePulled(investmentData),
        "percentagePulled")).toEqual(expectedReturn);

    investmentData.percentReturn = [20, 8];
    investmentData.percentToPull = [50, 10];
    expectedReturn = [10, 0.8]

    expect(getKey(x.calculatePercentagePulled(investmentData),
        "percentagePulled")).toEqual(expectedReturn);
});

test("calculatePercentageReinvested", () => {
    investmentData.percentagePulled = [10, 0.8];
    let expectedReturn = [10, 7.2];

    expect(getKey(x.calculatePercentageReinvested(investmentData),
        "percentageReinvested")).toEqual(expectedReturn);

    investmentData.percentReturn = [100, 100];
    investmentData.percentagePulled = [90, 0];
    expectedReturn = [10, 100]

    expect(getKey(x.calculatePercentageReinvested(investmentData),
        "percentageReinvested")).toEqual(expectedReturn);

    investmentData.percentReturn = [100, 20];
    investmentData.percentagePulled = [100, 0];
    expectedReturn = [0, 20]

    expect(getKey(x.calculatePercentageReinvested(investmentData),
        "percentageReinvested")).toEqual(expectedReturn);
});

test("createArraysOfZero", () => {
   let expectedReturn = [
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
   ];

   expect(getKey(x.createArraysOfZero(investmentData), "arrayReinvestPercentagesByYear"))
       .toEqual(expectedReturn);

   expect(getKey(x.createArraysOfZero(investmentData), "arrayPullPercentagesByYear"))
       .toEqual(expectedReturn);

    expect(getKey(x.createArraysOfZero(investmentData), "arrayRunningInvestmentValue"))
        .toEqual(expectedReturn);

    expect(getKey(x.createArraysOfZero(investmentData), "arrayPullValueByYear"))
        .toEqual(expectedReturn);

    expect(getKey(x.createArraysOfZero(investmentData), "arrayRunningPullSums"))
        .toEqual(expectedReturn);

    expect(getKey(x.createArraysOfZero(investmentData), "arrayInvestmentIncreaseByYear"))
        .toEqual(expectedReturn);

    expect(getKey(x.createArraysOfZero(investmentData), "arrayAdditionalInvestment"))
        .toEqual(expectedReturn);

    expectedReturn = [0, 0];

    expect(getKey(x.createArraysOfZero(investmentData), "withdrawlValue"))
        .toEqual(expectedReturn);
});

test("addArrayOfNumberedYears", () => {
    let expectedReturn = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7",
        "Year 8", "Year 9", "Year 10", "Year 11", "Year 12", "Year 13", "Year 14",  "Year 15"];

    expect(getKey(x.addArrayOfNumberedYears(investmentData), "yearsNumbered"))
        .toEqual(expectedReturn);
});

test("withdrawOrReinvest", () => {
    investmentData.yearsCeaseReinvesting = ["Never", "Never"];
    investmentData.yearsWithdraw = ["Never", 5];
    let expectedReturn = ["Neither", "Withdraw"];

    expect(getKey(x.withdrawOrReinvest(investmentData), "withdrawOrReinvest"))
        .toEqual(expectedReturn);

    investmentData.yearsCeaseReinvesting = [3, 13];
    investmentData.yearsWithdraw = [5, "Never"];
    expectedReturn = ["Both", "CeaseReinvest"];

    expect(getKey(x.withdrawOrReinvest(investmentData), "withdrawOrReinvest"))
        .toEqual(expectedReturn);
});

test("calculateValuesAcrossTheYears -- Neither Cases", () => {
    investmentData.arrayRunningInvestmentValue = resetArr();
    investmentData.withdrawOrReinvest = ["Neither", "Neither"];
    investmentData.yearsBegin = [1, 14];
    investmentData.percentageReinvested = [100, 5];
    investmentData.percentagePulled = [0, 5];
    investmentData.amounts = [500, 500];
    let expectedReturn = [
        [0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayReinvestPercentagesByYear")).toEqual(expectedReturn);

    expectedReturn = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayPullPercentagesByYear")).toEqual(expectedReturn);

});

test("calculateValuesAcrossTheYears -- Both Cases", () => {
    investmentData.arrayReinvestPercentagesByYear = resetArr();
    investmentData.arrayPullPercentagesByYear = resetArr();
    investmentData.withdrawOrReinvest = ["Both", "Both"];
    investmentData.percentageReinvested = [100, 5];
    investmentData.percentagePulled = [0, 5];
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsCeaseReinvesting = [3, 11];
    investmentData.yearsWithdraw = [5, 13];
    let expectedReturn = [
        [0, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayReinvestPercentagesByYear")).toEqual(expectedReturn);

    investmentData.arrayPullPercentagesByYear = resetArr();
    investmentData.arrayReinvestPercentagesByYear = resetArr();
    expectedReturn = [
        [0, 0, 0, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 20, 20, 0, 0]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayPullPercentagesByYear")).toEqual(expectedReturn);
});


test("calculateValuesAcrossTheYears -- CeaseReinvest Cases", () => {
    investmentData.arrayReinvestPercentagesByYear = resetArr();
    investmentData.arrayPullPercentagesByYear = resetArr();
    investmentData.withdrawOrReinvest = ["CeaseReinvest", "CeaseReinvest"];
    investmentData.percentageReinvested = [100, 5];
    investmentData.percentagePulled = [0, 5];
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsCeaseReinvesting = [3, 11];
    investmentData.yearsWithdraw = ["Never", "Never"];
    let expectedReturn = [
        [0, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayReinvestPercentagesByYear")).toEqual(expectedReturn);

    investmentData.arrayReinvestPercentagesByYear = resetArr();
    investmentData.arrayPullPercentagesByYear = resetArr();
    investmentData.percentagePulled = [0, 5];
    investmentData.yearsBegin = [1, 6];
    investmentData.yearsCeaseReinvesting = [3, 10];
    investmentData.yearsWithdraw = [5, 12];
    investmentData.percentReturn = [100, 20];
    expectedReturn = [
        [0, 0, 0, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 20, 20, 0, 0, 0]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayPullPercentagesByYear")).toEqual(expectedReturn);
});

test("calculateValuesAcrossTheYears -- Withdraw Cases", () => {
    investmentData.arrayReinvestPercentagesByYear = resetArr();
    investmentData.arrayPullPercentagesByYear = resetArr();
    investmentData.withdrawOrReinvest = ["Withdraw", "Withdraw"];
    investmentData.percentagePulled = [0, 5];
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsWithdraw = [7, 15];
    investmentData.yearsCeaseReinvesting = ["Never", "Never"];
    investmentData.percentageReinvested = [100, 5];
    let expectedReturn = [
        [0, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayReinvestPercentagesByYear")).toEqual(expectedReturn);

    investmentData.arrayReinvestPercentagesByYear = resetArr();
    investmentData.arrayPullPercentagesByYear = resetArr();
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsWithdraw = [7, 15];
    investmentData.percentageReinvested = [100, 5];
    investmentData.percentagePulled = [0, 5];

    expectedReturn = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5]
    ];

    expect(getKey(x.calculateValuesAcrossTheYears(investmentData),
        "arrayPullPercentagesByYear")).toEqual(expectedReturn);
});