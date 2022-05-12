function Login(){
    return (
      <div>
          <br />
          <form>
              Login
              <br />
              <input type={"text"}></input> Username
              <br />
              <input type={"text"}></input> Password
              <br />
              <button type={"submit"} onClick={(e) => {
                  e.preventDefault();
              }}>Submit</button>
              <br /><br />
              Create Account
              <br />
              <input type={"text"}></input> Username
              <br />
              <input type={"text"}></input> Password
              <br />
              <button type={"submit"} onClick={(e) => {
                  e.preventDefault();
              }}>Submit</button>


          </form>
      </div>
    );
}

export default Login;