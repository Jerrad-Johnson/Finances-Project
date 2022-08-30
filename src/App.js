import './App.css';
import Nav from "./components/Nav";
import Career from "./pages/Career";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import Evaluate from "./pages/Evaluate";
import Home from "./pages/Home";
import Options from "./pages/Options";
import {BrowserRouter, Route, Routes} from "react-router-dom";

let cc = console.log;

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
            <Nav />
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="Career" element={<Career/>} />
                  <Route path="Expenses" element={<Expenses />} />
                  <Route path="Investments" element={<Investments />} />
                  <Route path="Evaluate" element={<Evaluate />} />
                  <Route path="Options" element={<Options />} />
              </Routes>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;