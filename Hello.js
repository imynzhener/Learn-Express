/*var express = require('express'); //require mean that I need to receive something
var app = express(); //Running function express. Have method get, post - (http), listen, etc.
*/

/*app.get('/', function (req, res) { // two objects: request and response(what I need to send)
  res.sendFile(__dirname + '/index.html'); // sending file
});

app.listen(3000, function () { //listening port 3000
  console.log('Example app listening on port 3000!');

});*/

var express = require('express');
var path = require('path'); //path - для работы с путями к дирректориям

var app = express(); //Создали приложение на Express, он имеет уже все методы для работы
var http = require('http').Server(app); //Создали сервер, в его роли будет app на Express
var io = require('socket.io')(http); // Записываем в переменную модуль Socket.io и передаем в него наш http сервер. Сервер теперь будет работать с Socket.io
var users = {}; // Object for all users (key=>value)

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){ // Функция сработает, когда будет вызван url. Обработка get запроса
  res.sendFile(__dirname + '/index.html'); //Отправляем с back-end файл index (dirname - путь к dir файла, в которой мы находимся)
});

io.on('connection', function(socket){ // io.on - on, значит что мы что-то будем слушать. Как только кто-то подключится к серверу, то выполнится ф-я
  console.log('User is connected');

  socket.on('join', function(name) { // join - название события
  	users[socket.id] = name; //socket.id - идентификатор соединения с сокетом на сервере
  	io.emit('join', name); // Мы с сервера всем говорим, что такой-то user подключился к чату
  });

  /* socket.on('disconnect', function(){ // Сокет - это объект, который мы принимаем. Disconnect - это событие сокета.
    console.log('user disconnected');
  });*/

  socket.on('chat message', function(msg){ // Этот сокет мы приняли тогда, когда подключились. эта ф-я принимает то, что я отравляю
    console.log('user message: ' + msg); // msq - это то, что я отправлял
    io.emit('chat message', users[socket.id], msg); // Мы с сервера всем говорим, чтобы все услышаши(делаем emmit)
  });

});

http.listen(3000, function(){ // HTTP сервер слушает порт 3000, т.е. сайт будет работать на порту 3000
  console.log('listening on *:3000');
});



// Работа с сокетами - это работа с событиями между сервером и клиентами, работающими с этим сервером
// Сервер отдает событие всем, кто с ним работает





//Express is like Yii for PHP
//Node create server - Google
//Callback system - to learn