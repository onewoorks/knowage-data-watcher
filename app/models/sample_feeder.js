var db = require('../configs/databases')

module.exports = {
    fulfilment: (data) => {
        var workdata = JSON.stringify(data)
        let query = "INSERT INTO worker_tasklist (workdata) VALUES (?)"
        db.sample_feeder.query(query, [workdata], (err, result, next) => {
            if(err) throw err
            next
        })
    }
}