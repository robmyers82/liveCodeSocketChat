// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'btford.socket-io'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    templateUrl: "templates/chat.html",
    controller: 'MessagesController'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
})

.controller('MessagesController', function($scope, socket) {

  $scope.newMessage = {};
  $scope.messageList = [];

  // create the socket listener for appending a new message
  socket.on('chat message', function(msg){
    $scope.messageList.push(msg);
  });

  $scope.postReply = function() {

    var emptyRegex = /^\s*$/;
    if (!emptyRegex.test($scope.newMessage.message)) {
      socket.emit('chat message', $scope.newMessage.message);
      $scope.newMessage.message = "";
    } 
  };
})

.factory('socket', function (socketFactory) {
  return socketFactory({
   ioSocket: io.connect('<YOUR SOCKET ENABLED SERVER>')
  });
});
