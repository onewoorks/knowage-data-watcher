var epcdcmysql = require('../packages/ep_cdc_myql')
const fs = require('fs')
var moment = require('moment')

async function regenerateBigFactFulfilment() {
    var query = "DELETE FROM test_load_in_file WHERE YEAR(created_date) = '" + moment().format('YYYY') + "'"
    epcdcmysql.query(query, (err, rows, next) => {
        if (!err) readFulfilmentTable('ep_fulfilment')
    })
}

async function checkFulfilmentTables(table_name) {
    var query = "SHOW tables"
    var final_table = []
    await new Promise((resolve, reject) => {
        epcdcmysql.query(query, (error, rows, cb) => {
            if (!error) {
                resolve(JSON.parse(JSON.stringify(rows)))
            }
        })
    }).then(response => {
        response.forEach(value => {
            if (value.Tables_in_ep_cdc.includes(table_name)) {
                final_table.push(value.Tables_in_ep_cdc)
            }
        })
    })
    constructAppendFulfilmentFact(final_table)
}

function constructAppendFulfilmentFact(list_tables) {
    list_tables.forEach(value => {
        readFulfilmentTable(value)
    })
}

function writingCsv(table_name, list_data) {
    var lists = []
    list_data.forEach((value, key) => {
        lists.push(list_data[key] + '\r\n')
    })
    let filename = `./csvs/${moment().unix()}_${table_name}.csv`
    fs.writeFile(filename, lists, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log(filename + '...It\'s saved!');
            uploadLoadInFile(filename)
        }
    });

}
async function uploadLoadInFile(filename) {
    var query = `LOAD DATA LOCAL INFILE '${filename}' `
    query += "INTO TABLE test_load_in_file "
    query += "FIELDS TERMINATED BY ',' "
    query += `ENCLOSED BY '"' `
    query += "LINES TERMINATED BY '\r\n' "
    query += "IGNORE 1 ROWS;"
    await epcdcmysql.query(query, (error, rows, next) => {
        if (!error) console.log(filename + '...finished')
        fs.unlinkSync(filename)
    })
}

async function readFulfilmentTable(table_name) {
    var query = "SELECT fl_total_amount, fl_module, fl_latest_status, "
    query += "fl_total_trans, fl_issued_ptj_id, fl_created_date "
    query += `FROM ${table_name}`
    let lists = []
    await new Promise((resolve, reject) => {
        epcdcmysql.query(query, (error, rows, fields) => {
            if (!error) {
                resolve(JSON.parse(JSON.stringify(rows)))
            }
        })
    }).then(response => {
        lists = response
    })
    let cleans = []
    cleans.push([
        'id',
        'created_date',
        'module',
        'status',
        'total_amount',
        'total_transaction',
        'issued_ptj'
    ])
    lists.forEach((value) => {
        var a = [
            moment(value.fl_created_date).utcOffset(value.fl_created_date).format('YYYY-MM-DD HH:mm:ss'),
            value.fl_module,
            value.fl_latest_status,
            value.fl_total_amount,
            value.fl_total_trans,
            value.fl_issued_ptj_id
        ]
        cleans.push(a)
    })
    await writingCsv(table_name, cleans)
}

module.exports = {
    checkFulfilmentTable: checkFulfilmentTables,
    reloadFactFulfilment: regenerateBigFactFulfilment
} 