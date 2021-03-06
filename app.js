var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log("Server listening on port %d", port);
});

app.use(express.static(__dirname + "/public"));

var usernames = {};
var numUsers = 0;

io.on("connection", function(socket){
  var addedUser = false;

  socket.on("user_add", function(username){
    socket.username = username;

    usernames[username] = username;
    numUsers ++;
    addedUser = true;
    
    socket.emit("login", {
      numUsers: numUsers
    });

    socket.broadcast.emit("user_joined", {
      username: socket.username, 
      numUsers: numUsers
    });
  });
  
  socket.on("message_new", function(data){
    socket.broadcast.emit("message_new", {
      username: socket.username, 
      message: data
    });
  });
  
  socket.on("typing", function(){
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  socket.on("typing_stopped", function(){
    socket.broadcast.emit("typing_stopped", {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    if (addedUser) {
      var username = socket.username;
      delete usernames[username];
      --numUsers;
      
      socket.broadcast.emit("user_disconnected", {
        username: username, 
        numUsers: numUsers
      });
    }
  });
});