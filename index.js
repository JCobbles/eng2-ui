var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Challenge 2000');
});

app.listen(3000, function () {
  console.log('Listening on localhost:3000');
});
