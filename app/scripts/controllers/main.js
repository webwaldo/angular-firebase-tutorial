'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout, MessageService) {

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];


    MessageService.childAdded(function(addedChild){
      console.log('added child', addedChild);
      $timeout( function() {
        $scope.messages.push(addedChild);
      });
    });


    $scope.sendMessage = function(){
      console.log('send dat message');
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };
      MessageService.add(newMessage);
    };

    $scope.turnFeedOff = function(){
      MessageService.off();
    };


  });
