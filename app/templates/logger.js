const saparator = "-----------------------------------------------------------"
const host = "HOST MESSAGE : "
const moment = require('moment')

var timenow = moment().format('DD MM YYYY H:mm:s')

module.exports = {
    receive_message: (msg) => {
        console.log(saparator)
        console.log(moment().format('DD MM YYYY H:mm:s'))
        console.log(host + 'Receive message from ghost agent >>>')
        console.log(msg)
        console.log('\r')
    },
    accept_message: (msg) => {
        console.log(saparator)
        console.log(moment().format('DD MM YYYY H:mm:s'))
        console.log(host + 'Submit work order to worklist >>>')
        console.log(msg)
        console.log('\r')
    },
    result_message: (msg) => {
        console.log(saparator)
        console.log(moment().format('DD MM YYYY H:mm:s'))
        console.log(host + 'Execution result >>>')
        console.log(msg)
        console.log('\r')
    },
    wait_message: (msg) => {
        console.log(saparator)
        console.log(moment().format('DD MM YYYY H:mm:s'))
        console.log(host + 'Processing input >>>')
        console.log(msg)
        console.log('\r')
    }
}