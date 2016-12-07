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

app.get('/setph/:ph', function(req, res) {
	port.write('1 ' + req.params.ph);
});
app.get('/settemperature/:temp', function(req, res) {
	port.write('2 ' + req.params.temp);
});
app.get('/setspeed/:speed', function(req, res) { // action="setspeed?speed=22"
	port.write('3 ' + req.params.speed);
});

var port = new SerialPort('COM12', {
	parser: SerialPort.parsers.readline('\n')
});

port.on('data', function (data) {
	io.sockets.emit('update', { data: data });
	console.log('Data: ' + data);
	// This is how to send messages back
	// port.write('Hi!\n');
});
/*
1 - ph
2 - temp
3 - motor speed
*/
