var express = require('express'); //require mean that I need to receive something
var app = express(); //Running function express. Have method get

app.get('/hello', function (req, res) { // two objects: request and response(what I need to send)
  res.send('Hello World!');
});

app.listen(3000, function () { //listening port 3000
  console.log('Example app listening on port 3000!');
});



//Express is like Yii for PHP
//Node create server - Google
//Callback system - to learn