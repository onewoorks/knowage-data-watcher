const logger = require('../templates/logger')
const fact_fulfilment = require('../models/sample_feeder/fact_fulfilment')
const moment = require('moment')
const fs = require('fs')

module.exports = {
    fulfilment: (data) => {
        logger.accept_message(data)
        //    sample_feeder.fulfilment(data)
        // fact_fulfilment.fulfilment_tables()
        _check_fulfilment_tables( (results) => {
            for(const result of results.summary){
                _read_fulfilment_table(result)
            }
            
        })

    }
}

_return_info = (x) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x)
        }, 1000)
    })
}

_refill_fact_with_current_year = () => {

}

_check_fulfilment_tables = async (callback) => {
    fact_fulfilment.fulfilment_tables(async results => {
        logger.wait_message('Checking fulfilment tables information')
        var table_fulfilment = []
        for (const result of results) {
            const r = await _return_info(result)
            var a = await new Promise((resolve, reject) => {
                fact_fulfilment.count_data(r.tables, (result) => {
                    resolve({
                        table_name: r.tables,
                        rows: result.total_count
                    })
                })
            }).then(response => response)
            let summary = {
                table_name: r.tables,
                rows: a.rows
            }
            table_fulfilment.push(summary)
        }
        let data = { 
            table_category: 'ep_fulfilment',
            summary: table_fulfilment
        }
        callback(data)
        logger.result_message(data)
    })
}

_read_fulfilment_table = (table) => {
    fact_fulfilment.fulfilment_data( table, result => {
        _create_temp_csv_file(table.table_name, result)
    })
}

_create_temp_csv_file = async (table_name, data) => {
    let list = []
    var header = Object.keys(data[0])
    list.push(header)
    for(const d of data){
        let r = []
        header.forEach(value=>{
            r.push(d[value])
        })
        list.push(r)
    }

    await _writingCsv(table_name, list)
}


_writingCsv = (table_name, list_data) => {
    var lists = []
    list_data.forEach((value, key) => {
        if(key>0){
            list_data[key].shift()
        }
        lists.push(list_data[key] + '\r\n')
    }) 
    let filename = `./csvs/${moment().unix()}_${table_name}.csv`
    logger.wait_message("Script is trying to save a temporary file...")
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
            }
            logger.result_message(msg)
            let info = {
                filename: filename,
                table_name: 'fact_fulfilment'
            }
            fact_fulfilment.uploadLoadInFile(info, result => {
                logger.result_message(result)
                fs.unlinkSync(result.filename)
            
            })
        }
        
    });

}