import {Link} from "react-router-dom";

function Nav() {

    return(
      <>
           <nav>
              <Link to={"/Career.js"}>Career</Link> &nbsp;
              <Link to={"/Expenses.js"}>Expenses</Link> &nbsp;
              <Link to={"/Investments.js"}>Investments</Link> &nbsp;
              <Link to={"/Evaluate.js"}>Evaluate</Link>
          </nav>
      </>
    );
}

export default Nav;