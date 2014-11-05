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

  function addParticipantMessage(data){}
  function setUsername(){}
  function sendMessage(){}
  function log(message, options){}
  function addChatMesage(){}
  function addChatTyping(){}
  function removeChatTyping(){}
  function addMessageElement(){}
  function clearInput(input){}
  function updateTyping(){}
  function getTypingMessages(data){}
  function getUsernameColor(){}

  $window.on('keydown', function(event){});

  $inputMessage.on('input', function(e){});
  $loginPage.on('click', function(e){});
  $inputMessage.on('click', function(e){});

  socket.on('login', function(data){});
  socket.on('new_message', function(data){});
  socket.on('user_joined', function(data){});
  socket.on('user_left', function(data){});
  socket.on('typing', function(data){});
  socket.on('typing_stopped', function(data){});
});