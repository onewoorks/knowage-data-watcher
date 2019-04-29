var mysql = require('mysql')

var con = mysql.createConnection({
    host: "192.168.120.66",
    user: "dev_user",
    password: "cDc@2019",
    database: "ep_cdc"
})

con.connect(function(err){
    if(err) throw err
})


module.exports = con