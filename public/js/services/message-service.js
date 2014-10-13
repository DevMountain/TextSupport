angular.module('TextSupport').factory('MessageService', function($http) {
    return {
      newMessage: function(message, number) {
        console.log("huh?");
        return $http({method: 'POST', url: '/support/messages', data: {
          message: message,
          to: number
        }});
      }
    }
});
