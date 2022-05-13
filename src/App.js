import './App.css';
import Career from "./Career";
import Expenses from "./Expenses";
import Investments from "./Investments";
import Nav from "./Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Evaluate from "./Evaluate";
let cc = console.log;

function App() {

  return (
    <div className="App">
      <header className="App-header">
              <BrowserRouter>
                <Nav />
                  <Routes>
                      <Route path="Career.js" element={<Career/>}></Route>
                      <Route path="Expenses.js" element={<Expenses />}></Route>
                      <Route path="Investments.js" element={<Investments />}></Route>
                      <Route path="Evaluate.js" element={<Evaluate />}></Route>
                  </Routes>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
