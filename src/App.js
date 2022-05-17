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
                      <Route path="/Career" element={<Career/>} />
                      <Route path="/Expenses" element={<Expenses />} />
                      <Route path="/Investments" element={<Investments />} />
                      <Route path="/Evaluate" element={<Evaluate />} />
                  </Routes>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
