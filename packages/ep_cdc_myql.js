var mysql = require('mysql')

var con = mysql.createConnection({
    host: "x",
    user: "x",
    password: "x",
    database: "x"
})

con.connect(function(err){
    if(err) throw err
})

module.exports = con