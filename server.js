var express = require('express'),
    bodyParser = require('body-parser'),
    spawn = require('child_process').spawn,
    app = express(),
    port = 4242,
    address = "127.0.0.1";

app.set('title', 'HDC');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    runHDC(req.query.program, function(param) {
	res.end(param);
    });
});

app.post('/', function (req, res) {
    runHDC(req.body.program, function(param) {
	res.end(param);
    });
});

function runHDC(program, callback) {
    var child = spawn('/home/aleksanb/Projects/hdc', ''),
        buffer = '';

    child.stdout.on('data', function (data) {
	buffer += data.toString();
    });

    child.stdout.on('end', function () {
        callback(buffer);
    });

    child.stdin.write(program);
    child.stdin.end();
}

app.listen(port, address);
console.log('Express server started on %s:%s', address, port);
