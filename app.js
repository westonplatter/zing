var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log("Server listening on port %d", port);
});

// making the connection between zing-chat.herokuapp.com -> index.html
app.use(express.static(__dirname + "/public"));

var usernames = {};
var numUsers = 0;

io.on("connection", function(socket){
  var addUser = false;

  socket.on("new message", function(data){});
  socket.on("add user", function(username){});
  socket.on("typing", function(){});
  socket.on("stop typing", function(){});
  socket.on("disconnect", function(){});
});