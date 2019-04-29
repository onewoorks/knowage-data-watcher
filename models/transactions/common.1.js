var connection = require('../../configs/databases/ep_cdc')

 listTables = (req, res, next) => {
    var query = `SHOW tables`
    connection.query(query, (error, rows, fields) => {
     if(!error){
         var order_trans = []
         rows.forEach((value, key )=> {
             var table_name = value.Tables_in_ep_cdc
             if(table_name.includes('ep_order_trans')){
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

listFullfillmentTables = (req,res,next){
    var query = `SHOW tables`
    connection.query(query, (error, rows, fields){
        if(!error){
            var fullfillment_trans = []
            rows.forEach(value=>{
                var fullfillment = value.Tables_in_ep_cdc
                if(fullfillment.includes('ep_fullfillment_trans')){
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

 

module.exports = {
    listTable: listTables,
    listFullfillmentTables: listFullfillmentTables
}