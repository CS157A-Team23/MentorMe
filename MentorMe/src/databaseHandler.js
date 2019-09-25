const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodetest',   // configure to old mysql_native_password
    database: 'cs157a',
    debug: false
});

function handle_database(req, res) {

    pool.query("SELECT * FROM emp", (err, rows, fields) =>{// (id, name, age)
        if (err) {
            res.json({'code' : 100, 'status' : "Error connecting to Database"});
            return;
        }
        console.log("database accessed");
        let str ="<table><tr><th>ID</th><th>NAME</th><th>AGE</th></tr>";
            for ( ele of rows) {
                str += "<tr>";
                str += `<td>${ele.id}</td><td>${ele.name}</td><td>${ele.age}</td>`;
                str += "</tr>";
            }
        res.send(str);
    });
}

module.exports = {pool: pool, query : handle_database};