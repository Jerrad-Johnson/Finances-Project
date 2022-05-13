var mysql = require('mysql');
let server = "localhost";
let username = "financesproject";
let db = "finances"
let pw = "65lSe6hz!*ayASs!l84";
let cc = console.log;

var con = mysql.createConnection({
    host: server,
    user: username,
    password: pw,
    database: db,
});



con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM users", (err, res, fields) => {
        cc(fields);
    });
});

cc(Object.getOwnPropertyNames(con))
//console.log(con);