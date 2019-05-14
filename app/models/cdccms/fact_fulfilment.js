const db = require('../../configs/databases')
const path = require('path')
const db_name = path.basename(path.dirname(__filename))

const fulfilment_tables = (callback) => {
    var query = `SELECT TABLE_NAME AS tables 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = 'sample_feeder'
        AND TABLE_NAME LIKE 'ep_fulfilment%'`;
    db[db_name].query(query, (error, rows, fields) => {
        if (!error) {
            return callback(JSON.parse(JSON.stringify(rows)))
        }
    })
}

module.exports = {
    fulfilment_tables,
    count_data: (table, callback) => {
        var query = `SELECT count(*) as total_count FROM ${table}`
        db[db_name].query(query, (err, rows, fields) => {
            return !err ? callback(db.return_result(rows[0])) : err
        })
    },
    fulfilment_data: (table, callback) => {
        var query = `SELECT * FROM ${table.table_name}`
        db[db_name].query(query, (err, rows, fields) => {
            return !err ? callback(db.return_result(rows)) : err
        })
    },
    fulfilment_current_year: (callback) => {
        var query = "SELECT * FROM ep_fulfilment"
        db[db_name].query(query, (err, rows, fields)=>{
            return (!err) ? callback(rows) : err
        })
    },
    delete_current_year_fulfilment: () => {
        var thisYear = new Date().getFullYear()
        var query = `DELETE FROM fact_fulfilment WHERE YEAR(fl_created_date) = ${thisYear}`
        db[db_name].query(query, (err, rows, fields)=>{
            if (!err) console.log(`${thisYear} - fulfilment data is deleted!\r\n`)
        })  
    },

    check_current_fact_table: (table, callback) => {
        var query = `SELECT count(*)
        AS total,
        fl_created_date AS year
        FROM fact_fulfilment
        GROUP BY YEAR(fl_created_date)`
        db[db_name].query(query, (err, rows, fields) => {
            return !err ? callback(db.return_result(rows)) : err
        })
    },

    uploadLoadInFile: async (info, callback) => {
        var query = `LOAD DATA LOCAL INFILE '${info.filename}' `
        query += `INTO TABLE ${info.table_name} `
        query += "FIELDS TERMINATED BY ',' "
        query += `ENCLOSED BY '"' `
        query += "LINES TERMINATED BY '\r\n' "
        query += "IGNORE 1 ROWS;"
        await db.knowage_ce.query(query, (error, rows, next) => {
            return  (!error) ? callback({
                status:"success",
                filename: info.filename
            }) : error
        })
    }
}
