var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var sseMW = require('./app/middleware/sse');
var prompt = require('prompt')

var indexRouter = require('./routes/index');
var ghostRouter = require('./routes/ghost/sqlbinlog')
// var sseRouter = require('./routes/sse')

var app = express();
app.use(cors())
app.use(sseMW.sseMiddleware)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ghost', ghostRouter) 

var sseClients = new sseMW.Topic();
app.get('/stream', function (req, res) {
    var sseConnection = res.sseConnection;
    sseConnection.setup();
    sseClients.add(sseConnection);
});

var m;
updateSseClients = (message) => {
    this.m = message;
    sseClients.forEach((sseConnection) => {
        sseConnection.send(this.m);
    }
        , this
    );
}

promptForInput();
var timeToExit = false;
var allInput = [];

function promptForInput() {
    prompt.get(['yourInput'], async function (err, result) {
       await updateSseClients(result.yourInput);
        timeToExit = ('exit' == result.yourInput)
        if (timeToExit) {
            wrapItUp();
        }
        else {
            allInput.push(result.yourInput);
            promptForInput();
        }
    });
}

function wrapItUp() {
    console.log('It was nice talking to you. Goodbye!');
    console.log("All your input:\n " + JSON.stringify(allInput));
}
module.exports = app;
