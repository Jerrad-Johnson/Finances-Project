import sampleImage from './images/sample.jpg'
import {setSampleValues} from "./utilities/sampleValues";


function Home(){

    return (
      <div className={"homeContainer"}>
          {/*<h1>Welcome</h1>
          <span>This project is still under construction. Please excuse any bugs, poor mobile support, etc.</span>*/}
          <h1>Quick Start</h1>
          <span><b>NOTE:</b> &nbsp; This will delete any values you have already set. To get preset values and see how this app works,</span>

          <div className={"buttonsSideBySide"}>
              <button className={"getSampleValues"} onClick={(e) => {
                  e.preventDefault();
                  setSampleValues();
                  window.location.href = 'Evaluate';
              }}>Load</button>

          </div>
          <h2>What is this?</h2>
          <span>It's a financial planner; use it to see graphs displaying how much your expenses will cost you over the years, how much your job will provide, and the value of your investments. On the final page (Evaluate) you will be able to compare your income to expenses, see how much your federal taxes will be, the impact of inflation, and so on. </span>
          <span>You do not have to fill every section (career, expenses, investments). Just one is enough. But the more data you provide, the more informative the graphs will be. Here's an example of what you could see on the final page:</span>
          <br />
          <a href={sampleImage} target={"_blank"}><img src={sampleImage}/></a>

      </div>
    );
}

export default Home;