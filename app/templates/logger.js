
module.exports = {
    receive_message: (msg) => {
        console.log('Receive message from ghost agent >>>')
        console.log(msg)
        console.log('\r')
    },
    accept_message: (msg) => {
        console.log('Submit work order to worklist >>>')
        console.log(msg)
        console.log('\r')
    },
    result_message: (msg) => {
        console.log('Execution result >>>')
        console.log(msg)
        console.log('\r')
    },
    wait_message: (msg) => {
        console.log('\tProcessing input >>>')
        console.log(msg)
        console.log('\r')
    }
}