import {Link} from "react-router-dom";

function Nav() {

    return(
      <>
           <nav>
              <Link to={""}>Home</Link>
              <Link to={"Career"}>Career</Link>
              <Link to={"Expenses"}>Expenses</Link>
              <Link to={"Investments"}>Investments</Link>
              <Link to={"Evaluate"}>Evaluate</Link>
              <Link to={"Options"}>Options</Link>
          </nav>
      </>
    );
}

export default Nav;