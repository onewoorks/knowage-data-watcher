const logger = require('../templates/logger')
const fact_fulfilment = require('../models/cdccms/fact_fulfilment')
const ep_contract = require('../models/cdccms/ep_contract')
const moment = require('moment')
const fs = require('fs')
const common = require('./merger/common')

module.exports = {
    fulfilment: (data) => {
        logger.accept_message(data)
        _clear_fact_with_current_year()
        _check_fulfilment_tables( (results) => {
            for(const result of results.summary){
                _read_fulfilment_table(result)
            } 
        })
    },
    fulfilment_current: (data) =>{
        _clear_fact_with_current_year()
        let table = {
            table_name: 'ep_fulfilment'
        }
        _read_fulfilment_table(table)
    },
    contract_current: (data) => {
        ep_contract.clear_contract() 
        ep_contract.reload_contract( result => {
            common.create_tmp_csv_file('ep_contract','fact_contract',result)
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

_clear_fact_with_current_year = () => {
    fact_fulfilment.delete_current_year_fulfilment()
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
        common.create_tmp_csv_file(table.table_name, 'fact_fulfilment', result)
    })
}


//---- ep_contract
_clear_ep_contract = () => {

}