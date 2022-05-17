import {Link} from "react-router-dom";

function Nav() {

    return(
      <>
           <nav>
              <Link to={"Career"}>Career</Link> &nbsp;
              <Link to={"Expenses"}>Expenses</Link> &nbsp;
              <Link to={"Investments"}>Investments</Link> &nbsp;
              <Link to={"Evaluate"}>Evaluate</Link>
          </nav>
      </>
    );
}

export default Nav;