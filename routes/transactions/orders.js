var express = require('express')
var router = express.Router()

var common = require('../../models/transactions/common')

router.get('/orders', (req, res, next) => {
    common.listTable(req,res,next)
})

router.get('/fullfillment', (req,res,next) => {
    common.listFullfillmentTables(req,res,next)
})

router.get('/facts', async (req, res, next) => {
    let result = await common.listFactTables()
    res.json(result)
    // result.forEach(value => {
    //     var fact = value.Tables_in_ep_cdc
    //     if(fact.includes('bi_fact')){
    //         facts.push(value.Tables_in_ep_cdc)
    //     }
    //     res.json(facts)
    // })
})

module.exports = router;