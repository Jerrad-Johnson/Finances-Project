import {Link} from "react-router-dom";

function Nav() {

    return(
      <>
           <nav>
              <Link to={"/Career.js"}>Career</Link> &nbsp;
              <Link to={"/Expenses.js"}>Expenses</Link>
          </nav>
      </>
    );
}

export default Nav;