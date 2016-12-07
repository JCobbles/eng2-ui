var express = require('express');
var app = express();
var SerialPort = require('serialport');
var server = app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
var io = require('socket.io').listen(server);

app.use(express.static('public'));

var portInformation = { comName: '/dev/ttyACM0' };
SerialPort.list(function(err, ports) {
	if (ports && ports[0]) {
		portInformation = ports[0];
	}
});
var port = new SerialPort(portInformation.comName, {
	parser: SerialPort.parsers.readline('\n')
});

app.get('/settemperature/:temp', function(req, res) {
	port.write('1 ' + req.params.temp);
	res.json({ success: true });
});

app.get('/setph/:ph', function(req, res) {
	port.write('2 ' + req.params.ph);
	res.json({ success: true });
});

app.get('/setspeed/:speed', function(req, res) {
	port.write('3 ' + req.params.speed);
	res.json({ success: true });
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
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
