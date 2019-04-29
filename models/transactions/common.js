var connection = require('../../configs/databases/ep_cdc')

listTables = (req, res, next) => {
    var query = `SHOW tables`
    connection.query(query, (error, rows, fields) => {
        if (!error) {
            var order_trans = []
            rows.forEach((value, key) => {
                var table_name = value.Tables_in_ep_cdc
                if (table_name.includes('ep_order_trans')) {
                    order_trans.push(value.Tables_in_ep_cdc)
                }
            })
            var result = {
                total: order_trans.length,
                data: order_trans
            }
            res.json(result)
        }
    })
}

listFullfillmentTables = () => {
    var query = `SHOW tables`
    connection.query(query, (error, rows, fields) => {
        if (!error) {
            var fullfillment_trans = []
            rows.forEach(value => {
                var fullfillment = value.Tables_in_ep_cdc
                if (fullfillment.includes('ep_fulfilment_trans')) {
                    fullfillment_trans.push(value.Tables_in_ep_cdc)
                }
            })
            var result = {
                total: fullfillment_trans.length,
                data: fullfillment_trans
            }
            res.json(result)
        }
    })
}

listFactTables = async () => {
    var query = `SHOW TABLEs`
    var result = []
    await new Promise(function (resolve, reject) {
        connection.query(query, function (err, rows, fields) {
            if (!err) {
                resolve(JSON.parse(JSON.stringify(rows)))
            } else { reject(err) }
        })
    }).then(response => {
        var facts = []
        response.forEach(value=> {
            var fact = value.Tables_in_ep_cdc
            if(fact.includes('bi_fact')){
                facts.push(value.Tables_in_ep_cdc)
            }
        })
        result = facts
    })
    return result
}

module.exports = {
    listTable: listTables,
    listFullfillmentTables: listFullfillmentTables,
    listFactTables
}