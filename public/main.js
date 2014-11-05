$(function(){
  var FADE_TIME = 150;
  var TYPING_TIMER_LENGTH = 400;
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  var $window = $(window);
  var $usernameInput = $('.usernameInput');
  var $messages  = $('.messages');
  var $inputMessage = $('.inputMessage');
  var $loginPage = $('.login.page');
  var $chatPage = $('.chat.page');

  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  function addParticipantsMessage(data){
    var message = "";
    if (data.numUsers === 1){
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }

  function setUsername(){
    username = cleanInput($usernameInput.val().trim());

    if (username){
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off("click");
      $currentInput = $inputMessage.focus();

      socket.emit('user_add', username);
    }
  }

  function sendMessage(){
    var message = $inputMessage.val();
    message = cleanInput(message);

    if (message && connected){
      $inputMessage.val('');
      addChatMesage({
        username: username, 
        message: message
      });

      socket.emit("message_new", message);
    }
  }
  
  function log(message, options){
    var $el = $("<li>").addClass("log").text(message);
    addMessageElement($el, options);
  }

  function addChatMesage(data, options){
    var $typingMessages = getTypingMessages(data);
    options = options || {};

    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $("<span class='username'/>")
      .text(data.username)
      .css("color", getUsernameColor(data.username));

    var $messageBodyDiv = $("<span class='messageBody'>")
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $("<li class='message'/>")
      .data("username", data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  function addChatTyping(data){
    data.typing = true
    data.message = "is typing";
    addChatMesage(data);
  }

  function removeChatTyping(data){
    getTypingMessages(data).fadeOut(function(){
      $(this).remove();
    });
  }
  
  function addMessageElement(el, options){
    var $el = $(el);

    if (!options) {
      options = {};
    }

    if (typeof options.fade === "undefined"){
      options.fade = true;
    }

    if (typeof options.prepend === "undefined"){
      options.prepend = false;
    }

    if (options.fade){
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend){
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }

    $messages[0].scrollTop = $messages[0].scrollHeight;
  }
  
  function cleanInput (input) {
    return $("<div/>").text(input).text();
  }

  function updateTyping(){
    if(connected) {
      if(!typing) {
        typing = true;
        socket.emit("typing");
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function(){
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit("typing_stopped");
          typing = false
        }
      }, TYPING_TIMER_LENGTH);
    }
  }
  
  function getTypingMessages(data){
    return $(".typing.message").filter(function(i){
      return $(this).data("username") === data.username;
    });
  }
  
  function getUsernameColor(username){
    var hash = 7;
    for(var i = 0; i < username.length; i++){
      hash = username.charCodeAt(i) + (hash<<5) - hash;
    }
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  $window.on("keydown", function(e){
    if (!(e.ctrlKey || e.metaKey || e.altKey)) {
      $currentInput.focus();
    }

    if (e.which === 13) {
      if (username) {
        sendMessage();
        socket.emit("typing_stopped");
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function(e){
    updateTyping();
  });

  $loginPage.on('click', function(e){
    $currentInput.focus();
  });

  $inputMessage.on('click', function(e){
    $inputMessage.focus();
  });

  socket.on("login", function(data){
    connected = true;
    var message = "Welcome to --ZING--> chat";
    log(message, {
      prepend: true
    });

    addParticipantsMessage(data);
  });

  socket.on("message_new", function(data){
    addChatMesage(data);
  });

  socket.on('user_joined', function(data){
    log(data.username + " " + "joined");
    addParticipantsMessage(data);
  });

  socket.on('user_left', function(data){});
    
  socket.on('typing', function(data){
    addChatTyping(data);
  });
  
  socket.on('typing_stopped', function(data){
    removeChatTyping(data);
  });
});