import './App.css';
import Career from "./Career";
import Expenses from "./Expenses";
import Investments from "./Investments";
import Nav from "./Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TestProvider} from "./context/TestContext";
let cc = console.log;

function App() {
/*    let tempState;

    steppedJobDataState ? tempState = steppedJobDataState : tempState = [];

/!*    if (steppedJobDataState !== undefined){
        let tempState = steppedJobDataState;
    } else {
        let tempState = [];
    }*!/*/

  return (
    <div className="App">
      <header className="App-header">
          {/*<TestProvider>*/}
              <BrowserRouter>
                <Nav />
                  <Routes>
                      <Route path="Career.js" element={<Career/>}></Route>
                      <Route path="Expenses.js" element={<Expenses />}></Route>
                      <Route path="Investments.js" element={<Investments />}></Route>
                  </Routes>
              </BrowserRouter>
          {/*</TestProvider>*/}
      </header>
    </div>
  );
}

export default App;
