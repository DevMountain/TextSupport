var app = angular.module('TextSupport').controller('SupportCtrl', function($scope, $firebase, MessageService) {
  $scope.numbers = $firebase(new Firebase('https://textsupport.firebaseio.com/numbers')).$asObject();

  $scope.sendMessage = function(message, number) {
    MessageService.newMessage(message, number).then(function() {
      $scope.newMessage = '';
    });
  }
})
