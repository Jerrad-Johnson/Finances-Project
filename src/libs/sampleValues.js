import JobDataHandler from "./jobdatahandler";
import ExpenseDataHandler from "./expensedatahandler";
import {cc} from "../components/jobssharedfunctions";

export function setSampleValues() {
    let linearJobs = [{
        title: "Lawyer - Average Income",
        yearIncomeBegins: 0,
        yearToIncomeCeiling: 14,
        incomeCeiling: 150000,
        incomeImmediate: 150000,
        passed: true,
        key: 28000,
    }];

    let steppedJobs = [{
        title: "Grocery Worker then Manager",
        salaryAmounts: [37500, 37500, 42000, 42000, 42000, 55000, 55000, 55000, 55000,
            55000, 55000, 55000, 55000, 55000, 55000],
        salaryYears: [1, 3, 6],
        key: 29000,
        passed: true,
    }, {
        title: "Construction Worker then Foreman",
        salaryAmounts: [37500, 45000, 45000, 52000, 52000, 52000, 72800, 72800, 72800,
            72800, 72800, 72800, 72800, 72800, 72800],
        salaryYears: [1, 2, 4, 7],
        key: 29001,
        passed: true,

    }, {
        title: "IT Support",
        salaryAmounts: [50000, 60000, 60000, 75000, 75000, 75000, 75000, 75000, 75000,
            75000, 75000, 75000, 75000, 75000, 75000],
        salaryYears: [1, 2, 4],
        key: 29002,
        passed: true,
    }, {
        title: "Fast Food",
        salaryAmounts: [27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000, 27000,
            27000, 27000, 27000, 27000, 27000, 27000],
        salaryYears: [1],
        passed: true,
        key: 28004,
    }, {
        title: "Student",
        salaryAmounts: [18000, 18000, 18000, 18000, 55000, 55000, 70000, 70000, 90000, 90000, 90000, 90000, 90000, 90000, 90000],
        salaryYears: [1, 5, 7, 9],
        passed: true,
        key: 28006,
    }];

    let expenses = [{
        title: "Car Enthusiast",
        amount: [1600, 330, 250, 700, 1250, 20000, 90, 150, 270],
        beginYears: [1, 1, 1, 1, 3, 2, 1, 2, 3],
        endYears: [15, 15, 15, 7, 9, 2, 1, 2, 15],
        frequency: ['mo', 'mo', 'mo', 'mo', 'mo', 'yr', 'mo', 'mo', 'mo'],
        label: ['Home Loan (three-car garage)', 'Utilities/etc.', 'Food', 'Challenger Scat Pack', 'C8 Corvette',
            'Firebird WS6', 'Auto Insurance 1 vehicle', 'Auto Insurance 2 vehicles', 'Auto Insurance 3 vehicles'],
        pass: true,
        key: 30001,
    }, {
        title: "Tampa Bay Apartment",
        amount: [1500, 250, 280, 250, 200, 200],
        beginYears: [1, 1, 1, 1, 1, 1],
        endYears: [15, 15, 15, 15, 15, 15],
        frequency: ['mo', 'mo', 'mo', 'mo', 'mo', 'mo'],
        label: ['Rent', 'Auto Insurance', 'Decent Car', 'Food', 'Util', 'Random Expenses'],
        pass: true,
        key: 30002,
    }, {
        title: "Simple Life",
        amount: [150, 900, 250, 250, 180],
        beginYears: [1, 1, 1, 1, 1],
        endYears: [15, 15, 15, 15, 15],
        frequency: ['mo', 'mo', 'mo', 'mo', 'mo'],
        label: ['Car Payment', 'Rent', 'Utilities', 'Food', 'Car Maint & Ins'],
        pass: true,
        key: 30003,
    }, {
        title: "Student",
        beginYears: [1, 1, 5, 5, 1, 5, 1, 7],
        endYears: [4, 15, 15, 15, 4, 11, 6, 15],
        frequency: ['yr', 'mo', 'mo', 'mo', 'mo', 'mo', 'mo', 'mo'],
        label: ['Tuition and Dorm', 'Food', 'Rent', 'Utilities', 'Car', 'Better Car', 'Auto Ins.', 'Auto Ins change'],
        pass: true,
        key: 30004,
    }];

    let linearJobsCalculated = linearJobs.map((e) => {
        return new JobDataHandler(e).beginLinear();
    });

    let steppedJobsCalculated = steppedJobs.map((e) => {
        return new JobDataHandler(e).beginStepped();
    });

    let expensesCalculated = expenses.map((e) => {
       return new ExpenseDataHandler(e).beginCalculations();
    });

    //cc(expensesCalculated)
    //localStorage.setItem("linearjob", linearJobs);

}





























