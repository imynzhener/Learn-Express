$(function () {
        var socket = io(); 

        $('#user_form').submit(function() {
          if (!$('#user_name').val()) {
            return false;
          }

          socket.emit('join', $('#user_name').val()); 
          $('#user_name').val('');

          $('.user_inner_block').hide();
          $('.welcome').hide();
          $('.chat_progress').show();
          $('#message_form').show();

          return false;
        });

        socket.on('join', function(name) {
          $('#messages').append($('<li>').text(name + ' connected to chat'));
        });

        $('#message_form').submit(function() {
          if (!$('#message').val()) {
            return false;
          }
          
          socket.emit('chat message', $('#message').val());
          $('#message').val('');

          return false;
        });

        socket.on('chat message', function(user, msg) {
          $('#messages').append($('<li>').text(user + ': ' + msg));
        });

});