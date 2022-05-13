let cc = console.log

function Login(){

    fetch('', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'User'
        })
    }).then(res => {
        cc(res)
        //return res.json();
    })//.then(data => console.log(data));

/*    fetch('http://192.168.0.120:80/php/setupTables.php', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'User'
        })
    }).then(res => {
        return res.json();
    }).then(data => console.log(data));*/

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