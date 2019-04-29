var express = require('express')
var router = express.Router()

var common = require('../../models/databases/ep_cdc')

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

module.exports = router;