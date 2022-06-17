import {getArrayAsString, getKey, resetArr} from "../utilities/jest-supplements";
import {applyRoundingSingleDepthArray, applyRoundingTwoDepthArray} from "../utilities/genericFunctions";
import investmentdatahandler from "../libs/InvestmentDataHandler";

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

test("createArraysAdditionalInvestmentValues -- case Neither", () => {
    investmentData.withdrawOrReinvest = ["Neither", "Neither"];
    investmentData.yearsBegin = [1, 8];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = resetArr();

    let expectedReturn = [
        [0, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
        [0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
    ];

    expect(getKey(x.createArraysAdditionalInvestmentValues(investmentData),
        "arrayAdditionalInvestment")).toEqual(expectedReturn);
});

test("createArraysAdditionalInvestmentValues -- cases CeaseReinvest and Both", () => {
    investmentData.withdrawOrReinvest = ["CeaseReinvest", "Both"];
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsCeaseReinvesting = [5, 12];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = resetArr();
    let expectedReturn = [
        [0, 500, 500, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 0, 0, 0, 0]
    ];

    expect(getKey(x.createArraysAdditionalInvestmentValues(investmentData),
        "arrayAdditionalInvestment")).toEqual(expectedReturn);
});

test("createArraysAdditionalInvestmentValues -- case Withdraw", () => {
    investmentData.withdrawOrReinvest = ["Withdraw", "Withdraw"];
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsWithdraw = [7, 15];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = resetArr();
    let expectedReturn = [
        [0, 500, 500, 500, 500, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, 0]
    ];

    expect(getKey(x.createArraysAdditionalInvestmentValues(investmentData),
        "arrayAdditionalInvestment")).toEqual(expectedReturn);
});

test("runningInvestmentValue -- case Neither", () => {
    investmentData.withdrawOrReinvest = ["Neither", "Neither"];
    investmentData.yearsBegin = [1, 8];
    investmentData.yearsCeaseReinvesting = ["Never", "Never"];
    investmentData.yearsWithdraw = ["Never", "Never"];
    investmentData.percentageReinvested = [10, 5];
    investmentData.amounts = [1000, 500];
    investmentData.arrayRunningInvestmentValue = [
        [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0, 0, 0],
    ];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = [
        [0, 500, 500, 500, 500, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 1000, 1000, 1000, 0]
    ];
    let expectedReturn = [
        [1000, 1600, 2260, 2986, 3785, 4663, 5129, 5642, 6207, 6827, 7510, 8261, 9087, 9996, 10995],
        [0, 0, 0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 6164, 7472, 7846],
    ];
// NOTE: This additional investment array was artificial; the calculator would not return these values.
// They would have continued to the end of the array.

    expect(applyRoundingTwoDepthArray(getKey(x.runningInvestmentValue(investmentData),
        "arrayRunningInvestmentValue"))).toEqual(expectedReturn);
});

test("runningInvestmentValue -- case Both", () => {
    investmentData.withdrawOrReinvest = ["Both", "Both"];
    investmentData.yearsBegin = [1, 6];
    investmentData.yearsCeaseReinvesting = [6, 11];
    investmentData.yearsWithdraw = [11, 15];
    investmentData.percentageReinvested = [10, 5];
    investmentData.amounts = [1000, 500];
    investmentData.arrayRunningInvestmentValue = [
        [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = [
        [0, 500, 500, 500, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 1000, 0, 0, 0, 0, 0]
    ];
    let expectedReturn = [
        [1000, 1600, 2260, 2986, 3785, 4163, 4163, 4163, 4163, 4163, 4163, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 5164, 5164, 5164, 5164],
    ]; // These final non-zero values get chopped in the method updateArrayForWithdrawl. Consider refactoring and nixing updateArrayForWithdrawl.

    expect(applyRoundingTwoDepthArray(getKey(x.runningInvestmentValue(investmentData),
        "arrayRunningInvestmentValue"))).toEqual(expectedReturn);
});

test("runningInvestmentValue -- case CeaseReinvest", () => {
    investmentData.withdrawOrReinvest = ["CeaseReinvest", "CeaseReinvest"];
    investmentData.yearsBegin = [1, 6];
    investmentData.yearsCeaseReinvesting = [6, 11];
    investmentData.yearsWithdraw = ["Never", "Never"];
    investmentData.percentageReinvested = [10, 5];
    investmentData.amounts = [1000, 500];
    investmentData.arrayRunningInvestmentValue = [
        [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = [
        [0, 500, 500, 500, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 1000, 0, 0, 0, 0, 0]
    ];
    let expectedReturn = [
        [1000, 1600, 2260, 2986, 3785, 4163, 4163, 4163, 4163, 4163, 4163, 4163, 4163, 4163, 4163],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 5164, 5164, 5164, 5164],
    ];

    expect(applyRoundingTwoDepthArray(getKey(x.runningInvestmentValue(investmentData),
        "arrayRunningInvestmentValue"))).toEqual(expectedReturn);
});

test("runningInvestmentValue -- case Withdraw", () => {
    investmentData.withdrawOrReinvest = ["Withdraw", "Withdraw"];
    investmentData.yearsBegin = [1, 6];
    investmentData.yearsCeaseReinvesting = ["Never", "Never"];
    investmentData.yearsWithdraw = [6, 11];
    investmentData.percentageReinvested = [10, 5];
    investmentData.amounts = [1000, 500];
    investmentData.arrayRunningInvestmentValue = [
        [1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    investmentData.additionalInvestment = [500, 1000]
    investmentData.arrayAdditionalInvestment = [
        [0, 500, 500, 500, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1000, 1000, 1000, 1000, 0, 0, 0, 0, 0]
    ];
    let expectedReturn = [
        [1000, 1600, 2260, 2986, 3785, 4163, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 0, 0, 0, 0],
    ];

    expect(applyRoundingTwoDepthArray(getKey(x.runningInvestmentValue(investmentData),
        "arrayRunningInvestmentValue"))).toEqual(expectedReturn);
});

test("investmentIncreaseByYear", () => {
    investmentData.yearsBegin = [1, 6];
    investmentData.arrayRunningInvestmentValue = [
        [1000, 1600, 2260, 2986, 3785, 4163, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 0, 0, 0, 0],
    ];

    let expectedReturn = [
        [0, 600, 660, 726, 799, 378, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1025, 1076, 1130, 1187, 246, 0, 0, 0, 0]
    ];

    expect(applyRoundingTwoDepthArray(getKey(x.investmentIncreaseByYear(investmentData),
        "arrayInvestmentIncreaseByYear"))).toEqual(expectedReturn);
});


test("pullValueByYear", () => {
    investmentData.yearsBegin = [1, 6];
    investmentData.arrayRunningInvestmentValue = [
        [1000, 1600, 2260, 2986, 3785, 4163, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 0, 0, 0, 0],
    ];
    investmentData.arrayPullPercentagesByYear = [
        [0, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0]
    ];
    let expectedReturn = [
        [0, 160, 226, 299, 379, 416, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 76, 130, 187, 246, 258, 0, 0, 0, 0]
    ];


    expect(applyRoundingTwoDepthArray(getKey(x.pullValueByYear(investmentData),
        "arrayPullValueByYear"))).toEqual(expectedReturn);
});

test("runningPullSum", () => {

    investmentData.arrayPullValueByYear = [
        [0, 10, 12, 15, 20, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 10, 50, 55, 70, 75, 80, 85, 90, 100, 120]
    ];

    let expectedReturn = [
        [0, 10, 22, 37, 57, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 10, 60, 115, 185, 260, 340, 425, 515, 615, 735]
    ];

    expect(applyRoundingTwoDepthArray(getKey(x.runningPullSum(investmentData),
        "arrayRunningPullSums"))).toEqual(expectedReturn);
});

test("withdrawlValue", () => {
    investmentData.withdrawOrReinvest = ["Withdraw", "Both"];
    investmentData.yearsWithdraw = [5, 15];
    investmentData.withdrawlValue = [];
    investmentData.arrayRunningInvestmentValue = [
        [5, 10, 15, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    ];
    let expectedReturn = [20, 5];
    expect(applyRoundingTwoDepthArray(getKey(x.withdrawlValue(investmentData),
        "withdrawlValue"))).toEqual(expectedReturn);

});

test("updateArrayForWithdrawl", () => {
    investmentData.arrayRunningInvestmentValue = [
        [1000, 1600, 2260, 2986, 3785, 4163, 4163, 4163, 4163, 4163, 4163, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 5164, 5164, 5164, 5164],
    ];
    investmentData.yearsWithdraw = [11, 15];
    let expectedReturn = [
        [1000, 1600, 2260, 2986, 3785, 4163, 4163, 4163, 4163, 4163, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 500, 1525, 2601, 3731, 4918, 5164, 5164, 5164, 5164, 0],
    ];

    expect(applyRoundingTwoDepthArray(getKey(x.updateArrayForWithdrawl(investmentData),
        "arrayRunningInvestmentValue"))).toEqual(expectedReturn);
});

test("roundArrayNumbers", () => {
    investmentData.arrayAdditionalInvestment = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.arrayInvestmentIncreaseByYear = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.arrayPullValueByYear = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.arrayPullValueByYearPlusWithdrawl = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.arrayRunningInvestmentValue = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.arrayRunningPullSums = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.arrayRunningInvestmentValue = [
        [5.4, 5.7, 2.2, 2.8, 5.5, 10.222, 15.555, 19.01, 20.01, 25, 2, 0, 15.5, 27, 100.5555252],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    investmentData.withdrawlValue = [144.2223, 9001.115555];
    let expectedReturn = [
        [5, 6, 2, 3, 6, 10, 16, 19, 20, 25, 2, 0, 16, 27, 101],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    expect(getKey(x.roundArrayNumbers(investmentData),
        "arrayAdditionalInvestment")).toEqual(expectedReturn);

    expect(getKey(x.roundArrayNumbers(investmentData),
        "arrayInvestmentIncreaseByYear")).toEqual(expectedReturn);

    expect(getKey(x.roundArrayNumbers(investmentData),
        "arrayPullValueByYear")).toEqual(expectedReturn);

    expect(getKey(x.roundArrayNumbers(investmentData),
        "arrayRunningInvestmentValue")).toEqual(expectedReturn);

    expect(getKey(x.roundArrayNumbers(investmentData),
        "arrayRunningPullSums")).toEqual(expectedReturn);

    expect(getKey(x.roundArrayNumbers(investmentData),
        "arrayRunningInvestmentValue")).toEqual(expectedReturn);

    expectedReturn = [144, 9001];

    expect(getKey(x.roundArrayNumbers(investmentData),
        "withdrawlValue")).toEqual(expectedReturn);
});