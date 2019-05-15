const moment = require('moment')
const fs = require('fs')
const logger = require('../../templates/logger')
const db = require('../../configs/databases')
const dateformat = 'DD/MM/YYYY H:mm:s'

_writingCsv = (table_name, fact_table, list_data) => {
    var lists = []
    list_data.forEach((value, key) => {
        if(key>0){
            list_data[key].shift()
        }
        lists.push(list_data[key] + '\r\n')
    }) 
    let filename = `./csvs/${moment().unix()}_${table_name}.csv`
    logger.single_line("\t>> Script is trying to create a temporary file...")
    var timestart = moment().format(dateformat)
    fs.writeFile(filename, lists, 'utf8', function (err) {
        let msg = {}
        if (err) {
            msg = {
                message: "Error occured!",
                description: err
            }
            logger.result_message(msg)
        } else {
            
            msg = {
                message: "Temporary file has been created!",
                filename: filename,
                time_start: timestart,
                time_finish: moment().format(dateformat),
                total_rows: lists.length-1
            }
            logger.result_message(msg)
            let info = {
                filename: filename,
                table_name: fact_table
            }
            _uploadLoadInFile(info, result => {
                logger.result_message(result)
                fs.unlinkSync(result.filename)
            })
        } 
    });
    
}

_uploadLoadInFile = async (info, callback) => {
    var start_time = moment().format('DD/MM/YYYY H:mm:ss')
    var stmp = moment().toDate().getTime()
    var query = `LOAD DATA LOCAL INFILE '${info.filename}' `
    query += `INTO TABLE ${info.table_name} `
    query += "FIELDS TERMINATED BY ',' "
    query += `ENCLOSED BY '"' `
    query += "LINES TERMINATED BY '\r\n' "
    query += "IGNORE 1 ROWS;"
    await db.knowage_ep.query(query, (error, rows, next) => {
        let r = JSON.parse(JSON.stringify(rows))
        return  (!error) ? callback({
            status:"SUCCESS",
            description: "Fact data successfully reload from reference database",
            filename: info.filename,
            time_start: start_time,
            time_finish: moment().format('DD/MM/YYYY H:mm:ss'),
            total_rows: r.affectedRows
        }) : error
    })
}

_create_temp_csv_file = async (table_name, fact_table, data) => {
    logger.single_line('\t>> Total Rows from origin : '+ data.length)
    let list = []
    var header = Object.keys(data[0])
    list.push(header)
    var i = 1
    for(const d of data){
        let r = []
        header.forEach((value,key)=>{
            var e = (d[value] == null) ? '' : d[value].toString()
            r.push('"'+ e.replace(/"/g,'\\"') +'"')
        })
        r[0] = i
        list.push(r)
        i++
    }
    await _writingCsv(table_name, fact_table, list)
}

module.exports = {
    create_tmp_csv_file: _create_temp_csv_file,
    write_csv: _writingCsv
}