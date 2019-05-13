var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "iwang",
    password: "Root@!234",
    database: "sample_feeder"
})

con.connect(function(err){
    if(err) throw err
})


module.exports = con