var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.enable('trust proxy');
app.get('trust proxy');

app.set('title', 'Along the Way');
app.get('title');
// => "My Site"



// app.use('/dist', express.static(__dirname + '/dist'));
app.use('/', express.static('./dist'));

app.get('/', function (req, res) {
    res.sendfile('./app/index.html');
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});
