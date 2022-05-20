import {Link} from "react-router-dom";

function Nav() {

    return(
      <>
           <nav>
              <Link to={"Career"}>Career</Link>
              <Link to={"Expenses"}>Expenses</Link>
              <Link to={"Investments"}>Investments</Link>
              <Link to={"Evaluate"}>Evaluate</Link>
          </nav>
      </>
    );
}

export default Nav;