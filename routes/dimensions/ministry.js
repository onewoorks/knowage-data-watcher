var express = require('express')
var router = express.Router();

var connection = require('../../configs/databases/ep_cdc')

router.get('/', (req,res,next)=> {
    var query = "SELECT * FROM bi_dim_ministry "
    connection.query(query, (error, rows, fields) => {
        let data = {
            total: rows.length,
            data: rows
        }
        if(!error) res.json(data)
    })
})

router.get('/:ministry_id', (req,res,next)=> {
    let ministry_id = parseInt(req.params.ministry_id)
    var query = `SELECT * FROM bi_dim_ministry WHERE ministry_id = ${ministry_id}`
    connection.query(query, (error, rows, fields) => {
        if(!error) res.json(rows)
    })
})

module.exports = router;