const db = require('../../configs/databases')
const path = require('path')
const db_name = path.basename(path.dirname(__filename))

module.exports = {
    clear_contract: (callback) => {
        var query = "DELETE * FROM fact_contract"
        db.knowage_ep.query(query, (err, rows, next)=> {
            return (!err) ? callback(db.return_result(rows)) : err
        })
    },
    reload_contract: (callback) => {
        var query = "SELECT * FROM ep_contract"
        db[db_name].query(query, (err, rows, next) => {
            return (!err) ? callback(db.return_result(rows)) : err
        })
    }
}