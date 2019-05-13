var sampleFeeder = require('../models/sample_feeder')

newWorker = (data) => {
    console.log('new worker info')
    console.log(data)
}

module.exports = {
    new_worker_list: newWorker
}