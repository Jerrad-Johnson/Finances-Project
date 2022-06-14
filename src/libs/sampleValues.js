export function setSampleValues(){
    localStorage.setItem("linearjob", linearJobs);



    let linearJobs = [{
        incomeCeiling: 150000,
        incomeImmediate: 150000,
        incomeInGraphYearsNumberOfSteps: [150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000, 150000],
        incomeIncreasePerYear: 0,
        key: 0,
        passed: true,
        sum: 2250000,
        sumIncomeByYear: [150000, 300000, 450000, 600000, 750000, 900000, 1050000, 1200000, 1350000, 1500000, 1650000, 1800000, 1950000, 2100000, 2250000],
        title: "Lawyer - Average Income",
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }];

    let steppedJobs = [{
        key: 0,
        passed: true,
        salaryAmounts: [37500, 37500, 42000, 42000, 42000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000],
        salarySumByYear: [37500, 75000, 117000, 159000, 201000, 256000, 311000, 366000, 421000, 476000, 531000, 586000, 641000, 696000, 751000],
        salaryYears: [1, 3, 6],
        sum: 751000,
        title: "Grocery Worker then Manager",
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }, {
        key: 2,
        passed: true,
        salaryAmounts: [37500, 45000, 45000, 52000, 52000, 52000, 72800, 72800, 72800, 72800, 72800, 72800, 72800, 72800, 72800],
        salarySumByYear: [37500, 82500, 127500, 179500, 231500, 283500, 356300, 429100, 501900, 574700, 647500, 720300, 793100, 865900, 938700],
        salaryYears: [1, 2, 4, 7],
        sum: 938700,
        title: "Construction Worker then Foreman",
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }, {
        key: 3,
        passed: true,
        salaryAmounts: [50000, 60000, 60000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000],
        salarySumByYear: [50000, 110000, 170000, 245000, 320000, 395000, 470000, 545000, 620000, 695000, 770000, 845000, 920000, 995000, 1070000],
        salaryYears: [1, 2, 4],
        sum: 1070000,
        title: "IT Support",
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }, {
        key: 4,
        passed: true,
        salaryAmounts: [27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000],
        salarySumByYear: [27000, 54000, 81000, 108000, 135000, 162000, 189000, 216000, 243000, 270000, 297000, 324000, 351000, 378000, 405000],
        salaryYears: [1],
        sum: 405000,
        title: "Fast Food",
        yearsNumbered: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }];

    let expensesSheets = [{
    amount: [1600, 330, 250, 700, 1250, 20000, 90, 150, 270],
    beginYears: [1, 1, 1, 1, 3, 2, 1, 2, 3],
    calculatedAmount: [19200, 3960, 3000, 8400, 15000, 20000, 1080, 1800, 3240],
    endYears: [15, 15, 15, 7, 9, 2, 1, 2, 15],
    frequency: ['mo', 'mo', 'mo', 'mo', 'mo', 'yr', 'mo', 'mo', 'mo'],
    graphRunningSumObject: [{
        data: [19200, 38400, 57600, 76800, 96000, 115200, 134400, 153600, 172800, 192000, 211200, 230400, 249600, 268800, 288000],
        name: "Home Loan (three-car garage)",
    }, {
        data: [3960, 7920, 11880, 15840, 19800, 23760, 27720, 31680, 35640, 39600, 43560, 47520, 51480, 55440, 59400],
        name: "Utilities/etc.",
    }, {
        data: [3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000, 27000, 30000, 33000, 36000, 39000, 42000, 45000],
        name: "Food",
    }, {
        data: [8400, 16800, 25200, 33600, 42000, 50400, 58800, 58800, 58800, 58800, 58800, 58800, 58800, 58800, 58800],
        name: "Challenger Scat Pack",
    }, {
        data: [0, 0, 15000, 30000, 45000, 60000, 75000, 90000, 105000, 105000, 105000, 105000, 105000, 105000, 105000],
        name: "C8 Corvette",
    }, {
        data: [0, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000],
        name: "Firebird WS6",
    }, {
    data: (15) [1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080],
    name: "Auto Insurance 1 vehicle",
    }, {
    data: [0, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800],
    name: "Auto Insurance 2 vehicles",
    }, {
    data:  [0, 0, 3240, 6480, 9720, 12960, 16200, 19440, 22680, 25920, 29160, 32400, 35640, 38880, 42120],
    name: "Auto Insurance 3 vehicles",
    }],
    graphSumEachExpenseObjectForDonut: [{
        data: [288000, 59400, 45000, 58800, 105000, 20000, 1080, 1800, 42120],
        name: ["Home Loan (three-car garage)", "Utilities/etc.", "Food", "Challenger Scat Pack", "C8 Corvette",
            "Firebird WS6", "Auto Insurance 1 vehicle", "Auto Insurance 2 vehicles", "Auto Insurance 3 vehicles"]
    }],
    graphSumObject: [{
        data: [19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200, 19200],
        name: "Home Loan (three-car garage)",
    }, {
        data: [3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960, 3960],
        name: "Utilities/etc.",
    }, {
        data: [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
        name: "Food",
    }, {
        data: [8400, 8400, 8400, 8400, 8400, 8400, 8400, 0, 0, 0, 0, 0, 0, 0, 0],
        name: "Challenger Scat Pack",
    }, {
        data: [0, 0, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 0, 0, 0, 0, 0, 0],
        name: "C8 Corvette",
    }, {
        data: [0, 20000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        name: "Firebird WS6",
    }, {
        data: [1080, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        name: "Auto Insurance 1 vehicle",
    }, {
        data: [0, 1800, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        name: "Auto Insurance 2 vehicles",
    }, {
    data: [0, 0, 3240, 3240, 3240, 3240, 3240, 3240, 3240, 3240, 3240, 3240, 3240, 3240, 3240],
    name: "Auto Insurance 3 vehicles",
    }],
    key: 13,
    label: ['Home Loan (three-car garage)', 'Utilities/etc.', 'Food', 'Challenger Scat Pack', 'C8 Corvette', 'Firebird WS6', 'Auto Insurance 1 vehicle', 'Auto Insurance 2 vehicles', 'Auto Insurance 3 vehicles'],
    numberOfEntries: 9,
    pass: true,
    runningSumsByYear: [
    [19200, 38400, 57600, 76800, 96000, 115200, 134400, 153600, 172800, 192000, 211200, 230400, 249600, 268800, 288000],
    [3960, 7920, 11880, 15840, 19800, 23760, 27720, 31680, 35640, 39600, 43560, 47520, 51480, 55440, 59400],
    [3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000, 27000, 30000, 33000, 36000, 39000, 42000, 45000],
    [8400, 16800, 25200, 33600, 42000, 50400, 58800, 58800, 58800, 58800, 58800, 58800, 58800, 58800, 58800],
    [0, 0, 15000, 30000, 45000, 60000, 75000, 90000, 105000, 105000, 105000, 105000, 105000, 105000, 105000],
    [0, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000],
    [1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080, 1080],
    [0, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800],
    [0, 0, 3240, 6480, 9720, 12960, 16200, 19440, 22680, 25920, 29160, 32400, 35640, 38880, 42120],
    ],
    sum: [288000, 59400, 45000, 58800, 105000, 20000, 1080, 1800, 42120],
    title: "Car Enthusiast",
    yearsNumbered: (15) ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14', 'Year 15'],
    }],
}









