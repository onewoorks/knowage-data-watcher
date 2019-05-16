var express = require('express');
var router = express.Router();
var logger = require('../../app/templates/logger')

var cdccms = require('../../app/controllers/cdccms')

router.get('/', function (req, res, next) {
    res.json({
        result: "i received your order.. will informed you when completed"
    });
    console.log('i received a task from someone')
});

router.post('/ep_fulfilment', (req, res, next) => {
    logger.receive_message(req.body)
    cdccms.fulfilment_current(req.body)
    res.send()
})

router.post('/ep_contract', (req, res, next) => {
    logger.receive_message(req.body)
    cdccms.contract_current(req.body)
    res.send()
})

module.exports = router;