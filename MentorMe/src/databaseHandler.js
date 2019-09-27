const mysql = require('mysql');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4Fuckmysql!',   // configure to old mysql_native_password
    database: 'cs157a'
});

function handle_database(req, res) {

    pool.query("SELECT * FROM emp", (err, rows, fields) =>{
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
