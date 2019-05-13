var mysql = require('mysql')

var ep_cdc = mysql.createConnection({
    host: "localhost",
    user: "iwang",
    password: "Root@!234",
    database: "ep_cdc"
})

var sample_feeder = mysql.createConnection({
    host: "localhost",
    user: "iwang",
    password: "Root@!234",
    database: "sample_feeder"
})

ep_cdc.connect(err=>{
    if(err) throw err
})
sample_feeder.connect(err=>{
    if(err) throw err
})

const return_result = (result) => {
    return JSON.parse(JSON.stringify(result))
}
module.exports = {
    ep_cdc,
    sample_feeder,
    return_result
} 