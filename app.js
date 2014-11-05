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
  var addUser = false;

  socket.on("new_message", function(data){});
  
  socket.on("user_add", function(username){
    socket.username = username;

    usernames[username] = username;
    numUsers ++;
    addUser = true;
    
    socket.emit("login", {
      numUsers: numUsers
    });

    socket.broadcast.emit("user_joined", {
      username: socket.username, 
      numUsers: numUsers
    });
  });
  
  socket.on("typing", function(){});
  socket.on("typing_stopped", function(){});
  socket.on("disconnect", function(){});
});