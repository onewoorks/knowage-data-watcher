var express = require('express')
var router = express.Router()

const merging = require('../../packages/merging')

var common = require('../../app/models/databases/ep_cdc')

router.get('/orders', (req, res, next) => {
    common.listTable(req,res,next)
})

router.get('/dimensions', async (req,res, next)=>{
    let dimensions = await common.listDimensionTables()
    res.json(dimensions)
})

router.get('/fullfillment', (req,res,next) => {
    common.listFullfillmentTables(req,res,next)
})

router.get('/facts', async (req, res, next) => {
    let result = await common.listFactTables()
    res.json(result)
})

router.get('/merge-order-fulfilment', async (req, res, next) => {
    let result = await merging.checkFulfilmentTable('ep_fulfilment')
    res.json(result)
})

router.get('/reload-fact-fulfilment', async (req, res, next)=>{
    merging.reloadFactFulfilment()
    res.json('ok')
})


module.exports = router;