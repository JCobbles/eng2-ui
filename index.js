var express = require('express');
var app = express();
var SerialPort = require('serialport');
var server = app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
var io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

var port = new SerialPort('/dev/ttyACM0', {
	parser: SerialPort.parsers.readline('\n')
});

port.on('data', function (data) {
	io.sockets.emit('update', { data: data });
	console.log('Data: ' + data);
	// This is how to send messages back
	// port.write('Hi!\n');
});
