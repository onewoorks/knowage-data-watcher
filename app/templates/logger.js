const saparator = "----------------------------------------------------------------------------------------"
const host = "HOST MESSAGE : "
const moment = require('moment')
const dateformat = 'DD/MM/YYYY H:mm:s'

var timenow = moment().format(dateformat)

module.exports = {
    single_line: async (msg) =>{
        console.log(msg)
        await updateSseClients(saparator)
        await updateSseClients(moment().format(dateformat));
        await updateSseClients(msg);
    },
    receive_message: async (msg) => {
        console.log(saparator)
        console.log(moment().format(dateformat))
        console.log(host + 'Receive message from ghost agent >>>')
        console.log(msg)
        console.log('\r')
        await updateSseClients(saparator)
        await updateSseClients(moment().format(dateformat));
        await updateSseClients(msg);
    },
    accept_message: async (msg) => {
        console.log(saparator)
        console.log(moment().format(dateformat))
        console.log(host + 'Submit work order to worklist >>>')
        console.log(msg)
        console.log('\r')
        await updateSseClients(saparator)
        await updateSseClients(moment().format(dateformat));
        await updateSseClients(msg);
    },
    result_message: async (msg) => {
        console.log(saparator)
        console.log(`${moment().format(dateformat)} > ${host} > Execution Result >>> `)
        console.log(msg)
        console.log('\r')
        await updateSseClients(saparator)
        await updateSseClients(moment().format(dateformat));
        await updateSseClients(msg);
    },
    wait_message: async (msg) => {
        console.log(saparator)
        console.log(moment().format(dateformat))
        console.log(host + 'Processing input >>>')
        console.log(msg)
        console.log('\r')
        await updateSseClients(saparator)
        await updateSseClients(moment().format(dateformat));
        await updateSseClients(msg);
    }
}