# Financial Planner

## About
Use this to see graphs displaying how much your expenses will cost you over the years, how much your job will provide, 
and the value/income of your investments. On the final page (Evaluate) you will be able to compare your income to 
expenses, see how much your federal taxes will be, the impact of inflation, and so on.

You do not have to fill every section (career, expenses, investments). Just one is enough. But the more data you provide, the more informative the graphs will be. Here's an example of what you could see on the final page:

## Suggested Use
After entering your data in the Income and Expense sections, then go to the Evaluate page to see how much your 
potential savings are -- do this before going to the Investment section, so that you know how much money you may have available
to invest.

---

## Installation
- Get [repository](https://github.com/Jerrad-Johnson/Finances-Project)
- Use `npm install` in project's directory.

## Testing
- Use `npm start` to start the react dev server
- Use `npm run cypress` for DOM testing
- Use `npm run test` to test scripts directly

## Deployment
- Use `npm run build` to create a deployable version of the app, then navigate to the project's folder, then to the `build` subfolder. Upload the `build` folder's contents to a webserver, and set URL rewrites. 

## Features to Add
- Allow users to download all their raw data
- Allow users to upload raw data, so they don't have to re-enter their information once their session ends

## Other TODO
- Add jest tests for EvaluationGraphsDataHandler.js
- Add line breaks to descriptors in EvaluationGraphSet.js

## Known issues
- Currently none