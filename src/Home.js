import sampleImage from './images/sample.jpg'

function Home(){

    return (
      <div className={"homeContainer"}>
          <h1>Welcome</h1>
          <span>This project is still under construction. Please excuse any bugs, poor mobile support, etc.</span>
          <span> NOTE for devs: If you try to submit your data and it fails, please check your console; I have not yet added error messages to the DOM.</span>
          <h2>What is this?</h2>
          <span>It's a financial planner; use it to see graphs displaying how much your expenses will cost you over the years, how much your job will provide, and the value of your investments. On the final page (Evaluate) you will be able to compare your income to expenses, see how much your federal taxes will be, the impact of inflation, and so on. </span>
          <span>You do not have to fill every section (career, expenses, investments). Just one is enough. But the more data you provide, the more informative the graphs will be. Here's an example of what you could see on the final page:</span>
          <br />
          <img src={sampleImage}/>
      </div>
    );
}

export default Home;