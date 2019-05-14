var express = require('express');
var router = express.Router();
var logger = require('../../app/templates/logger')

var sampleFeeder = require('../../app/controllers/sample_feeder')
var cdccms = require('../../app/controllers/cdccms')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        result: "i received your order.. will informed you when completed"
    });
    console.log('i received a task from someone')
});

router.post('/fulfilment', (req, res, next) => {
    let body = req.body
    let data = {
        title: body.title,
        table: body.table,
        column: body.column,
        old_data: body.old_data,
        new_data: body.new_data
    }
    res.json({ 
        info: 'We triggered something... and we ask our worker to take and action, we will inform you later... thank you',
        message: data
    })
    sampleFeeder.fulfilment(data)
})

router.post('/ep_fulfilment', (req, res, next) => {
    logger.receive_message(req.body)
    cdccms.fulfilment_current(req.body)
    res.send()
})

module.exports = router;
