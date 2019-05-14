var mysql = require('mysql')

var cdccms = mysql.createConnection({
    host: "localhost",
    user: "iwang",
    password: "Root@!234",
    database: "cdccms"
})

var sample_feeder = mysql.createConnection({
    host: "localhost",
    user: "iwang",
    password: "Root@!234",
    database: "sample_feeder"
})

var knowage_ep = mysql.createConnection({
    host: "localhost",
    user: "iwang",
    password: "Root@!234",
    database: "knowage_ep"
})

cdccms.connect(err=>{
    if(err) throw err
})
sample_feeder.connect(err=>{
    if(err) throw err
})
knowage_ep.connect(err=>{
    if(err) throw err
})

const return_result = (result) => {
    return JSON.parse(JSON.stringify(result))
}
module.exports = {
    cdccms,
    sample_feeder,
    knowage_ep,
    return_result
} 